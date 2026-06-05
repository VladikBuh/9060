import type {MapStyleElement} from 'react-native-maps';

export const cloudExplMapStyle: MapStyleElement[] = [
  {elementType: 'geometry', stylers: [{color: '#E8F4FC'}]},
  {elementType: 'labels', stylers: [{visibility: 'off'}]},
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#0D4A4A'}],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{color: '#E8F4FC'}],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{color: '#B8D4E8'}],
  },
  {
    featureType: 'poi',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'road',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'transit',
    stylers: [{visibility: 'off'}],
  },
];
