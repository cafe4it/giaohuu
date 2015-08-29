if (Meteor.isClient) {
    BlazeLayout.setRoot('body');
}

FlowRouter.route('/', {
    name: 'home',
    action: function (p, q) {
        BlazeLayout.render('defaultLayout', {top: 'header', main: 'home', bottom: 'footer'});
    }
});

FlowRouter.route('/tran-dau',{
    name : 'matches',
    action : function(p, q){
        BlazeLayout.render('defaultLayout', {top: 'header', main: 'matches', bottom: 'footer'});
    }
})

FlowRouter.route('/nguoi-choi',{
    name : 'players',
    action : function(p, q){
        BlazeLayout.render('defaultLayout', {top: 'header', main: 'players', bottom: 'footer'});
    }
})