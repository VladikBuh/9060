export type CloudExplTimelineEvent = {
  eventId: string;
  title: string;
  stepLabel: string;
  dateLabel: string;
  description: string;
  image: number;
};

export const cloudExplTimelineEvents: CloudExplTimelineEvent[] = [
  {
    eventId: 'early-concepts',
    title: 'Early Concepts',
    stepLabel: 'Early Concepts',
    dateLabel: '1783–1850',
    description: `The idea of controlled flight began long before the first practical airships appeared. Inventors experimented with hot-air balloons and gas-filled aircraft, hoping to create vehicles capable of carrying people through the sky. Most early designs could only drift with the wind and offered little control.

Engineers across Europe searched for ways to add propulsion and steering systems. These experiments laid the foundation for future airship development and inspired a generation of aviation pioneers. Although limited in success, they proved that human flight was possible.`,
    image: require('../cloudExplAssts/images/timelineEarlyConcepts.png'),
  },
  {
    eventId: 'first-practical-airships',
    title: 'First Practical Airships',
    stepLabel: 'First Airships',
    dateLabel: '1850–1900',
    description: `During the second half of the nineteenth century, inventors began building airships equipped with engines and rudimentary steering systems. These aircraft demonstrated that controlled flight could be achieved rather than simply drifting with air currents. Several successful demonstrations attracted public attention and financial support.

Designs improved rapidly as engineers experimented with different shapes and propulsion methods. Each new prototype increased range, reliability, and maneuverability. By the end of the century, airships were becoming a realistic transportation technology.`,
    image: require('../cloudExplAssts/images/BirthOfTheAirship.png'),
  },
  {
    eventId: 'zeppelin-era-begins',
    title: 'Zeppelin Era Begins',
    stepLabel: 'Zeppelin Era',
    dateLabel: '1900–1914',
    description: `The launch of the first Zeppelin airship marked the beginning of a new chapter in aviation history. Count Ferdinand von Zeppelin introduced rigid airships supported by lightweight metal frameworks, allowing them to grow much larger than previous designs. These innovations dramatically improved performance and passenger capacity.

Public fascination with Zeppelins spread throughout Europe. Successful flights demonstrated the potential of long-distance aerial transportation and encouraged further investment. Airships soon became symbols of technological progress and national pride.`,
    image: require('../cloudExplAssts/images/CountZeppelinsDream.png'),
  },
  {
    eventId: 'passenger-travel-expansion',
    title: 'Passenger Travel Expansion',
    stepLabel: 'Passenger Travel',
    dateLabel: '1919–1928',
    description: `Following the First World War, airships began serving civilian transportation routes. Companies introduced passenger services that connected major cities and offered a comfortable alternative to long sea voyages. Travelers enjoyed observation lounges, dining areas, and spacious cabins.

International routes expanded rapidly and airships started crossing oceans. Their ability to carry passengers across vast distances helped establish commercial aviation as a viable industry. The period marked the beginning of luxury air travel.`,
    image: require('../cloudExplAssts/images/CrossingTheAtlantic.png'),
  },
  {
    eventId: 'polar-exploration',
    title: 'Polar Exploration',
    stepLabel: 'Polar Exploration',
    dateLabel: '1926–1928',
    description: `Airships became powerful tools for exploring the Arctic during the 1920s. Their long range and ability to remain airborne for extended periods allowed crews to travel across regions that were nearly impossible to reach by conventional means. Scientific observations collected during these missions expanded knowledge of the polar environment.

Famous expeditions such as the Norge and Italia flights captured worldwide attention. Explorers crossed sea ice, mapped remote areas, and demonstrated the capabilities of airship technology. These achievements became major milestones in exploration history.`,
    image: require('../cloudExplAssts/images/TheNorgeExpedition.png'),
  },
  {
    eventId: 'golden-age',
    title: 'Golden Age',
    stepLabel: 'Golden Age',
    dateLabel: '1928–1936',
    description: `The late 1920s and early 1930s represented the peak of airship travel. Large passenger airships regularly crossed the Atlantic, transporting travelers between Europe and the Americas in comfort and style. Their elegant interiors and impressive size attracted global admiration.

Aircraft such as Graf Zeppelin became internationally recognized symbols of innovation. Successful commercial operations proved that airships could support long-distance transportation networks. For many people, they appeared to represent the future of aviation.`,
    image: require('../cloudExplAssts/images/LifeOnBoard.png'),
  },
  {
    eventId: 'hindenburg-and-decline',
    title: 'Hindenburg And Decline',
    stepLabel: 'Hindenburg',
    dateLabel: '1937–1950',
    description: `The Hindenburg disaster in 1937 changed public perception of airships almost overnight. Images of the accident spread around the world and raised serious concerns about safety. Passenger confidence declined rapidly following the tragedy.

At the same time, airplane technology advanced quickly and offered faster travel times. Airlines expanded their services while airship operators struggled to remain competitive. By the middle of the century, the era of giant passenger airships had largely come to an end.`,
    image: require('../cloudExplAssts/images/TheHindenburgDisaster.png'),
  },
  {
    eventId: 'modern-revival',
    title: 'Modern Revival',
    stepLabel: 'Modern Revival',
    dateLabel: '1950–Present',
    description: `Although large passenger airships disappeared, interest in the technology never completely vanished. Engineers continued developing new concepts using modern materials, improved propulsion systems, and advanced navigation equipment. These projects focused on efficiency, sustainability, and specialized applications.

Today, modern airships are being explored for tourism, scientific research, surveillance, and cargo transportation. Their ability to remain airborne for long periods offers unique advantages in certain situations. The story of airships continues as new generations revisit the possibilities of lighter-than-air flight.`,
    image: require('../cloudExplAssts/images/ModernAirshipRevival.png'),
  },
];
