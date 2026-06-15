import React from 'react';
import {CloudExplAppProvider} from '../cloudExplCtx/CloudExplAppContext';
import {CloudExplArticlesProvider} from '../cloudExplCtx/CloudExplArticlesContext';
import {CloudExplFavoritesProvider} from '../cloudExplCtx/CloudExplFavoritesContext';
import {CloudExplNavigationProvider} from './CloudExplNavigationContext';

export function CloudExplRootNavigator() {
  return (
    <CloudExplAppProvider>
      <CloudExplFavoritesProvider>
        <CloudExplArticlesProvider>
          <CloudExplNavigationProvider />
        </CloudExplArticlesProvider>
      </CloudExplFavoritesProvider>
    </CloudExplAppProvider>
  );
}
