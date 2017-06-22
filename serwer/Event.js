var Lib = require("./MyLibrary.js");
module.exports = {
    Event:function(name,params){
        var that = this;
        this.Name = params.name;
        var ListeningRef = [];
        this.AddReferToEvent = function(object){
            if(object && object[that.Name] instanceof Function)
            {
                that.ListeningRef.push(object);
            }
        }
        this.StopReferEvent = function(object){
            if(that.ListeningRef.indexOf(object)>-1)
            {
                Lib.RemoveFromArray(that.ListeningRef.indexOf(object),that.ListeningRef);
            }
        }
        this.Handle = function(params){
            for(var i=0;i<ListeningRef.length;i++)
            {
                var elem = ListeningRef[i];
                elem[that.Name](params);
            }
        }
    },
    Events:{}
}