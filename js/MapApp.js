var MapApp = function(custom_opts){
      // == GOOGLE OBJECTS ==
  var map,        // google.maps.Map
      sv,         // google.maps.StreetViewPanorama
      geocoder,   // google.maps.Geocoder

      // For internal use (so we can use it inside defaults settings)
      default_position = new google.maps.LatLng(43.628227, -79.360882),

      // == OPTIONS/SETTINGS & DEFAULTS ==
      defaults = {
        map_canvas_id: "map_canvas",
        sv_canvas_id: "sv_canvas",
        map_options: {
          // These 3 options are the minimum required
          zoom: 13,
          center: default_position,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        sv_options: {
          position: default_position,
          pov: {
            heading: -1835.2834120715324,
            pitch: 3.58593750,
            zoom: 1
          }
        },
        // Hooks into events
        on_pos_change: function() {}, // Map Position
        on_pov_change: function() {}  // Streeview POV
      },
      opts = _.defaults(custom_opts, defaults),
      markers = [],

      init = function() {
        // Create Google Maps Objects
        map = new google.maps.Map(document.getElementById(opts.map_canvas_id), opts.map_options);
        sv = new google.maps.StreetViewPanorama(document.getElementById(opts.sv_canvas_id), opts.sv_options);
        geocoder = new google.maps.Geocoder();
        map.setStreetView(sv);
        add_listeners();
        add_rides();
      },
      add_listeners = function() {
        // See list of events here: https://developers.google.com/maps/documentation/javascript/reference#StreetViewPanorama
        google.maps.event.addListener(sv, 'position_changed', function(){
          opts.on_pos_change(sv);
        });
        google.maps.event.addListener(sv, 'pov_changed', function(){
          opts.on_pov_change(sv);
        });
        // map click event
        google.maps.event.addListener(map, 'click', function(ev){
          //console.log(map);
          //console.log(ev.latLng);
          markers.push(new google.maps.Marker({
            position: ev.latLng,
            map: map,
            draggable: true
          }));
          markers.push(new google.maps.Marker({
            position: ev.latLng,
            map: sv,
            draggable: true
          }));
          opts.on_map_click(markers);
        });
      },
      add_rides = function() {
        var path = [
          new google.maps.LatLng(43.639843626501815, -79.381052211792),
          new google.maps.LatLng(43.64779381956989, -79.38448543933106),
          new google.maps.LatLng(43.651892726755634, -79.39736004260254)
        ];
        var segment = new Segment(path, map);
      };
  return {
    init: function() {
      return init();
    },
    _opts: function() {
      return opts;
    }
  };
};
