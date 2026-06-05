export type CloudExplArticle = {
  articleId: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: number;
};

export const cloudExplArticles: CloudExplArticle[] = [
  {
    articleId: 'BirthOfTheAirship',
    title: 'Birth of the Airship',
    shortDescription: 'The beginning of aerial travel',
    longDescription:
      `Long before airplanes filled the skies, inventors dreamed of creating vehicles that could travel through the air in a controlled way. Early balloons could rise above the ground, but they moved wherever the wind carried them. Engineers across Europe began searching for methods to guide these flying machines and choose their direction. Their experiments eventually led to the creation of the first airships.

During the nineteenth century, inventors tested different shapes, propulsion systems, and steering mechanisms. Some designs used lightweight engines, while others focused on improving stability in changing weather. Although many prototypes failed, each attempt provided valuable lessons that moved the technology forward. Public interest grew as newspapers reported on these remarkable experiments.

The arrival of the airship marked a turning point in transportation history. For the first time, people could imagine traveling through the sky with purpose rather than chance. These early developments inspired future generations of engineers and explorers. The foundation had been laid for the Golden Age of Airships that would soon follow.`,
    image: require('../cloudExplAssts/images/BirthOfTheAirship.png'),
  },
  {
    articleId: 'CountZeppelinsDream',
    title: "Count Zeppelin's Dream",
    shortDescription: "One man's flying vision",
    longDescription:
      `Count Ferdinand von Zeppelin believed that airships could transform long-distance travel. Inspired by military observation balloons and early aviation experiments, he dedicated his life to creating practical flying vessels. His vision focused on building large rigid structures that could carry passengers safely across great distances. At the time, many people considered the idea unrealistic.

Zeppelin introduced a revolutionary internal framework made from lightweight metal. This rigid design allowed airships to become much larger while maintaining their shape during flight. Engineers could place multiple gas cells inside the structure, increasing both safety and performance. The concept quickly distinguished Zeppelin airships from earlier designs.

Despite financial difficulties and technical setbacks, Zeppelin continued improving his creations. Public support eventually helped fund new projects, and successful flights attracted international attention. His determination turned a personal dream into a major aviation industry. Today, his name remains one of the most recognized in airship history.`,
    image: require('../cloudExplAssts/images/CountZeppelinsDream.png'),
  },
  {
    articleId: 'CrossingTheAtlantic',
    title: 'Crossing the Atlantic',
    shortDescription: 'Airships conquer ocean distances',
    longDescription:
      `Crossing the Atlantic Ocean was once considered one of the greatest transportation challenges in the world. Ships required many days to complete the journey, while weather conditions often created delays. Airships offered a faster and more comfortable alternative for travelers. Their long range made transatlantic routes possible for the first time.

Large passenger airships regularly traveled between Europe and the Americas. These flights featured dining rooms, lounges, sleeping accommodations, and observation windows. Travelers enjoyed a level of comfort rarely found in early aviation. The experience felt more like a floating hotel than a traditional aircraft.

Successful ocean crossings demonstrated the potential of commercial air travel. Newspapers celebrated new records and reported on each arrival with excitement. Airships became symbols of innovation and international connection. For a brief period, they represented the future of global transportation.`,
    image: require('../cloudExplAssts/images/CrossingTheAtlantic.png'),
  },
  {
    articleId: 'AirshipsAboveTheArctic',
    title: 'Airships Above the Arctic',
    shortDescription: 'Exploring frozen northern skies',
    longDescription:
      `The Arctic remained one of the least explored regions on Earth during the early twentieth century. Vast ice fields, unpredictable weather, and remote locations made traditional exploration difficult. Airships provided a unique solution by allowing explorers to travel above these obstacles. Their ability to remain airborne for long periods made them especially useful for polar missions.

Explorers used airships to survey glaciers, map coastlines, and observe changing ice conditions. Flights covered areas that were almost impossible to reach by ship or sled. Crews recorded valuable scientific information while capturing extraordinary views of the frozen landscape. Each expedition expanded knowledge of the far north.

The success of these missions demonstrated the versatility of airships. They were no longer viewed only as passenger vehicles but also as tools for discovery. Polar flights inspired public fascination and scientific interest. Their achievements became some of the most celebrated chapters in aviation history.`,
    image: require('../cloudExplAssts/images/AirshipsAboveTheArctic.png'),
  },
  {
    articleId: 'TheNorgeExpedition',
    title: 'The Norge Expedition',
    shortDescription: 'Historic journey over ice',
    longDescription:
      `The Norge expedition remains one of the most famous airship missions ever completed. In 1926, an international team set out to cross the Arctic using a specially designed airship. Their goal was to demonstrate the possibilities of long-range polar aviation. The mission attracted worldwide attention before it even began.

Led by Roald Amundsen and Umberto Nobile, the expedition departed from Svalbard and headed north. The crew traveled above vast stretches of sea ice and some of the most remote regions on Earth. Careful navigation and favorable weather helped them continue toward their objective. The flight eventually passed over the North Pole itself.

The successful completion of the mission became a landmark achievement in exploration history. It proved that airships could operate effectively in extreme polar conditions. Scientists and explorers gained valuable information from the journey. The Norge expedition remains a symbol of courage, innovation, and international cooperation.`,
    image: require('../cloudExplAssts/images/TheNorgeExpedition.png'),
  },
  {
    articleId: 'ReachingTheNorthPole',
    title: 'Reaching the North Pole',
    shortDescription: 'A milestone in exploration',
    longDescription:
      `For centuries, explorers dreamed of reaching the North Pole. Harsh temperatures, drifting ice, and difficult navigation made the region one of the world's greatest challenges. Many expeditions faced enormous obstacles before even approaching their goal. Airships eventually offered a new way to conquer the Arctic.

Flying above the ice allowed explorers to bypass many dangers encountered on the ground. Airships could cover enormous distances in a fraction of the time required by traditional expeditions. Crews observed the polar environment from a completely different perspective. Their journeys provided valuable geographic and scientific observations.

Reaching the North Pole by air represented a major achievement in human exploration. These flights demonstrated how technology could overcome natural barriers. The success of polar aviation inspired future research efforts. It also strengthened the reputation of airships as powerful exploration vehicles.`,
    image: require('../cloudExplAssts/images/ReachingTheNorthPole.png'),
  },
  {
    articleId: 'LifeOnBoard',
    title: 'Life On Board',
    shortDescription: 'Daily routines in the sky',
    longDescription:
      `Travel aboard a large airship was very different from traveling on early airplanes. Passengers enjoyed spacious interiors designed for comfort during long journeys. Observation windows offered spectacular views of oceans, mountains, and cities far below. Many travelers described the experience as peaceful and unforgettable.

Dining rooms, lounges, and personal mode cabins provided a level of luxury rarely available in aviation at the time. Guests could socialize, read, or simply relax while the airship moved steadily toward its destination. Meals were often prepared by professional staff and served in elegant surroundings. The atmosphere resembled that of an upscale hotel.

Behind the scenes, crew members worked continuously to maintain safe operations. Engineers monitored engines, navigators tracked routes, and specialists managed the airship's gas systems. Their teamwork ensured that each flight proceeded smoothly. Life aboard combined comfort, adventure, and cutting-edge technology.`,
    image: require('../cloudExplAssts/images/LifeOnBoard.png'),
  },
  {
    articleId: 'AirshipNavigation',
    title: 'Airship Navigation',
    shortDescription: 'Finding paths through clouds',
    longDescription:
      `Navigation was one of the most important responsibilities during every airship journey. Crews needed to determine their position while traveling across oceans, mountains, and remote wilderness. Without modern satellite systems, they relied on maps, compasses, and careful observation. Every decision could affect the success of a flight.

Navigators frequently used celestial observations to calculate their location. Radio communication provided additional information when available. Weather forecasts also played an essential role because changing conditions could force adjustments to planned routes. Maintaining accuracy required constant attention and experience.

Successful navigation helped make long-distance airship travel possible. It allowed crews to cross oceans, reach polar regions, and connect distant continents. These skills were especially important during exploration missions. The achievements of navigators contributed greatly to the success of the Golden Age of Airships.`,
    image: require('../cloudExplAssts/images/AirshipNavigation.png'),
  },
  {
    articleId: 'PolarWeatherChallenges',
    title: 'Polar Weather Challenges',
    shortDescription: 'Battling Arctic conditions',
    longDescription:
      `Polar regions presented some of the most difficult flying conditions in the world. Temperatures could drop dramatically, while strong winds often changed direction without warning. Ice accumulation created additional risks for aircraft operating in the Arctic. Every expedition required extensive planning and preparation.

Airship crews carefully monitored weather patterns before and during flights. Unexpected storms could reduce visibility and make navigation more difficult. Strong winds sometimes pushed airships away from their intended course. Despite these challenges, experienced crews learned how to adapt to changing conditions.

The ability to operate in such environments demonstrated the resilience of airship technology. Successful polar missions provided valuable information about Arctic weather systems. They also highlighted the skill and determination of the people involved. These experiences helped shape future exploration strategies.`,
    image: require('../cloudExplAssts/images/PolarWeatherChallenges.png'),
  },
  {
    articleId: 'TheHindenburgDisaster',
    title: 'The Hindenburg Disaster',
    shortDescription: 'Tragedy that changed aviation',
    longDescription:
      `The Hindenburg was one of the largest and most famous airships ever built. It represented the peak of passenger airship technology and regularly transported travelers across the Atlantic. Its impressive size and luxurious accommodations attracted worldwide attention. Many viewed it as a symbol of modern progress.

In 1937, the Hindenburg caught fire while attempting to land in New Jersey. The disaster was witnessed by spectators and recorded by news cameras. Images of the burning airship quickly spread around the world. The tragedy shocked the public and raised concerns about airship safety.

Although investigations continued for years, the disaster severely damaged public confidence in airships. Passenger demand declined rapidly after the incident. Aviation investment increasingly shifted toward airplanes. The Hindenburg disaster became a defining moment in transportation history.`,
    image: require('../cloudExplAssts/images/TheHindenburgDisaster.png'),
  },
  {
    articleId: 'DeclineOfGiantAirships',
    title: 'Decline of Giant Airships',
    shortDescription: 'End of a flying era',
    longDescription:
      `The decline of giant airships occurred gradually during the mid-twentieth century. Improvements in airplane technology offered faster travel times and greater operational flexibility. Airlines expanded their routes and attracted more passengers each year. Airships struggled to compete with these advantages.

The Hindenburg disaster further accelerated the decline. Public perception shifted as concerns about safety grew stronger. Economic challenges also made large airship operations difficult to maintain. Many companies chose to invest in airplanes instead.

By the 1950s, the era of giant passenger airships had largely come to an end. Most remaining airships served specialized purposes rather than commercial transportation. Despite their decline, their influence on aviation history remained significant. They continue to fascinate historians, engineers, and travelers today.`,
    image: require('../cloudExplAssts/images/DeclineOfGiantAirships.png'),
  },
  {
    articleId: 'ModernAirshipRevival',
    title: 'Modern Airship Revival',
    shortDescription: 'New ideas take flight',
    longDescription:
      `Although the Golden Age of Airships ended decades ago, interest in the technology never completely disappeared. Engineers continued exploring ways to modernize airship design using new materials and advanced systems. These efforts aimed to improve safety, efficiency, and environmental performance. Modern projects often focus on practical applications rather than luxury travel.

Contemporary airships are being considered for tourism, scientific research, and cargo transportation. Their ability to remain airborne for long periods makes them useful for certain specialized missions. Some designs emphasize low fuel consumption and reduced environmental impact. Others focus on reaching remote locations where traditional transportation is difficult.

The revival of airship development demonstrates the lasting appeal of these remarkable aircraft. While they are unlikely to replace airplanes, they may serve important roles in specific industries. New generations of engineers continue to build upon historic ideas. The story of airships is still being written.`,
    image: require('../cloudExplAssts/images/ModernAirshipRevival.png'),
  },
];
