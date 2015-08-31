var locationMarkerOnMap_Listener;
Template.match_create.onCreated(function () {
    var self = this;
    self.Sports = new ReactiveVar();
    self.VSTypes = new ReactiveVar();
    self.latlngSportIcon = new ReactiveVar();
    self.autorun(function (c) {
        var subsSports = self.subscribe('getSports'),
            subsVSTypes = self.subscribe('getVSTypes');
        if (subsSports.ready() && subsVSTypes.ready()) {
            self.Sports.set(Sports.find().fetch());
            self.VSTypes.set(VSTypes.find().fetch());
            var firstSport = _.first(self.Sports.get());
            if(firstSport){
                Event.emit('changeSportIcon',firstSport.icon);
            }
            c.stop();
        }
    });

    locationMarkerOnMap_Listener = function(latlng){
        if(latlng) self.latlngSportIcon.set([latlng.lat, latlng.lng]);
    }

    Event.on('locationMarkerOnMapChange',locationMarkerOnMap_Listener);
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
    latlng : function(){
        return Template.instance().latlngSportIcon.get() || ''
    }
});

Template.match_create.rendered = function(){
    /*$(document).ready(function(){
        $('#insertMatchForm').bootstrapValidator({
            message: 'Yêu cầu nhập đầy đủ thông tin',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                location: {
                    message: 'Yêu cầu nhập chính xác địa chỉ',
                    validators: {
                        notEmpty: {
                            message: 'Yêu cầu nhập chính xác địa chỉ'
                        }
                    }
                }
            }
        });
    })*/
}

Template.match_create.events({
    'change [name="sport"]': function (e, t) {
        e.preventDefault();
        var code = $('[name="sport"]').find(':selected').val();
        var sport = _.findWhere(t.Sports.get(), {code : code});
        if(sport){
            Event.emit('changeSportIcon',sport.icon);
        }
    }
});

Template.match_create.onDestroyed(function(){
    Event.removeListener('locationMarkerOnMapChange', locationMarkerOnMap_Listener);
});

//Hooks

AutoForm.hooks({
    insertMatchForm: {
        formToDoc: function(doc) {
            if (typeof doc.latlng === "string") {
                var latlng = doc.latlng.split(",");
                doc.latlng = _.map(latlng, function(l){
                    return Math.floor(parseFloat(l));
                });
            }
            return doc;
        },
        onSubmit : function(insertDoc, updateDoc, currentDoc){
            console.log(insertDoc);
        },
        onSuccess: function(formType, result) {
            console.log(result);
        },
    }
});