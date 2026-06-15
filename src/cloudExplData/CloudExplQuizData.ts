import {cloudExplArticles} from './CloudExplArticles';
import {cloudExplMapLocations} from './CloudExplMapLocations';

export type CloudExplQuizQuestion = {
  questionId: string;
  sourceId: string;
  sourceType: 'article' | 'map';
  question: string;
  options: string[];
  correctIndex: number;
  image: number;
};

const cloudExplArticleImage = (articleId: string) =>
  cloudExplArticles.find(item => item.articleId === articleId)?.image ??
  require('../cloudExplAssts/images/iron-cloud-explorer-birth-of-the-airship.png');

const cloudExplMapImage = (locationId: string) =>
  cloudExplMapLocations.find(item => item.locationId === locationId)?.image ??
  require('../cloudExplAssts/images/iron-cloud-explorer-map.png');

const cloudExplQuizQuestion = (
  questionId: string,
  sourceType: 'article' | 'map',
  sourceId: string,
  question: string,
  options: string[],
  correctIndex: number,
): CloudExplQuizQuestion => ({
  questionId,
  sourceType,
  sourceId,
  question,
  options,
  correctIndex,
  image:
    sourceType === 'article'
      ? cloudExplArticleImage(sourceId)
      : cloudExplMapImage(sourceId),
});

export const cloudExplQuizQuestions: CloudExplQuizQuestion[] = [
  cloudExplQuizQuestion(
    'article-birth-1',
    'article',
    'BirthOfTheAirship',
    'What was the main limitation of early balloons?',
    [
      'Could not carry passengers',
      'Were too expensive',
      'Flew too fast',
      'Used electricity',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-birth-2',
    'article',
    'BirthOfTheAirship',
    'What invention eventually led to controlled aerial travel?',
    ['Airships', 'Helicopters', 'Rockets', 'Gliders'],
    0,
  ),
  cloudExplQuizQuestion(
    'article-zeppelin-1',
    'article',
    'CountZeppelinsDream',
    'Who was responsible for developing rigid Zeppelin airships?',
    [
      'Ferdinand von Zeppelin',
      'Roald Amundsen',
      'Umberto Nobile',
      'Alberto Santos-Dumont',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-zeppelin-2',
    'article',
    'CountZeppelinsDream',
    'What made Zeppelin airships different?',
    [
      'Rigid metal framework',
      'Wooden wings',
      'Steam engines',
      'Solar power',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-atlantic-1',
    'article',
    'CrossingTheAtlantic',
    'What route helped make airships famous?',
    [
      'Atlantic crossings',
      'Pacific crossings',
      'Antarctic crossings',
      'Desert crossings',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-atlantic-2',
    'article',
    'CrossingTheAtlantic',
    'What attracted passengers to airships?',
    [
      'Comfort and luxury',
      'Affordable tickets',
      'High speed racing',
      'Military service',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-arctic-1',
    'article',
    'AirshipsAboveTheArctic',
    'Why were airships useful in the Arctic?',
    [
      'They could fly above difficult terrain',
      'They could dive underwater',
      'They could break sea ice',
      'They needed no fuel',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-arctic-2',
    'article',
    'AirshipsAboveTheArctic',
    'What did explorers study during Arctic flights?',
    [
      'Glaciers and ice fields',
      'Volcanoes only',
      'Rainforests',
      'Coral reefs',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-norge-1',
    'article',
    'TheNorgeExpedition',
    'Which airship completed a famous Arctic expedition in 1926?',
    ['Norge', 'Hindenburg', 'Graf Zeppelin', 'Italia'],
    0,
  ),
  cloudExplQuizQuestion(
    'article-norge-2',
    'article',
    'TheNorgeExpedition',
    'Who helped lead the Norge expedition?',
    [
      'Roald Amundsen',
      'Ferdinand von Zeppelin',
      'Charles Lindbergh',
      'Howard Hughes',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-pole-1',
    'article',
    'ReachingTheNorthPole',
    'Why did airships help reach the North Pole?',
    [
      'They avoided dangerous ice routes',
      'They moved underwater',
      'They created ice roads',
      'They used skis',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-pole-2',
    'article',
    'ReachingTheNorthPole',
    'What did polar flights provide?',
    [
      'Scientific observations',
      'Gold deposits',
      'New cities',
      'Military bases',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-life-1',
    'article',
    'LifeOnBoard',
    'What feature was commonly found inside passenger airships?',
    [
      'Observation lounges',
      'Swimming pools',
      'Garages',
      'Factories',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-life-2',
    'article',
    'LifeOnBoard',
    'How did many passengers describe airship travel?',
    [
      'Peaceful and comfortable',
      'Loud and dangerous',
      'Extremely crowded',
      'Very short',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-nav-1',
    'article',
    'AirshipNavigation',
    'What tool was important for airship navigation?',
    ['Compass', 'Radar gun', 'Sonar', 'Telescope only'],
    0,
  ),
  cloudExplQuizQuestion(
    'article-nav-2',
    'article',
    'AirshipNavigation',
    'Before satellites, navigators often used?',
    [
      'Celestial observations',
      'Smartphones',
      'GPS trackers',
      'Drones',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-weather-1',
    'article',
    'PolarWeatherChallenges',
    'What was a major Arctic challenge for airships?',
    [
      'Strong winds',
      'Sandstorms only',
      'Tropical rain',
      'Earthquakes',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-weather-2',
    'article',
    'PolarWeatherChallenges',
    'Why was weather monitoring important?',
    [
      'Conditions changed quickly',
      'It reduced ticket prices',
      'It increased speed automatically',
      'It improved visibility permanently',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-hindenburg-1',
    'article',
    'TheHindenburgDisaster',
    'What was the Hindenburg?',
    [
      'A giant passenger airship',
      'A submarine',
      'A train',
      'A helicopter',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-hindenburg-2',
    'article',
    'TheHindenburgDisaster',
    'Where did the Hindenburg disaster occur?',
    ['New Jersey', 'Alaska', 'Iceland', 'Norway'],
    0,
  ),
  cloudExplQuizQuestion(
    'article-decline-1',
    'article',
    'DeclineOfGiantAirships',
    'What technology eventually replaced passenger airships?',
    ['Airplanes', 'Trains', 'Balloons', 'Ships'],
    0,
  ),
  cloudExplQuizQuestion(
    'article-decline-2',
    'article',
    'DeclineOfGiantAirships',
    'What event accelerated the decline of airships?',
    [
      'The Hindenburg disaster',
      'World Cup',
      'Moon landing',
      'Panama Canal opening',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-modern-1',
    'article',
    'ModernAirshipRevival',
    'What are modern airships often considered for?',
    [
      'Research and cargo transport',
      'Space travel',
      'Deep-sea mining',
      'Underground transport',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'article-modern-2',
    'article',
    'ModernAirshipRevival',
    'Why are some modern airship projects attractive?',
    [
      'Lower environmental impact',
      'Unlimited speed',
      'No maintenance',
      'No weather limitations',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'map-germany-1',
    'map',
    'germany',
    'Which country was associated with Graf Zeppelin?',
    ['Germany', 'France', 'Canada', 'Brazil'],
    0,
  ),
  cloudExplQuizQuestion(
    'map-germany-2',
    'map',
    'germany',
    'What made Graf Zeppelin famous?',
    [
      'Successful long-distance flights',
      'Underwater exploration',
      'Rocket launches',
      'Military battles',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'map-norway-1',
    'map',
    'norway',
    'What achievement is Norge known for?',
    [
      'Crossing the Arctic',
      'Crossing the Sahara',
      'Circumnavigating Australia',
      'Flying around Antarctica',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'map-norway-2',
    'map',
    'norway',
    'Where did the Norge expedition begin?',
    ['Svalbard', 'Greenland', 'Alaska', 'Iceland'],
    0,
  ),
  cloudExplQuizQuestion(
    'map-italy-1',
    'map',
    'italy',
    'Who designed the Italia airship?',
    [
      'Umberto Nobile',
      'Ferdinand von Zeppelin',
      'Roald Amundsen',
      'Igor Sikorsky',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'map-italy-2',
    'map',
    'italy',
    'What was the mission of Italia?',
    [
      'Arctic research',
      'Passenger tourism',
      'Cargo delivery',
      'Military patrol',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'map-usa-1',
    'map',
    'united-states',
    'What type of vehicle was Hindenburg?',
    ['Passenger airship', 'Cargo ship', 'Airplane', 'Submarine'],
    0,
  ),
  cloudExplQuizQuestion(
    'map-usa-2',
    'map',
    'united-states',
    'Why is Hindenburg remembered today?',
    [
      'Its tragic disaster',
      'Winning a race',
      'Reaching the Moon',
      'Discovering the Pole',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'map-brazil-1',
    'map',
    'brazil',
    'Which continent was connected to Graf Zeppelin routes?',
    ['South America', 'Africa', 'Australia', 'Antarctica'],
    0,
  ),
  cloudExplQuizQuestion(
    'map-brazil-2',
    'map',
    'brazil',
    'What country became a famous stop for Graf Zeppelin?',
    ['Brazil', 'Japan', 'India', 'Egypt'],
    0,
  ),
  cloudExplQuizQuestion(
    'map-iceland-1',
    'map',
    'iceland',
    'Why was Iceland important to Arctic aviation?',
    [
      'Strategic northern location',
      'Large deserts',
      'Dense jungles',
      'Warm climate',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'map-iceland-2',
    'map',
    'iceland',
    'What natural feature is Iceland famous for?',
    [
      'Glaciers and volcanic landscapes',
      'Rainforests',
      'Coral reefs',
      'Sand dunes',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'map-greenland-1',
    'map',
    'greenland',
    "What dominates Greenland's landscape?",
    [
      'Massive ice sheets',
      'Deserts',
      'Rainforests',
      'Grasslands',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'map-greenland-2',
    'map',
    'greenland',
    'Why did explorers fly over Greenland?',
    [
      'To study glaciers',
      'To harvest crops',
      'To mine coal',
      'To build cities',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'map-canada-1',
    'map',
    'canada',
    'What challenge made northern Canada difficult to reach?',
    [
      'Vast remote wilderness',
      'Dense cities',
      'Mountain tunnels',
      'Heavy traffic',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'map-canada-2',
    'map',
    'canada',
    'What natural feature is common in northern Canada?',
    [
      'Frozen lakes',
      'Tropical beaches',
      'Volcanoes',
      'Coral reefs',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'map-russia-1',
    'map',
    'russia',
    'Which country developed the Soviet airship program?',
    ['Russia', 'Germany', 'Norway', 'Italy'],
    0,
  ),
  cloudExplQuizQuestion(
    'map-russia-2',
    'map',
    'russia',
    'What was one goal of Soviet airships?',
    [
      'Transportation across large territories',
      'Space tourism',
      'Deep ocean research',
      'Sports events',
    ],
    0,
  ),
  cloudExplQuizQuestion(
    'map-france-1',
    'map',
    'france',
    'Which country pioneered many early airship experiments?',
    ['France', 'Brazil', 'Canada', 'Greenland'],
    0,
  ),
  cloudExplQuizQuestion(
    'map-france-2',
    'map',
    'france',
    'What did French inventors help develop?',
    [
      'Controlled flight concepts',
      'Nuclear reactors',
      'Satellites',
      'Submarines',
    ],
    0,
  ),
];

export const cloudExplQuizQuestionCount = cloudExplQuizQuestions.length;
export const cloudExplQuizRoundSize = 10;

export const cloudExplShuffleQuizQuestions = () => {
  const shuffled = [...cloudExplQuizQuestions];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }
  return shuffled;
};

export const cloudExplCreateQuizRound = () =>
  cloudExplShuffleQuizQuestions().slice(0, cloudExplQuizRoundSize);
