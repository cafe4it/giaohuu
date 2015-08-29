Template.maps.onCreated(function () {
    var self = this;
    self.MAP = new ReactiveVar();
    if(self.data.type === 'match_create'){
        self.markerSport = new ReactiveVar();
    }
    self.autorun(function (c) {

    })
});

Template.maps.rendered = function () {
    var self = Template.instance();
    self.autorun(function(c){
        if(self.data.type === 'match_create' && defaultSportIcon.get() && self.MAP.get()){
            var map = self.MAP.get();
            if(self.markerSport.get()){
                map.removeLayer(self.markerSport.get());
            }

            var markerSport = L.icon({
                iconUrl: defaultSportIcon.get(),
                iconSize:     [32, 37], // size of the icon
                iconAnchor:   [22, 94]
            });

            L.marker([21.034, 105.853], {icon: markerSport}).addTo(map);

            self.markerSport.set(markerSport);
            self.MAP.set(map);

            c.stop();
        }
    })
    $(document).ready(function () {
        var map = L.map('map', {zoomControl: true});
        L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images';

        // create the tile layer with correct attribution
        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        var osm = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib}).addTo(map);

        map.setView([21.034, 105.853], 10);
        map.locate({setView: true, maxZoom: map.getZoom(), enableHighAccuracy: true});


        self.MAP.set(map);
    })
}