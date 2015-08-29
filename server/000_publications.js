if(Meteor.isServer){
    Meteor.publish('getSports', function(){
        return Sports.find();
    });

    Meteor.publish('getVSTypes', function(){
        return VSTypes.find();
    });
}