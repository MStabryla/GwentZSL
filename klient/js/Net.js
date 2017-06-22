var Net = {
    socket:io("http://localhost:2999"),
    Listening:function(){
        Net.socket.on("onconnect",function(data){
            if(data.mess = "test")
            {
                console.log("Socket.io works");
            }
        })
        Net.socket.on("check",function(data){
            Net.socket.emit('check',data);
        })
        Net.socket.on("startgame",function(data){
            UI.Hidden("Waiting");
            UI.Show("Loading");
            Game.Start();
            Game.GenerateFromDeck({ eDeck: data.enemy.deck, oDeck: data.deck });
            Net.socket.on("mouse",function(data){
                //var card = Game.ca
            })
            Net.socket.on("action",function(data){
                if(!GameData.getCards)
                {
                    Game.ToHand();
                    GameData.getCards= true;
                }
                GameData.ym = data.ym;
                Game.ymObj.visible = data.ym;
                if(data.id && data.field)
                {
                    Game.MoveEnemyCard(data.id,data.field);
                }
            })
            Net.socket.on("changePower",function(data){
                GameData.stat = data;
                Game.ActData();
            })
            Net.socket.on("end",function(data){
                if(data.yuPower > data.enPower)
                {
                    UI.Alert("Wygrałeś");
                    Game.Stop();
                } 
            })
        })
    },
    Http:{
        Login:function(login,pass){
            var dat = {
                login:login,
                password:pass
            }
            Con("login",dat,function(data){
                if(data.Logged)
                {
                    console.log("z ser",data);
                    Data.actuser ={
                        login:data.Login,
                        nick:data.Nick
                    }
                    Data.decks = data.Decks;
                    Con("getcards",{},function(dat){
                        Data.cards = dat.cards;
                    })
                    UI.Hidden("LoginField");
                    UI.GenPanel();
                    
                }
                else
                {
                    UI.Alert("Niepoprawny login");
                    console.error(data.Error);
                }
            })
        },
        GetCards:function(){
            Con("getcards",{},function(data){
                Data.Cards = data;
            })
        }
    }
}
function Con(url,data,func)
{
    var str = "";
    for(var key in data)
    {
        if(data[key] instanceof Object)
        {
            str += key + "=" + JSON.stringify(data[key]) + "&";
        }
        else
        {
            str += key + "=" + data[key] + "&";
        }
        
    }
    str += "&";
    str.replace("&&","");
    
    conn(url,str,function(data){
        if(func)
        {
            func(data);
        }
    })
}