Template.matches.onCreated(function(){
    var self = this;
    self.matches = new ReactiveVar();
    self.autorun(function(c){
        var subsMatches = self.subscribe('getMatches');
        if(subsMatches.ready()){
            self.matches.set(Matches.find())
        }
    })
});

Template.matches.helpers({
    matches : function(){
        return Template.instance().matches.get();
    },
    isReady : function(){
        return (Template.instance().matches.get())
    }
})