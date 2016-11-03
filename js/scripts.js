$(document).ready(function() {

  var mymap = L.map("mapid").setView([45.520615, -122.677398], 13);

  var Stamen_Watercolor = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	ext: 'png'
}).addTo(mymap)

  var icon = L.icon ({
    iconUrl: 'img/imhere.png',
    iconSize: [50, 40],
    iconAnchor: [22, 94],
    popupAnchor: [0, -100]
  })

  var marker = L.marker([45.520615, -122.677398], {icon: icon}).addTo(mymap);
  marker.bindPopup("<b>Didn't expect to see you here.</b>").openPopup();

});
