import React, {useMemo} from 'react';
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
import {useCloudExplArticles} from '../../cloudExplCtx/CloudExplArticlesContext';
import {useCloudExplFavorites} from '../../cloudExplCtx/CloudExplFavoritesContext';
import {cloudExplArticles} from '../../cloudExplData/CloudExplArticles';
import {
  useCloudExplNavigation,
  useCloudExplStackParams,
} from '../../cloudExplNav/CloudExplNavigationContext';
import {cloudExplColors} from '../../cloudExplThm/CloudExplTheme';

export function CloudExplArticleDetailScreen() {
  const {goBack} = useCloudExplNavigation();
  const {markAsRead, isRead} = useCloudExplArticles();
  const {toggleFavorite, isFavorite} = useCloudExplFavorites();
  const {articleId} = useCloudExplStackParams('ArticleDetail');
  const article = cloudExplArticles.find(
    item => item.articleId === articleId,
  );

  const favorite = article ? isFavorite(article.articleId) : false;
  const read = article ? isRead(article.articleId) : false;

  const paragraphs = useMemo(() => {
    if (!article) {
      return [];
    }
    return article.longDescription
      .split('\n\n')
      .map(p => p.trim())
      .filter(Boolean);
  }, [article]);

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
        <View style={styles.cloudExplHeaderRow}>
          <Pressable
            hitSlop={10}
            onPress={() => goBack()}
            style={styles.cloudExplHeaderBtn}>
            <Text style={styles.cloudExplHeaderIcon}>←</Text>
          </Pressable>

          <View style={styles.cloudExplHeaderActions}>
            <Pressable
              hitSlop={10}
              onPress={async () => {
                if (!article) {
                  return;
                }
                await Share.share({
                  message: `${article.title}\n\n${article.shortDescription}`,
                });
              }}
              style={styles.cloudExplHeaderBtn}>
              <Text style={styles.cloudExplHeaderIcon}>⤴︎</Text>
            </Pressable>
            <Pressable
              hitSlop={10}
              onPress={() => {
                if (!article) {
                  return;
                }
                toggleFavorite(article.articleId);
              }}
              style={styles.cloudExplHeaderBtn}>
              <Text
                style={[
                  styles.cloudExplHeaderIcon,
                  favorite && styles.cloudExplHeartActive,
                ]}>
                {favorite ? '♥' : '♡'}
              </Text>
            </Pressable>
          </View>
        </View>

        {article ? (
          <View style={styles.cloudExplBodyWrap}>
            <View style={styles.cloudExplHeroWrap}>
              <Image
                source={article.image}
                style={styles.cloudExplHeroImage}
                resizeMode="cover"
              />
            </View>

            <Text style={styles.cloudExplTitle}>{article.title}</Text>

            {paragraphs.map((p, idx) => (
              <Text
                key={`${article.articleId}_p_${idx}`}
                style={styles.cloudExplParagraph}>
                {p}
              </Text>
            ))}

            <Pressable
              onPress={() => {
                markAsRead(article.articleId);
              }}
              style={({pressed}) => [
                styles.cloudExplMarkBtn,
                pressed && styles.cloudExplMarkBtnPressed,
              ]}>
              <Text style={styles.cloudExplMarkBtnText}>
                {read ? 'Marked As Read' : 'Mark As Read'}
              </Text>
            </Pressable>
          </View>
        ) : (
          <Text style={styles.cloudExplParagraph}>Article not found.</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cloudExplRoot: {
    flex: 1,
  },
  cloudExplScrollContent: {
    paddingTop: 66,
    paddingBottom: 40,
  },
  cloudExplHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  cloudExplHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  cloudExplHeaderBtn: {
    padding: 6,
  },
  cloudExplHeaderIcon: {
    color: 'rgba(234, 244, 255, 0.62)',
    fontSize: 18,
    fontWeight: '700',
  },
  cloudExplHeartActive: {
    color: '#FF6666',
  },
  cloudExplBodyWrap: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  cloudExplHeroWrap: {
    backgroundColor: '#5C8EC8',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 14,
  },
  cloudExplHeroImage: {
    width: '100%',
    height: '100%',
  },
  cloudExplTitle: {
    color: '#EAF4FF',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
    marginBottom: 10,
  },
  cloudExplParagraph: {
    color: 'rgba(234, 244, 255, 0.62)',
    fontSize: 14,
    lineHeight: 23.8,
    marginBottom: 12,
  },
  cloudExplMarkBtn: {
    backgroundColor: '#A8D8FF',
    height: 47,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  cloudExplMarkBtnPressed: {
    opacity: 0.88,
  },
  cloudExplMarkBtnText: {
    color: '#1A4A7A',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22.5,
  },
});
