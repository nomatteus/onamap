var Ride = function() {
  // var
};

var Segment = function(path, map) {
  var init = function() {
    new google.maps.Polyline({
      map: map,
      path: path,
      strokeColor: "#ff0000",
      strokeOpacity: 1.0,
      strokeWeight: 4
    });
  };
  init();
};
