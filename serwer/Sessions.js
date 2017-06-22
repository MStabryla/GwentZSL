var Playfield = require("./Playfield.js");
var Player = require("./Player.js");
var Lib = require("./MyLibrary.js");

module.exports = {
    Game:function(cards){
        var that = this;
        var cards = cards;
        var actPlayer = null;
        var FirstUser = null;
        var SecondUser = null;
        this.AddPlayer = function(player){
            if(player)
            {
                player.owner = that;
                if(!FirstUser)
                {
                    FirstUser = player;
                }
                else if(!SecondUser)
                {
                    SecondUser = player;
                }
            }
            else
            {
                console.log("Error: player is not defined",player);
            }
        }
        this.RemovePlayer = function(player){
            if(player){
                if(FirstUser == player){
                    that.End();
                    FirstUser = null;
                }
                else if(SecondUser == player)
                {
                    that.End();
                    SecondUser = null;
                }
            }
        }
        this.Start = function(){
            if(FirstUser && SecondUser)
            {
                FirstUser.AddToGame({nick:SecondUser.nick,deck:SecondUser.deck});
                FirstUser.SetSocket(SecondUser);
                SecondUser.AddToGame({nick:FirstUser.nick,deck:FirstUser.deck});
                SecondUser.SetSocket(FirstUser);
                that.Playfield = new Playfield({fP:FirstUser,sP:SecondUser});
                actPlayer = parseInt(Math.random()) == 1 ? FirstUser : SecondUser;
                actPlayer.client.emit("action",{ym:true}); 
                console.log(actPlayer == FirstUser);
            }
        }
        this.ReadUserData = function(data){
            if(actPlayer == data.ref)
            {
                var actCard = cards.find(function(car){
                    return car.Id == data.data.card.id;
                })
                var FieldPower = actPlayer == FirstUser ? that.Playfield.FirstPlayerFieldPower : that.Playfield.SecondPlayerFieldPower;
                switch(data.data.field)
                {
                    case "Siege":
                        FieldPower.Siege.push(actCard)
                        break;
                    case "Distanse": 
                        FieldPower.Distanse.push(actCard)
                        break;
                    case "Short":
                        FieldPower.Short.push(actCard)
                        break;
                }
                if(data.data.pass)
                {
                    actPlayer.passed = true;
                }
                var secUser = actPlayer == FirstUser ? SecondUser : FirstUser;
                actPlayer = secUser;
                console.log(actPlayer == FirstUser);
                FirstUser.Power = that.Playfield.Sum(that.Playfield.FirstPlayerFieldPower.Siege) + that.Playfield.Sum(that.Playfield.FirstPlayerFieldPower.Distanse) + that.Playfield.Sum(that.Playfield.FirstPlayerFieldPower.Short);
                SecondUser.Power = that.Playfield.Sum(that.Playfield.SecondPlayerFieldPower.Siege) + that.Playfield.Sum(that.Playfield.SecondPlayerFieldPower.Distanse) + that.Playfield.Sum(that.Playfield.SecondPlayerFieldPower.Short);
                actPlayer.client.emit("action",{ym:true,id:data.data.card.id,field:data.data.field});
                FirstUser.client.emit("changePower",{
                    eUpRow:that.Playfield.Sum(that.Playfield.SecondPlayerFieldPower.Siege),
                    eMeRow: that.Playfield.Sum(that.Playfield.SecondPlayerFieldPower.Distanse),
                    eDownRow: that.Playfield.Sum(that.Playfield.SecondPlayerFieldPower.Short),
                    eMain:SecondUser.Power,
                    oUpRow:that.Playfield.Sum(that.Playfield.FirstPlayerFieldPower.Short),
                    oMeRow:that.Playfield.Sum(that.Playfield.FirstPlayerFieldPower.Distanse),
                    oDownRow:that.Playfield.Sum(that.Playfield.FirstPlayerFieldPower.Siege),
                    oMain:FirstUser.Power
                });
                SecondUser.client.emit("changePower",{
                    eUpRow:that.Playfield.Sum(that.Playfield.FirstPlayerFieldPower.Siege),
                    eMeRow: that.Playfield.Sum(that.Playfield.FirstPlayerFieldPower.Distanse),
                    eDownRow: that.Playfield.Sum(that.Playfield.FirstPlayerFieldPower.Short),
                    eMain:FirstUser.Power,
                    oUpRow:that.Playfield.Sum(that.Playfield.SecondPlayerFieldPower.Short),
                    oMeRow:that.Playfield.Sum(that.Playfield.SecondPlayerFieldPower.Distanse),
                    oDownRow:that.Playfield.Sum(that.Playfield.SecondPlayerFieldPower.Siege),
                    oMain:SecondUser.Power
                });
                
                if(FirstUser.passed && SecondUser.passed)
                {
                    FirstUser.client.emit("end",{
                        yuPower:FirstUser.Power,
                        enPower:SecondUser.Power
                    })
                    SecondUser.client.emit("end",{
                        enPower:FirstUser.Power,
                        yuPower:SecondUser.Power
                    })
                }
            }
        }
        this.End = function(){
            console.log("end");
        }
        module.exports.GameList.push(this);
    },
    Research:function(data){
        var interval = setInterval(function(){
            if(module.exports.WaitingPlayers.length > 1)
            {
                var newGame = new module.exports.Game(data.Cards);
                var FPlayer = module.exports.WaitingPlayers[0]
                newGame.AddPlayer(FPlayer);
                var SPlayer = module.exports.WaitingPlayers[1]
                newGame.AddPlayer(SPlayer);
                Lib.RemoveObjectFromArray(FPlayer,module.exports.WaitingPlayers);
                Lib.RemoveObjectFromArray(SPlayer,module.exports.WaitingPlayers);
                newGame.Start();
            }
        },100);
    },
    GameList:[],
    WaitingPlayers:[],
    LoggedPlayers:[]
}