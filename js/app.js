

function init() {
  var opts = {
    on_pov_change: function(sv) {
      var sv_pov = sv.getPov();
      $("#streetview-position input[name=heading]").val(sv_pov.heading);
      $("#streetview-position input[name=pitch]").val(sv_pov.pitch);
      $("#streetview-position input[name=zoom]").val(sv_pov.zoom);
    },
    on_pos_change: function(map) {
      console.log(map.getPosition().lat());
      $("#map-position input[name=lat]").val(map.getPosition().lat());
      $("#map-position input[name=lng]").val(map.getPosition().lng());
    },
    on_map_click: function(markers) {
      // Update output with marker list
      $("#output").html(function(){
        var output = "";
        for (var i = 0; i < markers.length; i++) {
          output += markers[i].getPosition().toString();
        }
        console.log(output);
        return output;
      });
    }
  },
  app = new MapApp(opts);
  app.init();


}


var geocoder,
  map,
  myLatlng;


function init_old() {
  // Centre map based on a geocoded location
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({address: 'm5v1e3'}, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      myLatlng = map.setCenter(results[0].geometry.location);
      console.log(results[0].geometry.location);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
  // Set map options
  var myOptions = {
    zoom: 14,
    center: myLatlng,
    panControl: false,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  //var MarkerManager = {};

  var markers = [];

  // map click event
  google.maps.event.addListener(map, 'click', function(ev){
    //console.log(map);
    //console.log(ev.latLng);
    markers.push(new google.maps.Marker({
      position: ev.latLng,
      map: this,
      draggable: true
    }));
    // Update output with marker list
    $("#output").html(markerOutput(markers));
  });
  
  function markerOutput(markers) {
    var output = "";
    for (var i = 0; i < markers.length; i++) {
      output += markers[i].getPosition().toString();
    }
    return output;
  }

}
