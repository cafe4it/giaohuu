if(Meteor.isServer){
    Meteor.startup(function(){
        VSTypes._ensureIndex({"code" : 1});
        //VSTypes.remove({})
        if(VSTypes.find().count() === 0){
            var vstypes = JSON.parse(Assets.getText('vs.json'));
            _.each(vstypes.default, function(vs){
                var code = s.underscored(vs.name),
                    vs = _.extend(vs, {code : code});
                VSTypes.insert(vs);
            })
        }
    })
}