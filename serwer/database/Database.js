module.exports = function(mongo){
    return {
        Methods:{
            Select:function(model,params){
                var qObject = params.qObject || {};
                model.find(qObject,function(err,data){
                    if(err){return console.error(err)}
                    else if(params.callback && params.callback instanceof Function){
                        params.callback(data);
                    }
                })
            },
            SelectMany:function(model,params)
            {
                var qObject = params.qObject || {};
                var limit = params.limit || 1;
                model.find(qObject,function(err,data){
                    if(err){return console.error(err)}
                    else if(params.callback && params.callback instanceof Function){
                        params.callback(data);
                    }
                }).limit(params.limit)
            },
            Update:function(model,params){
                if(params.oldObj && params.newObj)
                {
                    model.update(params.oldObj,params.newObj,function(err,data){
                        if(err){return console.error(err)}
                        else if(params.callback && params.callback instanceof Function)
                        {
                            params.callback(data);
                        }
                    })
                }
                
            },
            Delete:function(model,params){
                var qObject = params.qObject || {};
                model.remove(function(err,data){
                    if(err){return console.error(err)}
                    else if(params.callback && params.callback instanceof Function)
                    {
                        params.callback(data);
                    }
                },qObject)
            },
            Insert:function(data,params){
                data.save(function(error,data,added){
                    if(error){return console.log(error)}
                    else if(params.callback && params.callback instanceof Function)
                    {
                        params.callback(data);
                    }
                })
            }
        },
        Models:{
            Users:mongo.model("User",new mongo.Schema({
                Login:{type:String,required:true},
                Password:{type:String,required:true}
            })),
            Profiles:mongo.model("Profile",new mongo.Schema({
                UserId:{type:String,required:true},
                Nick:{type:String,required:true},
                Decks:{type:Array,default:[]}
            })),
            Decks:mongo.model("Deck",new mongo.Schema({
                UserId:{type:String,required:true},
                Leader:{type:Number,required:true},
                Cards:{type:Array,default:[]},
                Nation:{type:String,required:true}
            })),
            Cards:mongo.model("Card",new mongo.Schema({
                Id:{type:Number,required:true},
                Name:{type:String,required:true},
                Desc:{type:String,required:false},
                Image:{type:String,required:true},
                Type:{type:String,required:true},
                Quality:{type:String,required:true},
                Nation:{type:String,required:true},
                Power:{type:Number,required:true,default:1},
                Functionality:{type:Function,required:false,default:function(){}}
            }))
        }
    }
}