import {cloudExplArticles} from '../cloudExplData/CloudExplArticles';
import {cloudExplQuizzes} from '../cloudExplData/CloudExplQuizData';
import {cloudExplTimelineEvents} from '../cloudExplData/CloudExplTimelineEvents';

export function cloudExplBuildSettingsStats(favoriteCount: number) {
  return {
    articlesTotal: cloudExplArticles.length,
    quizzesTotal: cloudExplQuizzes.length,
    timelineEvents: cloudExplTimelineEvents.length,
    favoritesSaved: favoriteCount,
  };
}
