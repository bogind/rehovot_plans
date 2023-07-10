const colors = {
    "blue": "#2177c2",
    "green": "#589d2a",
    "pink": "#e9629c",
    "cyan": "#16b4ff",
    "yellow": "#f29f25",
    "orange": "#ea4124",
    "brown": "#a43623"
}

maplibregl.setRTLTextPlugin(
    'https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js',
    null,
    true // Lazy load the plugin
    );

var map = new maplibregl.Map({
    container: 'map',
    style: './style.json',
    center: [ 34.806658, 31.895417], // starting position [lng, lat]
    zoom: 14 // starting zoom
    });

function addSources(map){
    map.addSource('transportation_line1', {
        type: 'geojson',
        data: './trans_line1.geojson'
        });

    map.addSource('transportation_line2', {
        type: 'geojson',
        data: './trans_line2.geojson'
        });

    map.addSource('transportation_points', {
        type: 'geojson',
        data: './trans_points.geojson'
        });

    addTransportationLayers()
}

function addTransportationLayers(){
    map.addLayer({
        'id': 'transportation_line1',
        'type': 'line',
        'source': 'transportation_line1',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'visible'
            },
        'paint': {
            'line-color': colors['blue'],
            'line-width': 4
            }
        });

    map.addLayer({
        'id': 'transportation_line1_label',
        'type': 'symbol',
        'source': 'transportation_line1',
        'layout': {
            'icon-image': 'road (tunnel)/tertiary shield/5',
            'icon-text-fit-padding': [10,10,10,10],
            'icon-text-fit': 'both',
            'symbol-placement': 'line-center',
            'text-field': ['get', 'popupContent'],
            "text-font": ["Open Sans Regular"],
            "text-offset": [0, 2.5],
            'text-size': 14,
            'visibility': 'visible'
            },
        'paint': {
            'text-color': '#ffffff',
            'text-halo-color': colors['blue'],
            'text-halo-width': 10
            }

    });

    map.addLayer({
        'id': 'transportation_line2',
        'type': 'line',
        'source': 'transportation_line2',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round',
            'visibility': 'none'
            },
        'paint': {
            'line-color': ['get', 'color'],
            'line-width': 6
            }
        });

    map.addLayer({
        'id': 'transportation_points',
        'type': 'circle',
        'source': 'transportation_points',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-radius': 6,
            'circle-color': '#B42222'
            }
        });
}

map.on('load', function () {
    addSources(map);
    

});