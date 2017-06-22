module.exports = function(params){
    this.FirstPlayerData = {
        deck:params.fP.Deck,
        graveyard:[],
        hand:[]
    }
    this.SecondPlayerData = {
        deck:params.sP.Deck,
        graveyard:[],
        hand:[]
    }
    this.FirstPlayerFieldPower = {
        Siege:[],
        Distanse:[],
        Short:[]
    }
    this.SecondPlayerFieldPower = {
        Siege:[],
        Distanse:[],
        Short:[]
    }
    this.Sum = function(tab){
        var s = 0;
        for(var i=0;i<tab.length;i++)
        {
            var elem = tab[i];
            s += elem.Power;
        }
        return s;
    }
}