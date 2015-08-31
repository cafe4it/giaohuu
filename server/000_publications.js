if (Meteor.isServer) {
    Meteor.publish('getSports', function () {
        return Sports.find();
    });

    Meteor.publish('getSportById', function (id) {
        return Sports.find({_id: id});
    })

    Meteor.publish('getVSTypes', function () {
        return VSTypes.find();
    });

    Meteor.publish('getVsTypeById', function (id) {
        return VSTypes.find({_id: id});
    });

    Meteor.publish('getMatches', function (params) {
        var params = params || {};
        return Matches.find(params);
    })

    Meteor.publish('getMatchById', function (id) {
        return Matches.find({_id: id});
    })
}