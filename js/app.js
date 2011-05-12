var geocoder, 
  map,
  myLatlng;


function init() {
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

  // Plot markers on map

  // Get data
  $.ajax({
    url: "json.php",
    dataType: 'json', // Note: could use $.getJSON() as shortcut, but won't
    data: {r: this.id},
    cache: false, // Need to set this for IE especially, to cachebust
    success: function(data, textStatus, jqXHR) {
      _.each(data.vehicles, function(element, index, list){
        // Check if vehicle exists in vehicle array already
        //  If it exists, update its info
        //  If doesn't exist, create it
        if (element.id in that.vehicles) {
          // Exists already, so update info
          that.vehicles[element.id].update(element);
        } else {
          that.vehicles[element.id] = new Vehicle.Instance(element);
        }
      });
    }
  });
}