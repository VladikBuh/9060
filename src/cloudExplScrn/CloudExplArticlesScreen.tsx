import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useCloudExplFavorites} from '../cloudExplCtx/CloudExplFavoritesContext';
import {useCloudExplArticles} from '../cloudExplCtx/CloudExplArticlesContext';
import {cloudExplArticles} from '../cloudExplData/CloudExplArticles';
import {cloudExplNavigateRootScreen} from '../cloudExplNav/CloudExplRootNavigation';
import {cloudExplColors} from '../cloudExplThm/CloudExplTheme';

export function CloudExplArticlesScreen() {
  const {toggleFavorite, isFavorite} = useCloudExplFavorites();
  const {isRead} = useCloudExplArticles();

  return (
    <LinearGradient
      colors={[
        cloudExplColors.onboardingGradientTop,
        cloudExplColors.onboardingGradientBottom,
      ]}
      style={styles.cloudExplRoot}>
      <ScrollView
        contentContainerStyle={styles.cloudExplScrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.cloudExplHeaderTitle}>Articles</Text>

        {cloudExplArticles.map(article => {
          const read = isRead(article.articleId);
          const favorite = isFavorite(article.articleId);

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
                      <Text style={styles.cloudExplReadBadgeText}>Read</Text>
                    </View>
                  ) : null}
                </View>

                <View style={styles.cloudExplTextBlock}>
                  <Text style={styles.cloudExplCardTitle}>{article.title}</Text>
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
                        favorite && styles.cloudExplHeartActive,
                      ]}>
                      {favorite ? '♥' : '♡'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cloudExplRoot: {
    flex: 1,
  },
  cloudExplTopBar: {
    backgroundColor: '#7EADDA',
  },
  cloudExplScrollContent: {
    paddingHorizontal: 16,
    paddingTop: 66,
    paddingBottom: 100,
    gap: 12,
  },
  cloudExplHeaderTitle: {
    color: '#EAF4FF',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 2,
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
