import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  cloudExplLoadReadArticles,
  cloudExplSaveReadArticles,
} from '../cloudExplStrg/CloudExplArticlesStorage';

type CloudExplArticlesState = {
  readIds: string[];
  isRead: (articleId: string) => boolean;
  markAsRead: (articleId: string) => void;
  reloadReadIds: () => Promise<void>;
};

const cloudExplArticlesContext =
  createContext<CloudExplArticlesState | null>(null);

export function CloudExplArticlesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [readIds, setReadIds] = useState<string[]>([]);

  const reloadReadIds = useCallback(async () => {
    const loaded = await cloudExplLoadReadArticles();
    setReadIds(loaded);
  }, []);

  useEffect(() => {
    void reloadReadIds();
  }, [reloadReadIds]);

  const markAsRead = useCallback((articleId: string) => {
    setReadIds(prev => {
      if (prev.includes(articleId)) {
        return prev;
      }
      const next = [...prev, articleId];
      void cloudExplSaveReadArticles(next);
      return next;
    });
  }, []);

  const isRead = useCallback(
    (articleId: string) => readIds.includes(articleId),
    [readIds],
  );

  const value = useMemo<CloudExplArticlesState>(
    () => ({
      readIds,
      isRead,
      markAsRead,
      reloadReadIds,
    }),
    [readIds, isRead, markAsRead, reloadReadIds],
  );

  return (
    <cloudExplArticlesContext.Provider value={value}>
      {children}
    </cloudExplArticlesContext.Provider>
  );
}

export function useCloudExplArticles() {
  const context = useContext(cloudExplArticlesContext);
  if (!context) {
    throw new Error(
      'useCloudExplArticles must be used within CloudExplArticlesProvider',
    );
  }
  return context;
}

