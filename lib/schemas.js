Matches = new Meteor.Collection('matches');
Matches_Team = new Meteor.Collection('matches_team');
Sports = new Meteor.Collection('sports');
VSTypes = new Meteor.Collection('vstypes');

var schemas = {};

schemas.Match = new SimpleSchema({
    title : {
        type : String,
        label : 'Tiêu đề'
    },
    location : {
        type : String,
        label : 'Địa điểm'
    },
    latlng : {
        type : [Number],
        decimal : true,
        label : 'Toạ độ'
    },
    time : {
        type : Date,
        label : 'Thời gian'
    },
    isPublic : {
        type : Boolean,
        label : 'Kiểu'
    },
    sport : {
        type : String,
        label : 'Môn thể thao'
    },
    vsp : {
        type : String,
        label : 'Số lượng người chơi'
    },
    cost : {
        type : String,
        label : 'Lệ phí (nếu có)',
        optional : true
    },
    website : {
        type : String,
        label : 'Website (nếu có)',
        optional : true
    },
    phone : {
        type : String,
        label : 'Số điện thoại (nếu có)',
        optional : true
    },
    createdBy :{
        type : Date,
        label : 'Người tạo',
        autoValue : function(){
            return Meteor.userId();
        },
    },
    updatedAt : {
        type : Date,
        label : 'Chỉnh sửa lần cuối',
        autoValue: function() {
            return new Date;
        },
        optional: true
    }
});

Matches.attachSchema(schemas.Match);

schemas.Sport = new SimpleSchema({
    name : {
        type : String,
        label : 'Tên môn thể thao'
    },
    icon : {
        type : String
    }
});

Sports.attachSchema(schemas.Sport);

schemas.VsType = new SimpleSchema({
    code : {
        type : String
    },
    name : {
        type : String,
        label : 'Tên'
    },
    playersInTeam : {
        type : Number
    }
});

VSTypes.attachSchema(schemas.VsType);

