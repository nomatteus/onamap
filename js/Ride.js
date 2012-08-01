var Ride = function() {
  // var
};

var Segment = function(path_points, map) {
  var timer_id,
    queue = [],
    queue_pointer = 0,
    path = new google.maps.MVCArray([]),
    init = function() {
      // Start off path with first two points
      // Anything added to a path in an MVC array will automatically be
      //  drawn on the map!
      // https://developers.google.com/maps/documentation/javascript/reference#Polyline
      path.push(path_points[0]);
      path.push(path_points[1]);
      new google.maps.Polyline({
        map: map,
        path: path,
        strokeColor: random_item(["#EC2293"]),
        strokeOpacity: 0.1,
        strokeWeight: random_item([5])
      });
      timer_id = window.setInterval(test, Math.round(Math.random(200)*200));
      if (path_points.length > 2) {
        queue = path_points;
      }
    },
    test = function() {
      if (queue_pointer > queue.length - 1) {
        window.clearInterval(timer_id);
        return;
      }
      var next_point = queue[queue_pointer];
      path.push(next_point);
      queue_pointer++;
    };
    init();
};

function random_item(array) {
  return array[Math.floor(Math.random()*array.length)];
}
