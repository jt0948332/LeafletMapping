// Creating map object
var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 4
});
// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(myMap);


//Get the data
// Store API query variables
var URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//use the built in leaflet geojson reponse to get data.
d3.json(URL, function (response) {
    console.log(response);
    L.geoJSON(response, {
        //onEachFeature: onEachFeature
        pointToLayer: function(feature,latlng){
            return L.circleMarker(latlng);
        },style:styleInfo,
        // this calls the function: variable (onEachFeature)
        onEachFeature: onEachFeature
      }).addTo(myMap);

      // popups
      function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
          "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
      }
    
      // set up the colors
      function getColor(magnitude) {
        switch (true) {
        case magnitude > 5:
          return "#ea2c2c";
        case magnitude > 4:
          return "#ea822c";
        case magnitude > 3:
          return "#ee9c00";
        case magnitude > 2:
          return "#eecc00";
        case magnitude > 1:
          return "#d4ee00";
        default:
          return "#98ee00";
        }
      }
     function styleInfo(feature) {
        return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: getColor(feature.properties.mag),
          color: "#000000",
          radius: getRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
        };
      }
      function getRadius(magnitude) {
          // doesnt look likt this is necessary
        if (magnitude === 0) {
          return 1;
        }
    
        return magnitude * 4;
      }
// add the legend
       



});