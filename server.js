var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var NodeAPI = require("easynodeapi");
var socketio = require("socket.io");
var mongoose = require("mongoose");
require("mongoose-function")(mongoose);
var Mongo = require("./serwer/database/Database.js")(mongoose);
var Events = require("./serwer/Event.js");
var Player = require("./serwer/Player.js");
var Session = require("./serwer/Sessions.js");
var Playfield = require("./serwer/Playfield.js")
var Lib = require("./serwer/MyLibrary.js");

//Connection with database

mongoose.connect("mongodb://localhost/gwent");
mongoose.connection.on("error",function(err){
    console.log("Error: ",err);
})
mongoose.connection.once("open",function(){
    console.log("Connection established");
})

//Create Second server for Sockets.io

var serv = require("http").Server();
serv.listen(2999);
var io = socketio(serv);

//Ge data from mongo
var Data = {};
Mongo.Methods.Select(Mongo.Models.Cards,{callback:function(data){
    Data.Cards = data;
}})


//Searching start

Session.Research(Data);

//Main Server

http.createServer(function (req, res) {
    var API = NodeAPI(req,res);
    API.OnUrl("GET","/",function(){
        API.View("./klient/index.html");
    })
    API.OnUrl("POST","/login",function(){
        API.GetPOSTData(function(data){
            if(data.login && data.password)
            {
                Mongo.Methods.Select(Mongo.Models.Users,{qObject:{Login:data.login,Password:data.password},callback:function(user){
                    if(user.length > 0)
                    {
                        Mongo.Methods.Select(Mongo.Models.Profiles,{qObject:{UserId:user[0]._id},callback:function(profile){
                            if(profile.length > 0)
                            {
                                var res= Session.LoggedPlayers.find(function(elem){
                                    return elem.login == user[0].Login;
                                })
                                if(!res)
                                {
                                    Session.LoggedPlayers.push({login:user[0].Login});
                                }
                                Mongo.Methods.Select(Mongo.Models.Decks,{qObject:{UserId:user[0]._id},callback:function(decks){
                                    API.Json({Logged:true,Login:user[0].Login,Nick:profile[0].Nick,Decks:decks});
                                }})
                            }
                        }})
                    }
                    else{
                        API.Json({Logged:false,Error:"User not found"});
                    }
                }})
            }
        })
    })
    API.OnUrl("POST","/registry",function(){
        API.GetPOSTData(function(data){
            if(data.login && data.password)
            {
                Mongo.Methods.Select(Mongo.Models.Users,{qObject:{Login:data.login},callback:function(users){
                    if(users.length == 0)
                    {
                        try{
                             var newUser = new Mongo.Models.Users({Login:data.login,Password:data.password});
                            Mongo.Methods.Insert(newUser,{callback:function(NewU){
                                var newProfile = new Mongo.Models.Profiles({UserId:NewU._id,Nick:"Assar " + data.login});
                                Mongo.Methods.Insert(newProfile,{callback:function(NewP){
                                    API.Json({Logged:true,trueLogin:NewP.Nick,Decks:NewP.Decks});
                                }})
                            }})
                        }
                        catch(ex)
                        {
                            API.Json({Logged:false,Error:ex});
                        }
                       
                    }
                    else
                    {
                        API.Json({Logged:false,Error:"User whith that login already exist"})
                    }
                }})
            }
            else
            {
                API.Json({Logged:false,Error:"You didn't send parameters"})
            }
        })
    })
    API.OnUrl("POST","/getcards",function(){
        Mongo.Methods.Select(Mongo.Models.Cards,{callback:function(cards){
            API.Json({cards:cards});
        }})
    })
    API.OnUrl("POST","/setdeck",function(){
        API.GetPOSTData(function(data){
            data.user = JSON.parse(data.user);
            if(data.user.login)
            {
                Mongo.Methods.Select(Mongo.Models.Users,{qObject:{Login:data.user.login},callback:function(aUser){
                    if(aUser.length > 0)
                    {
                        var cArrray = JSON.parse(data.cards);
                        var newDeck = new Mongo.Models.Decks({UserId:aUser[0]._id,Leader:1,Cards:cArrray});
                        Mongo.Methods.Insert(newDeck,{callback:function(datan){
                            Mongo.Methods.Select(Mongo.Models.Profiles,{qObject:{UserId:aUser[0]._id},callback:function(profiles){
                                if(profiles.length > 0)
                                {
                                    var deckList = profiles[0].Decks;
                                    deckList.push(datan._id);
                                    Mongo.Methods.Update(Mongo.Models.Profiles,{oldObj:{UserId:aUser[0]._id},newObj:{Decks:deckList},callback:function(datap){
                                        API.Json({Completed:true});
                                    }})
                                }
                                else
                                {
                                    API.Json({Completed:false,Mess:"Profile not found"});
                                }
                            }})
                        }})
                    }
                    else
                    {
                        API.Json({Completed:false,Mess:"User not found"});
                    }
                }})
            }
            else
            {
                 API.Json({Completed:false,Error:"You didn't send parameters"})
            }
        })
    })
    API.OnUrl("POST","/getdecks",function(){
        API.GetPOSTData(function(data){
            data.user = JSON.parse(data.user);
            if(data.user.login)
            {
                Mongo.Methods.Select(Mongo.Models.Users,{qObject:{Login:data.user.login},callback:function(users){
                    if(users.length > 0)
                    {
                        Mongo.Methods.Select(Mongo.Models.Decks,{qObject:{UserId:users[0]._id},callback:function(decks){
                            API.Json({decks:decks});
                        }})
                    }
                    else
                    {
                        API.Json({Completed:false,Mess:"User not found"});
                    }
                }})
            }
        })
    })
    API.Default(function(){
        API.File("./klient" + req.url);
    })
    API.Server();
}).listen(3000);


//Socket.io

io.sockets.on("connection",function(client){
    client.emit("onconnect",{mess:"test"});
    client.on("queue",function(data){
        if(data.user && data.user.login){
            Mongo.Methods.Select(Mongo.Models.Users,{qObject:{Login:data.user.login},callback:function(ActUser){
                if(ActUser.length > 0)
                {
                    var actUser = ActUser[0];
                    Mongo.Methods.Select(Mongo.Models.Profiles,{qObject:{UserId:actUser._id},callback:function(profile){
                        if(profile.length > 0)
                        {
                            Mongo.Methods.Select(Mongo.Models.Decks,{qObject:{_id:data.deck},callback:function(decks){
                                if(decks.length > 0)
                                {
                                    var waitingPlayer = new Player({client:client,owner:Session.WaitingPlayers,user:actUser,nick:profile[0].Nick,deck:decks[0]});
                                    Session.WaitingPlayers.push(waitingPlayer);
                                    client.emit("queue",{inQ:true})
                                }
                                else
                                {
                                    client.emit("queue",{inQ:false,Mess:"Brak wybranej talii"})
                                }
                            }})
                        }
                        else{
                            client.emit("queue",{inQ:false,Mess:"Problem z logowaniem"})
                        }
                    }})
                }
                else{
                    client.emit("queue",{inQ:false,Mess:"Problem z logowaniem"})
                }
            }})
        }
    })
})