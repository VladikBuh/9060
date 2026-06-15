import React, {useMemo} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {cloudExplImages} from '../../cloudExplAssts';
import {useCloudExplFavorites} from '../../cloudExplCtx/CloudExplFavoritesContext';
import {useCloudExplArticles} from '../../cloudExplCtx/CloudExplArticlesContext';
import {cloudExplArticles} from '../../cloudExplData/CloudExplArticles';
import {cloudExplNavigateRootScreen, cloudExplNavigateTab} from '../../cloudExplNav/CloudExplRootNavigation';
import {cloudExplColors} from '../../cloudExplThm/CloudExplTheme';

const cloudExplTabBarInset = 75;

export function CloudExplFavoritesScreen() {
  const {width} = useWindowDimensions();
  const {favoriteIds, toggleFavorite} = useCloudExplFavorites();
  const {isRead} = useCloudExplArticles();

  const cloudExplEmptyHeroSize = Math.min(width * 0.78, 306);

  const cloudExplSavedArticles = useMemo(
    () =>
      cloudExplArticles.filter(item => favoriteIds.includes(item.articleId)),
    [favoriteIds],
  );

  return (
    <LinearGradient
      colors={[
        cloudExplColors.onboardingGradientTop,
        cloudExplColors.onboardingGradientBottom,
      ]}
      style={styles.cloudExplRoot}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingTop: 66}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.cloudExplHeaderTitle}>Favorites</Text>

        {cloudExplSavedArticles.length === 0 ? (
          <View style={styles.cloudExplEmptyWrap}>
            <Image
              source={cloudExplImages.favoritesEmpty}
              style={[
                styles.cloudExplEmptyHero,
                {
                  width: cloudExplEmptyHeroSize,
                  height: cloudExplEmptyHeroSize,
                },
              ]}
              resizeMode="contain"
            />
            <Text style={styles.cloudExplEmptyTitle}>No Favorites Yet</Text>
            <Text style={styles.cloudExplEmptyBody}>
              Save articles and discoveries to access them quickly later.
            </Text>
            <Pressable
              style={styles.cloudExplExploreBtn}
              onPress={() => cloudExplNavigateTab('Articles')}>
              <Text style={styles.cloudExplExploreBtnText}>Explore</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.cloudExplScrollContent}
            showsVerticalScrollIndicator={false}>
            {cloudExplSavedArticles.map(article => {
              const read = isRead(article.articleId);

              return (
                <Pressable
                  key={article.articleId}
                  style={styles.cloudExplCard}
                  onPress={() =>
                    cloudExplNavigateRootScreen('ArticleDetail', {
                      articleId: article.articleId,
                    })
                  }>
                  <View style={styles.cloudExplCardInner}>
                    <View style={styles.cloudExplImageWrap}>
                      <Image
                        source={article.image}
                        style={styles.cloudExplImage}
                        resizeMode="cover"
                      />
                      {read ? (
                        <View style={styles.cloudExplReadBadge}>
                          <Text style={styles.cloudExplReadBadgeText}>
                            Read
                          </Text>
                        </View>
                      ) : null}
                    </View>

                    <View style={styles.cloudExplTextBlock}>
                      <Text style={styles.cloudExplCardTitle}>
                        {article.title}
                      </Text>
                      <Text style={styles.cloudExplCardSubTitle}>
                        {article.shortDescription}
                      </Text>
                    </View>

                    <View style={styles.cloudExplActionsRow}>
                      <Pressable
                        hitSlop={10}
                        onPress={async e => {
                          e.stopPropagation();
                          await Share.share({
                            message: `${article.title}\n\n${article.shortDescription}`,
                          });
                        }}
                        style={styles.cloudExplIconBtn}>
                        <Text style={styles.cloudExplIconText}>⤴︎</Text>
                      </Pressable>
                      <Pressable
                        hitSlop={10}
                        onPress={e => {
                          e.stopPropagation();
                          toggleFavorite(article.articleId);
                        }}
                        style={styles.cloudExplIconBtn}>
                        <Text
                          style={[
                            styles.cloudExplIconText,
                            styles.cloudExplHeartActive,
                          ]}>
                          ♥
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cloudExplRoot: {
    flex: 1,
    paddingBottom: cloudExplTabBarInset,
  },
  cloudExplHeaderTitle: {
    color: '#EAF4FF',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  cloudExplEmptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 24,
  },
  cloudExplEmptyHero: {
    marginBottom: 24,
  },
  cloudExplEmptyTitle: {
    color: '#EAF4FF',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    marginBottom: 8,
    textAlign: 'center',
  },
  cloudExplEmptyBody: {
    color: 'rgba(234, 244, 255, 0.62)',
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: 329,
  },
  cloudExplExploreBtn: {
    backgroundColor: '#A8D8FF',
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 12,
    minWidth: 115,
    alignItems: 'center',
  },
  cloudExplExploreBtnText: {
    color: '#1A4A7A',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
  cloudExplScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  cloudExplCard: {
    backgroundColor: '#316FBA',
    borderRadius: 14,
    padding: 14,
  },
  cloudExplCardInner: {
    gap: 8,
  },
  cloudExplImageWrap: {
    backgroundColor: '#5C8EC8',
    height: 110,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cloudExplImage: {
    width: '100%',
    height: '100%',
  },
  cloudExplReadBadge: {
    position: 'absolute',
    left: 8,
    top: 9,
    backgroundColor: '#09C8B2',
    opacity: 0.8,
    paddingHorizontal: 12,
    height: 23,
    borderRadius: 12,
    justifyContent: 'center',
  },
  cloudExplReadBadgeText: {
    color: '#EAF4FF',
    fontSize: 12,
    fontWeight: '500',
  },
  cloudExplCardTitle: {
    color: '#EAF4FF',
    fontSize: 15,
    fontWeight: '600',
  },
  cloudExplCardSubTitle: {
    color: 'rgba(234, 244, 255, 0.62)',
    fontSize: 13,
    fontWeight: '400',
  },
  cloudExplTextBlock: {
    gap: 4,
  },
  cloudExplActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 2,
    paddingTop: 8,
  },
  cloudExplIconBtn: {
    padding: 6,
  },
  cloudExplIconText: {
    color: 'rgba(234, 244, 255, 0.62)',
    fontSize: 18,
    fontWeight: '700',
  },
  cloudExplHeartActive: {
    color: '#FF6666',
  },
});
