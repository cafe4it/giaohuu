
Template.match_create.onCreated(function () {
    var self = this;
    self.Sports = new ReactiveVar();
    self.VSTypes = new ReactiveVar();
    defaultSportIcon = new ReactiveVar();
    self.autorun(function (c) {
        var subsSports = self.subscribe('getSports'),
            subsVSTypes = self.subscribe('getVSTypes');
        if (subsSports.ready() && subsVSTypes.ready()) {
            self.Sports.set(Sports.find().fetch());
            self.VSTypes.set(VSTypes.find().fetch());
            var firstSport = _.first(self.Sports.get());
            if(firstSport){
                defaultSportIcon.set(firstSport.icon);
            }
            c.stop();
        }
    });
});

Template.match_create.helpers({
    sportOptions: function () {
        var sports = Template.instance().Sports.get();
        return _.map(sports, function (s) {
            return {label: s.name, value: s.code};
        });
    },
    VSTypeOptions: function () {
        return _.map(Template.instance().VSTypes.get(), function (vs) {
            return {label: vs.name, value: vs.code}
        });
    },
    PublicOrPrivate: function () {
        return [
            {label: 'Công bố rộng rãi (Hiển thị trên Danh sách trận đấu)', value: true},
            {label: 'Lưu hành nội bộ (Chỉ những người nhận được liên kết mới biết)', value: false}
        ]
    },
    sportIcon : function(){
        return defaultSportIcon.get();
    }
});

Template.match_create.events({
    'change [name="sport"]': function (e, t) {
        e.preventDefault();
        var code = $('[name="sport"]').find(':selected').val();
        var sport = _.findWhere(t.Sports.get(), {code : code});
        if(sport){
            defaultSportIcon.set(sport.icon);
            //console.log(defaultSportIcon.get());
        }
    }
});

Template.match_create.onDestroyed(function(){
    if(defaultSportIcon) defaultSportIcon = null;
})