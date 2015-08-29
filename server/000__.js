if(Meteor.isServer){
    Meteor.startup(function(){
        VSTypes._ensureIndex({"code" : 1});
        Sports._ensureIndex({"code" : 1});

        if(VSTypes.find().count() === 0){
            var vstypes = JSON.parse(Assets.getText('vs.json'));
            _.each(vstypes.default, function(vs){
                var code = s.underscored(vs.name),
                    vs = _.extend(vs, {code : code});
                VSTypes.insert(vs);
            })
        }

        if(Sports.find().count() === 0){
            var sports = JSON.parse(Assets.getText('sports.json'));
            _.each(sports.default, function(s){
                Sports.insert(s);
            })
        }
    })
}