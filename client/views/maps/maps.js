Template.maps.onCreated(function(){
    var self = this;
    self.MAP = new ReactiveVar();
    if(self.data.type){

    }
});

Template.maps.rendered = function(){
    var self = Template.instance();
    $(document).ready(function(){
        var map = L.map('map', {zoomControl: false});
        L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images';

        // create the tile layer with correct attribution
        var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        var osm = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib}).addTo(map);

        map.setView([21.034, 105.853], 10);
        map.locate({setView: true, maxZoom: map.getZoom(),enableHighAccuracy : true});

        self.MAP.set(map);
    })
}