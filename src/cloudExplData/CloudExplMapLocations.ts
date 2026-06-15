export type CloudExplMapLocation = {
  locationId: string;
  title: string;
  airshipName: string;
  shortDescription: string;
  longDescription: string;
  image: number;
  latitude: number;
  longitude: number;
};

export const cloudExplMapLocations: CloudExplMapLocation[] = [
  {
    locationId: 'greenland',
    title: 'Greenland',
    airshipName: 'Polar Explorer',
    shortDescription: 'Airships over vast ice',
    longDescription: `Greenland's immense ice sheet attracted explorers seeking new routes and scientific discoveries. Airships offered a unique way to observe glaciers, coastlines, and remote regions that were difficult to reach by other means.

Flights above Greenland provided valuable geographic information and breathtaking aerial views. The territory became closely associated with the adventurous spirit of polar aviation.`,
    image: require('../cloudExplAssts/images/iron-cloud-explorer-reaching-the-north-pole.png'),
    latitude: 64.2,
    longitude: -51.7,
  },
  {
    locationId: 'iceland',
    title: 'Iceland',
    airshipName: 'Arctic Survey Airship',
    shortDescription: 'Gateway to northern skies',
    longDescription: `Iceland served as an important reference point for many northern aviation routes. Its strategic location between Europe and the Arctic made it valuable for navigation and exploration planning.

Several proposed airship projects considered Iceland an ideal stop for future polar operations. The island's dramatic landscapes and northern position made it a natural gateway to Arctic exploration.`,
    image: require('../cloudExplAssts/images/iron-cloud-explorer-polar-weather-challenges.png'),
    latitude: 64.9,
    longitude: -19.0,
  },
  {
    locationId: 'norway',
    title: 'Svalbard, Norway',
    airshipName: 'Norge',
    shortDescription: 'First successful polar crossing',
    longDescription: `The Norge airship gained fame for its historic Arctic expedition in 1926. Departing from Svalbard, the crew traveled across the North Pole before continuing toward Alaska, achieving one of the most important milestones in polar exploration.

The mission proved that airships could operate successfully in extreme northern conditions. Today, Norge remains one of the most celebrated aircraft in the history of Arctic aviation.`,
    image: require('../cloudExplAssts/images/iron-cloud-explorer-the-norge-expedition.png'),
    latitude: 78.2,
    longitude: 15.6,
  },
  {
    locationId: 'germany',
    title: 'Germany',
    airshipName: 'Graf Zeppelin',
    shortDescription: "Germany's most famous airship",
    longDescription: `Graf Zeppelin became one of the most successful airships ever built. Operated by Germany during the late 1920s and 1930s, it completed hundreds of flights and carried thousands of passengers across Europe and the Atlantic Ocean. Its reliability helped establish airships as a practical form of long-distance travel.

The airship also participated in scientific expeditions and record-breaking journeys. Its global flights captured public imagination and demonstrated the remarkable capabilities of rigid airship technology.`,
    image: require('../cloudExplAssts/images/iron-cloud-explorer-count-zeppelins-dream.png'),
    latitude: 47.7,
    longitude: 9.5,
  },
  {
    locationId: 'france',
    title: 'France',
    airshipName: 'Early Airship Experiments',
    shortDescription: 'Pioneering aviation innovation',
    longDescription: `France played a significant role in the early development of controlled flight. Inventors experimented with powered balloons and airships long before the Golden Age of Airships began.

These early achievements helped establish many principles later used by larger airship designs. French pioneers contributed important ideas that influenced the future of aviation throughout Europe.`,
    image: require('../cloudExplAssts/images/iron-cloud-explorer-birth-of-the-airship.png'),
    latitude: 48.9,
    longitude: 2.3,
  },
  {
    locationId: 'italy',
    title: 'Italy',
    airshipName: 'Italia',
    shortDescription: 'Ambitious Arctic exploration mission',
    longDescription: `The Italia airship was designed by Italian engineer Umberto Nobile and launched shortly after the success of the Norge expedition. Its mission focused on scientific research and exploration across the Arctic Ocean.

Although the expedition encountered difficulties after a crash on the return journey, the mission provided valuable scientific observations. The story of Italia remains one of the most dramatic chapters in polar aviation history.`,
    image: require('../cloudExplAssts/images/iron-cloud-explorer-airships-above-the-arctic.png'),
    latitude: 45.5,
    longitude: 9.2,
  },
  {
    locationId: 'russia',
    title: 'Russia',
    airshipName: 'Soviet Airship Program',
    shortDescription: 'Airships across vast territories',
    longDescription: `During the early twentieth century, the Soviet Union invested in several airship projects. Engineers hoped these aircraft could support transportation and exploration across the country's immense territory.

Although many programs faced technical and economic challenges, they contributed valuable knowledge to aviation development. Soviet airships remain an interesting chapter in the broader history of lighter-than-air travel.`,
    image: require('../cloudExplAssts/images/iron-cloud-explorer-decline-of-giant-airships.png'),
    latitude: 55.8,
    longitude: 37.6,
  },
  {
    locationId: 'canada',
    title: 'Canada',
    airshipName: 'Northern Patrol Airship',
    shortDescription: 'Watching remote frontiers',
    longDescription: `Canada's northern territories presented enormous transportation challenges due to their size and isolation. Airships were viewed as potential tools for connecting remote communities and monitoring vast wilderness regions.

Exploratory flights demonstrated how lighter-than-air aircraft could operate above forests, lakes, and Arctic landscapes. These concepts influenced future discussions about transportation in northern Canada.`,
    image: require('../cloudExplAssts/images/iron-cloud-explorer-airship-navigation.png'),
    latitude: 62.5,
    longitude: -96.0,
  },
  {
    locationId: 'united-states',
    title: 'United States',
    airshipName: 'Hindenburg',
    shortDescription: 'Icon of passenger travel',
    longDescription: `The Hindenburg was among the largest airships ever constructed and became a symbol of luxury transatlantic travel. Passengers enjoyed spacious interiors, elegant dining areas, and spectacular views during journeys between Europe and North America.

Its tragic destruction during landing in New Jersey in 1937 shocked the world. The disaster marked a turning point that accelerated the decline of passenger airship transportation.`,
    image: require('../cloudExplAssts/images/iron-cloud-explorer-the-hindenburg-disaster.png'),
    latitude: 40.0,
    longitude: -74.3,
  },
  {
    locationId: 'brazil',
    title: 'Brazil',
    airshipName: 'Graf Zeppelin Route',
    shortDescription: 'South American connection',
    longDescription: `Brazil played an important role in the era of transatlantic airship travel. Graf Zeppelin regularly visited Brazilian cities, creating one of the most successful international routes of the period.

Special airship facilities were constructed to support these operations. The route strengthened connections between Europe and South America while demonstrating the growing reach of airship transportation.`,
    image: require('../cloudExplAssts/images/iron-cloud-explorer-crossing-the-atlantic.png'),
    latitude: -22.9,
    longitude: -43.2,
  },
];

export const cloudExplMapInitialRegion = (() => {
  const latitudes = cloudExplMapLocations.map(item => item.latitude);
  const longitudes = cloudExplMapLocations.map(item => item.longitude);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: Math.max(20, (maxLat - minLat) * 1.35),
    longitudeDelta: Math.max(30, (maxLng - minLng) * 1.35),
  };
})();

export const cloudExplMapAndroidCamera = {
  center: {
    latitude: cloudExplMapInitialRegion.latitude,
    longitude: cloudExplMapInitialRegion.longitude,
  },
  pitch: 0,
  heading: 0,
  zoom: 2,
};

export const cloudExplGetMapLocation = (locationId: string) =>
  cloudExplMapLocations.find(item => item.locationId === locationId);
