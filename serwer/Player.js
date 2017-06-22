var Lib = require("./MyLibrary.js");
var Session = require("./Sessions.js");

module.exports = function(params)
{
    var that = this;
    if(params.client)
    {
        
        this.owner = params.owner;
        this.user = params.user;
        this.nick = params.nick;
        this.client = params.client;
        this.deck = params.deck;
        var userDate = Date.now();
        var interval = setInterval(function(){
            that.client.emit("check",{date:userDate});
        },5000);
        var checkInterval = setInterval(function(){
            if(Date.now() - userDate > 10000)
            {
                if(that.owner && that.owner instanceof Array)
                {
                    var index = that.owner.indexOf(that);
                    clearInterval(interval);
                    clearInterval(checkInterval);
                    Lib.RemoveFromArray(index,that.owner);
                }
                else if(that.owner && that.owner instanceof Session.Game)
                {
                    clearInterval(interval);
                    clearInterval(checkInterval);
                    that.owner.RemovePlayer(that);
                }
            }
        },15000);
        this.client.on("check",function(data){
            if(userDate == data.date)
            {
                userDate = Date.now();
            }
        })
        this.AddToGame = function(enemy){
            that.client.emit("startgame",{enemy:enemy,deck:that.deck});
        }
        this.SetSocket = function(enemy){
            that.client.on("mouse",function(data){
                //enemy.client.emit("mouse",data);
            })
            that.client.on("action",function(data){
                if(that.owner && that.owner instanceof Session.Game)
                {
                    that.owner.ReadUserData({ref:that,data:data});
                }
            })
        }
    }
}
