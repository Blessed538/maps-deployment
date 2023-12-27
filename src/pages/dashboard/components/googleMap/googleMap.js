import React, {useEffect, useState} from 'react';
import { GoogleMap, useJsApiLoader, Polygon } from '@react-google-maps/api';
import geoJsonDataLink from '../data/nigeria.geojson'

const containerStyle = {
   height: "500px", 
   width: "100%"
};

const nigeriaBounds = {
  north: 13.9,
  south: 4.2,
  west: 3.0,
  east: 15.0,
};


const center = { lat: 9.037, lng: 7.365 };

function NigeriaGoogleMap() {
  return null
//     const [map, setMap] = React.useState(null);
//     const [highlightedState, setHighlightedState] = React.useState(null);
    
//     const [geoJsonData, setGeoJsonData] = useState(null);

//     const [apikey, setApiKey] = useState(process.env.REACT_APP_GOOGLE_MAP_KEY ||  "")


//   useEffect(() => {
//     const fetchGeoJsonData = async () => {
//       try {
//         const response = await fetch(geoJsonDataLink);
//         const data = await response.json();
//         setGeoJsonData(data);
//       } catch (error) {
//         console.error('Error fetching or parsing GeoJSON data:', error);
//       }
//     };
//         fetchGeoJsonData();
//   }, [geoJsonData]);

//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: apikey,
//   });

//   const onLoad = React.useCallback(function callback(map) {
//     setMap(map);
//   }, []);

//   const onUnmount = React.useCallback(function callback() {
//     setMap(null);
//   }, []);

//   const handleStateMouseOver = (stateCode) => {
//     setHighlightedState(stateCode);
//   };

//   const handleStateMouseOut = () => {
//     setHighlightedState(null);
//   };

  
// const generateColor = (() => {
//   const usedHues = {};

//   return (stateCode) => {
   
//     const hue = stateCode.charCodeAt(0) * 7 % 360;

//     let adjustedHue = hue;
//     let counter = 0;
//     while (usedHues[adjustedHue] !== undefined) {
//       adjustedHue = (hue + counter * 60) % 360; 
//       counter++;
//     }

//     usedHues[adjustedHue] = true;

//     return `hsl(${adjustedHue}, 70%, 50%)`;
//   };
// })();



// const mapStyles = [
//   { stylers: [{ visibility: 'off' }] },
//   {
//     featureType: 'landscape',
//     elementType: 'geometry',
//     stylers: [{ visibility: 'on' }, { color: '#fcfcfc' }],
//   },
//   {
//     featureType: 'water',
//     elementType: 'geometry',
//     stylers: [{ visibility: 'on' }, { color: '#bfd4ff' }],
//   },
// ];

// const options = {
//   styles: mapStyles,
//   restriction: {
//     latLngBounds: nigeriaBounds,
//   },
// };


//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={6}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//       options={options}
//     >
//      {geoJsonData && geoJsonData.features.map((feature, index) => {
//        const coordinates = feature.geometry.coordinates[0][0];
//        const stateCode = feature.properties.statecode;
//        const fillColor = highlightedState === stateCode ? '#FFD700' : generateColor(stateCode);
       
//         return (
//           <Polygon
//             key={index}
//             paths={coordinates.map(coord => ({ lat: coord[1], lng: coord[0] }))}
//             options={{
//               fillColor,
//               fillOpacity: 1,
//               strokeColor: '#FFF',
//               strokeOpacity: 1,
//               strokeWeight: 1,
//             }}
//             onMouseOver={() => handleStateMouseOver(feature.properties.statecode)}
//             onMouseOut={handleStateMouseOut}
//           />
//         );
//       })}
//     </GoogleMap>
//   ) : null;
}

export default React.memo(NigeriaGoogleMap);
