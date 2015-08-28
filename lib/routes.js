if (Meteor.isClient) {
    BlazeLayout.setRoot('body');
}

FlowRouter.route('/', {
    name: 'home',
    action: function (p, q) {
        BlazeLayout.render('defaultLayout', {top: 'header', main: 'home', bottom: 'footer'});
    }
})