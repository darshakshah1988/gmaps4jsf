(function (window) {

    var google = window.google;
    var gmaps4jsf = window.gmaps4jsf;

    if (!window.gmaps4jsf.createPanorama) {

        gmaps4jsf.panoramas = {};

        window.gmaps4jsf.createPanorama = function(panorama, callback) {
            panorama.gmaps4jsf = this;
            var thepanorama = this.getPanorama(panorama);
            if (!thepanorama) {
                var container = document.getElementById(panorama.id);
                if (container) {
                    thepanorama = new google.maps.StreetviewPanorama(container);
                    thepanorama.properties = panorama;
                    if (panorama.jsVariable) {
                        this.window[panorama.jsVariable] = thepanorama;
                    }
                }
            }
            thepanorama.center(panorama);
            callback(thepanorama);
        };

        window.gmaps4jsf.getPanorama = function (panorama) {
            var id = typeof panorama === "object" ? panorama.id : panorama;
            return this.panoramas[id];
        };

    }

    if (!google.maps.StreetviewPanorama.prototype.center) {

        google.maps.StreetviewPanorama.prototype.center = function (panorama) {
            var self = this;
            var props = panorama ? panorama : self.properties;
            if (props.location.address) {
                props.gmaps4jsf.geocode(props.location.address, function (location) {
                    if (location) {
                        self.setLocationAndPOV(location, panorama.pov);
                    }
                });
            } else {
                panorama.latlng = new google.maps.LatLng(panorama.location.latitude, panorama.location.longitude);
                self.setLocationAndPOV(panorama.latlng, panorama.pov);
            }
        };

    }

})(window);