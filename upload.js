var mongoose = require("mongoose");
var cards = require("./serwer/database/Cards.js");
require("mongoose-function")(mongoose);
var Mongo = require("./serwer/database/Database.js")(mongoose);

mongoose.connect("mongodb://localhost/gwent");
mongoose.connection.on("error",function(err){
    console.log("Error: ",err);
})
mongoose.connection.once("open",function(){
    console.log("Connection established");
    UpdateCards();
    UpdateAll();
})

function UploadData(){
    for(var i=0;i<cards.Cards.length;i++)
    {
        var actCard = cards.Cards[i];
        var newCard = new Mongo.Models.Cards({
            Id:i,
            Name:actCard.name,
            Desc:actCard.Desc,
            Image:actCard.Image,
            Type:actCard.Image,
            Quality:actCard.Quality,
            Nation:actCard.Nation,
            Power:actCard.Power,
            Functionality:actCard.func
        });
        Mongo.Methods.Insert(newCard,{callback:function(data){console.log("dodano",data)}});
    }
    Mongo.Methods.Select(Mongo.Models.Cards,{callback:function(data){console.log("dane z serwera",data)}});
}
function UpdateCards(){
    for(var i=0;i<cards.Cards.length;i++)
    {
        var actCard = cards.Cards[i];
        var newCard = {
            Id:i,
            Name:actCard.name,
            Desc:actCard.Desc,
            Image:actCard.Image,
            Type:actCard.Type,
            Quality:actCard.Quality,
            Nation:actCard.Nation,
            Power:actCard.Power,
            Functionality:actCard.func
        };
        Mongo.Methods.Update(Mongo.Models.Cards,{oldObj:{Id:i},newObj:newCard,callback:function(data){console.log("updatet",i)}})
    }
    Mongo.Methods.Select(Mongo.Models.Cards,{callback:function(data){console.log("dane z serwera",data)}});
}
function UpdateAll(){
    var admin = new Mongo.Models.Users({"_id": "593bdc796f62c6156c20d166","Login": "admin",
  "Password": "admin"})
    var sta = new Mongo.Models.Users({"_id": "593bdf146475b016a00d050b","Login": "sta",
  "Password": "sta"})
  var padmin = new Mongo.Models.Profiles({"_id": "593bdc796f62c6156c20d167",
  "UserId": "593bdc796f62c6156c20d166",
  "Nick": "Assar admin",
  "Decks": []})
  var psta = new Mongo.Models.Profiles({"UserId": "593bdf146475b016a00d050b",
  "Nick": "Assar sta",
  "Decks": []});
  var decks = [
      new Mongo.Models.Decks({"UserId": "593bdc796f62c6156c20d166",
    "Leader": 1,
    "Nation": "Inf",
    "Cards": [
        2,
        4,
        5
    ]}),
    new Mongo.Models.Decks({"UserId": "593bdf146475b016a00d050b",
    "Leader": 1,
    "Nation": "Inf",
    "Cards": [
        3,
        4,
        6
    ],})
  ];
  Mongo.Methods.Insert(admin,{callback:function(data){
      console.log("Added ",data);
  }});
  Mongo.Methods.Insert(sta,{callback:function(data){
      console.log("Added ",data);
  }});
  Mongo.Methods.Insert(padmin,{callback:function(data){
      console.log("Added ",data);
  }});
  Mongo.Methods.Insert(psta,{callback:function(data){
      console.log("Added ",data);
  }});
  for(var i=0;i<decks.length;i++)
  {
      Mongo.Methods.Insert(decks[i],{callback:function(data){
        console.log("Added ",data);
    }});
  }
}