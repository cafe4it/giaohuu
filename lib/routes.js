if (Meteor.isClient) {
    BlazeLayout.setRoot('body');
}

FlowRouter.route('/', {
    name: 'home',
    action: function (p, q) {
        BlazeLayout.render('defaultLayout', {top: 'header', main: 'home', bottom: 'footer'});
    }
});

FlowRouter.route('/tran-dau/:_id',{
    name : 'match_detail',
    action : function(p, q){
        BlazeLayout.render('defaultLayout', {top : 'header', main : 'match_detail', bottom : 'footer'});
    }
})

FlowRouter.route('/tao-tran-dau',{
    name : 'match_create',
    action : function(p, q){
        BlazeLayout.render('defaultLayout', {top : 'header', main : 'match_create', bottom : 'footer'});
    }
})

FlowRouter.route('/danh-sach-tran-dau',{
    name : 'matches',
    action : function(p, q){
        BlazeLayout.render('defaultLayout', {top: 'header', main: 'matches', bottom: 'footer'});
    }
})

FlowRouter.route('/danh-sach-nguoi-choi',{
    name : 'players',
    action : function(p, q){
        BlazeLayout.render('defaultLayout', {top: 'header', main: 'players', bottom: 'footer'});
    }
});