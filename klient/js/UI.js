function _UI() {
    var that = this;
    this.Login = function(){
        LoginDisp.stop = true;
        Net.Http.Login(document.getElementById("Login").value,document.getElementById("Pass").value);
    }
    this.Hidden = function(id){
        document.getElementById(id).style.display= "none";
    }
    this.Show = function(id){
        document.getElementById(id).style.display= "block";
    }
    this.GenPanel = function(){
        document.getElementById("UserName").innerText = Data.actuser.login;
        document.getElementById("Panel").style.display= "block";
        document.getElementById("ShowCards").onclick = function(){
            if(Data.cards)
            {
                document.getElementById("CardsList").innerHTML = "";
                for(var i=0;i<Data.cards.length;i++)
                {
                    var card = Data.cards[i];
                    var elem = document.createElement("div");
                    elem.setAttribute("class","block-12 card");
                    var img = document.createElement("img");
                    img.setAttribute("src",card.Image);
                    img.setAttribute("class","card-img block-4");
                    img.style.transform = "rotate(180deg)";
                    var main = document.createElement("div");
                    main.setAttribute("class","card-con block-8");
                    var name = document.createElement("span");
                    name.setAttribute("class","card-title");
                    name.innerText = card.Name;
                    var desc = document.createElement("span");
                    desc.setAttribute("class","card-desc");
                    desc.innerText = card.Desc;
                    switch(card.Nation)
                    {
                        case "inf":
                            elem.style.backgroundColor = "rgba(10, 14, 91,0.5)";
                            break;
                        case "neutral":
                            elem.style.backgroundColor = "rgba(0, 0, 0,0.5)";
                            break;
                    }
                    var power = document.createElement("span");
                    switch(card.Quality)
                    {
                        case "gold":
                            elem.style.border = "2px groove gold"; 
                            break;
                        case "silver":
                            elem.style.border = "2px groove #898a9e";
                    }
                    power.setAttribute("class","card-power");
                    power.innerText = card.Power;
                    elem.appendChild(img);
                    main.appendChild(name);
                    main.appendChild(desc);
                    main.appendChild(power);
                    elem.appendChild(main);
                    document.getElementById("CardsList").appendChild(elem);
                }
                that.Show("Cards");
            }
        }

        document.getElementById("ShowDecks").onclick = function(){
            if(Data.decks)
            {
                document.getElementById("DeckList").innerHTML = "";
                for(var i=0;i<Data.decks.length;i++)
                {
                    var deck = Data.decks[i];
                    var deckElem = document.createElement("div");
                    deckElem.setAttribute("class","deck");
                    var deckT = document.createElement("span");
                    deckT.setAttribute("class","deck-title");
                    deckT.innerText = "Talia " + i;
                    deckElem.appendChild(deckT);

                    var lcard = Data.cards.find(function(elem){return elem.Id == deck.Leader})
                    var lelem = document.createElement("div");
                    lelem.setAttribute("class","block-12 card");
                    var limg = document.createElement("img");
                    limg.setAttribute("src",lcard.Image);
                    limg.setAttribute("class","card-img block-4");
                    limg.style.transform = "rotate(180deg)";
                    var lmain = document.createElement("div");
                    lmain.setAttribute("class","card-con block-8");
                    var lname = document.createElement("span");
                    lname.setAttribute("class","card-title");
                    lname.innerText = lcard.Name;
                    var ldesc = document.createElement("span");
                    ldesc.setAttribute("class","card-desc");
                    ldesc.innerText = lcard.Desc;
                    switch(lcard.Nation)
                    {
                        case "inf":
                            lelem.style.backgroundColor = "rgba(10, 14, 91,0.5)";
                            break;
                        case "neutral":
                            lelem.style.backgroundColor = "rgba(0, 0, 0,0.5)";
                            break;
                    }
                    var lpower = document.createElement("span");
                    switch(lcard.Quality)
                    {
                        case "gold":
                            lelem.style.border = "2px groove gold"; 
                            break;
                        case "silver":
                            lelem.style.border = "2px groove #898a9e";
                    }
                    lpower.setAttribute("class","card-power");
                    lpower.innerText = lcard.Power;
                    lelem.appendChild(limg);
                    lmain.appendChild(lname);
                    lmain.appendChild(ldesc);
                    lmain.appendChild(lpower);
                    lelem.appendChild(lmain);
                    deckElem.appendChild(lelem);

                    for(var j=0;j<deck.Cards.length;j++)
                    {
                        var card = Data.cards.find(function(elem){return elem.Id == deck.Cards[j]})
                        var elem = document.createElement("div");
                        elem.setAttribute("class","block-12 card");
                        var img = document.createElement("img");
                        img.setAttribute("src",card.Image);
                        img.setAttribute("class","card-img block-4");
                        img.style.transform = "rotate(180deg)";
                        var main = document.createElement("div");
                        main.setAttribute("class","card-con block-8");
                        var name = document.createElement("span");
                        name.setAttribute("class","card-title");
                        name.innerText = card.Name;
                        var desc = document.createElement("span");
                        desc.setAttribute("class","card-desc");
                        desc.innerText = card.Desc;
                        switch(card.Nation)
                        {
                            case "inf":
                                elem.style.backgroundColor = "rgba(10, 14, 91,0.5)";
                                break;
                            case "neutral":
                                elem.style.backgroundColor = "rgba(0, 0, 0,0.5)";
                                break;
                        }
                        var power = document.createElement("span");
                        switch(card.Quality)
                        {
                            case "gold":
                                elem.style.border = "2px groove gold"; 
                                break;
                            case "silver":
                                elem.style.border = "2px groove #898a9e";
                        }
                        power.setAttribute("class","card-power");
                        power.innerText = card.Power;
                        elem.appendChild(img);
                        main.appendChild(name);
                        main.appendChild(desc);
                        main.appendChild(power);
                        elem.appendChild(main);
                        deckElem.appendChild(elem);
                    }
                    document.getElementById("DeckList").appendChild(deckElem);
                }
                that.Show("Decks");
            }
        }
        document.getElementById("Play").onclick = function(){
            that.Show("ChoiseDeck");
            for(var i=0;i<Data.decks.length;i++)
            {
                var elem = document.createElement("div");
                elem.setAttribute("class","block-12 c-deck");
                elem.setAttribute("value",Data.decks[i]._id);
                elem.innerText = "Talia " + i;
                switch(Data.decks[i].Nation.toLowerCase())
                {
                    case "inf":
                        elem.style.backgroundColor = "rgba(10, 14, 91,0.5)";
                        break;
                    case "neutral":
                        elem.style.backgroundColor = "rgba(0, 0, 0,0.5)";
                        break;
                }
                var title = document.createElement("span");
                title.setAttribute("class","deck-title");
                elem.appendChild(title);
                elem.onclick = function(){
                    UI.Hidden("ChoiseDeck");
                    UI.Hidden("Panel");
                    UI.Show("Waiting");
                    Net.socket.emit("queue",{user:Data.actuser,deck:this.getAttribute("value")});
                    Net.Listening();
                }
                document.getElementById("ChoiseDeckList").appendChild(elem);
            }
            
        }
    }
    this.Alert = function(text){
        document.getElementById("Alert-Con").innerText = text;
        that.Show("Alert");
        document.getElementById("Alert").oncontextmenu = function(e){
            e.preventDefault();
            that.Hidden("Alert");
        }
    }
}
var UI = new _UI();