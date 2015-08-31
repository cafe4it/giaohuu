var changeSportIconListener;
Template.maps.onCreated(function () {
    var self = this;
    self.MAP = new ReactiveVar();

    if (self.data.type === 'match_create') {
        self.markerSport = new ReactiveVar();
        changeSportIconListener = function (icon) {
            var markerSport = self.markerSport.get();
            if (markerSport) {
                $('img.markerSportIcon').attr('src', icon);
            }
        };
        Event.on('changeSportIcon', changeSportIconListener);
    }

    if(self.data.type === 'matches'){
        self.matchLocations = new ReactiveVar();
    }
});

Template.maps.rendered = function () {
    var self = Template.instance();
    self.autorun(function (c) {

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

        L.easyButton('fa-compass', function (btn, map) {
            map.locate({setView: true, maxZoom: map.getZoom(), enableHighAccuracy: true});
        }).addTo(map);

        if (self.data.type === 'match_create') {
            var markerSportIcon = customMarkerIcon();
            var makerSport = L.marker([21.027569203096554, 105.85260629653932], {
                icon: markerSportIcon,
                draggable: true
            }).addTo(map);

            makerSport.on('dragend', dd_markerSport);

            self.markerSport.set(makerSport);
        }

        self.MAP.set(map);

        map.on('locationfound', onLocationFound, self);
        map.on('locationerror', onLocationError);
    })
}

Template.maps.onDestroyed = function () {
    var self = Template.instance();
    if (self.data.type === 'match_create') {
        Event.removeListener('changeSportIcon', changeSportIconListener);
    }
}

//Custom Marker Icon

var customMarkerIcon = function (iconUrl, iconSize, iconAnchor, popupAnchor, className) {
    var iconUrl = iconUrl || '/icons/marker/bongda.png',
        iconSize = iconSize || [32, 37],
        iconAnchor = iconAnchor || [30, 36],
        popupAnchor = popupAnchor || [-2, -8],
        className = className || 'markerSportIcon';
    return L.icon({
        iconUrl: iconUrl,
        iconSize: iconSize,
        popupAnchor: popupAnchor,
        iconAnchor: iconAnchor,
        className: className
    });
}


//Events Map
var onLocationFound = function (e) {
    var radius = e.accuracy / 2;
    var map = this.MAP.get(),
        icon = customMarkerIcon('/icons/marker/me1.png', [32, 32], [16, 16], [-2, -8], null);
    var marker = L.marker(e.latlng,{icon : icon}).addTo(map),
        circle = L.circle(e.latlng, radius).addTo(map),
        popup = marker.bindPopup("Bạn đang trong bán kính " + radius + " mét tại điểm này.");
    popup.openPopup();
    if(this.data.type === 'match_create'){
        this.markerSport.get().setLatLng(e.latlng)
    }
}

var onLocationError = function (e) {

}

var dd_markerSport = function (e) {
    Event.emit('locationMarkerOnMapChange', e.target.getLatLng());
}