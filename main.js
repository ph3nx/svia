var map;
var panorama;

function initialize() {

	var startPos = new google.maps.LatLng(40.745184,-73.992347);

	var mapOptions = {
		center: startPos,
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(
	document.getElementById('map_canvas'), mapOptions);

	var panoramaOptions = {
		position: startPos,
		pov: {
			heading: 170,
			zoom:0,
			pitch: 10
		}
	};

	panorama = new  google.maps.StreetViewPanorama(document.getElementById('pano'),panoramaOptions);
	map.setStreetView(panorama);

	google.maps.event.addListener(panorama, 'position_changed', updateData);
	google.maps.event.addListener(panorama, 'pov_changed', updateData);
}

function updateData() {
	size="600x600";
	lat =panorama.getPosition().lat();
	lng =panorama.getPosition().lng();
	heading= panorama.getPov().heading;
	pitch=panorama.getPov().pitch;
	zoom=panorama.getPov().zoom;
	var fov = 90/Math.max(1,zoom);
	url = "http://maps.googleapis.com/maps/api/streetview?location=" + lat + "," + lng + "&heading=" + heading + "&fov=" +fov + "&pitch=" + pitch + "&size=" + size + "&sensor=false";

	str = "<b> Lattitude:</b> "+lat+"<br>";	
	str +="<b> Longitude:</b> "+lng +"<br>";
	str +="<b> Heading:</b> "+heading+"<br>";
	str +="<b> Pitch:</b> "+pitch+"<br>";
	str +="<b> Zoom:</b> "+zoom+"<br>";
	str +="<b> FOV:</b> "+fov+"<br>";
	str +="<b> Image URL:</b> Right click <a target='_blank' href='"+url+"'>image</a> save as.";	
	document.getElementById("output").innerHTML = str;
}