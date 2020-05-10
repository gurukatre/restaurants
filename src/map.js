
var markers = [];
var map;
var infowindow;
// Initialize and add the map
export default function initMap() {
	var center = { lat: 51.1657, lng: 10.4515 };
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 9,
		center: center
	});
	infowindow = new google.maps.InfoWindow({});
}

var marker
var count;
// add markers
export function addMarkers(title, lat, lng) {
	marker = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: map,
		title: title
	});
	markers.push(marker);
	google.maps.event.addListener(marker, 'click', (function (marker, count) {
		return addInfo.bind(this, title, map, marker);
	})(marker, count));

	return [map, marker];
}

// on click on list show the restaurant in the map
export function addInfo(title, map, marker) {
	infowindow.setContent(title);
	infowindow.open(map, marker);
}

export function removeMarker(marker){
	console.log(marker);
    markers[markers.indexOf(marker)].setMap(null);
}

