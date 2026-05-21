import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { restaurants, type Restaurant } from '@/data/restaurants';
import { colors, radius, spacing } from '@/theme';
import type { HomeStackParamList } from '@/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

type CategoryKey = 'all' | 'burger' | 'sushi' | 'pizza' | 'salad';

const categories: { key: CategoryKey; label: string; emoji: string }[] = [
  { key: 'all', label: 'All', emoji: '🍽️' },
  { key: 'burger', label: 'Burgers', emoji: '🍔' },
  { key: 'sushi', label: 'Sushi', emoji: '🍣' },
  { key: 'pizza', label: 'Pizza', emoji: '🍕' },
  { key: 'salad', label: 'Healthy', emoji: '🥗' },
];

const matchesCategory = (r: Restaurant, key: CategoryKey) => {
  if (key === 'all') return true;
  const cuisine = r.cuisine.toLowerCase();
  if (key === 'burger') return cuisine.includes('burger');
  if (key === 'sushi') return cuisine.includes('sushi');
  if (key === 'pizza') return cuisine.includes('pizza');
  if (key === 'salad') return cuisine.includes('salad') || cuisine.includes('bowl');
  return true;
};

export default function HomeScreen({ navigation }: Props) {
  const { user } = useAuth();
  const { count } = useCart();
  const [category, setCategory] = useState<CategoryKey>('all');

  const filtered = useMemo(
    () => restaurants.filter((r) => matchesCategory(r, category)),
    [category]
  );

  const openDetail = (r: Restaurant) => {
    navigation.navigate('RestaurantDetail', {
      id: r.id,
      name: r.name,
      price: r.price,
    });
  };

  const openSearch = () => {
    navigation.getParent()?.navigate('Search' as never);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar style="dark" backgroundColor={colors.bg} translucent={false} />
      <FlatList
        data={filtered}
        keyExtractor={(r) => r.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.topRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.greeting}>Hello, {user?.name ?? 'Friend'} 👋</Text>
                <Text style={styles.location}>
                  <Ionicons name="location" size={13} color={colors.primary} /> Delivering to Home
                </Text>
              </View>
              <Pressable
                style={({ pressed }) => [styles.cartBtn, pressed && { opacity: 0.7 }]}
                onPress={() => navigation.navigate('Cart')}
                accessibilityLabel="Open cart"
              >
                <Ionicons name="bag-handle-outline" size={20} color={colors.text} />
                {count > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{count}</Text>
                  </View>
                )}
              </Pressable>
            </View>

            <Pressable
              onPress={openSearch}
              style={({ pressed }) => [styles.search, pressed && { opacity: 0.7 }]}
            >
              <Ionicons name="search" size={18} color={colors.muted} />
              <Text style={styles.searchPh}>Search for restaurants or dishes</Text>
            </Pressable>

            <Text style={styles.section}>Categories</Text>
            <View style={styles.catRow}>
              {categories.map((c) => {
                const active = c.key === category;
                return (
                  <Pressable
                    key={c.key}
                    onPress={() => setCategory(c.key)}
                    style={({ pressed }) => [
                      styles.cat,
                      active && styles.catActive,
                      pressed && { opacity: 0.8 },
                    ]}
                  >
                    <Text style={styles.catEmoji}>{c.emoji}</Text>
                    <Text style={[styles.catLabel, active && styles.catLabelActive]}>
                      {c.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.section}>
              {category === 'all' ? 'Popular near you' : 'Filtered'}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No restaurants in this category.</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => openDetail(item)}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          >
            <View style={[styles.cardImage, { backgroundColor: item.color }]}>
              <Text style={styles.cardEmoji}>{item.emoji}</Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <View style={styles.ratingPill}>
                  <Ionicons name="star" size={12} color={colors.accent} />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
              <Text style={styles.cardTagline}>{item.tagline}</Text>
              <View style={styles.cardMeta}>
                <Text style={styles.metaText}>{item.cuisine}</Text>
                <Text style={styles.metaDot}>·</Text>
                <Text style={styles.metaText}>{item.eta}</Text>
                <Text style={styles.metaDot}>·</Text>
                <Text style={styles.metaText}>from ${item.price}</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: { fontSize: 22, fontWeight: '800', color: colors.text },
  location: { marginTop: 4, color: colors.muted, fontSize: 13 },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  search: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
  },
  searchPh: { color: colors.muted, fontSize: 14 },
  section: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  catRow: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  cat: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    minWidth: 64,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  catActive: {
    backgroundColor: '#FFF1E8',
    borderColor: colors.primary,
  },
  catEmoji: { fontSize: 22 },
  catLabel: { marginTop: 4, fontSize: 12, color: colors.text, fontWeight: '600' },
  catLabelActive: { color: colors.primary },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardPressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  cardImage: {
    width: 92,
    height: 92,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardEmoji: { fontSize: 44 },
  cardBody: { flex: 1, paddingHorizontal: spacing.md, justifyContent: 'center' },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.text, flex: 1 },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FFF6E0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#8A6500' },
  cardTagline: { marginTop: 4, color: colors.muted, fontSize: 13 },
  cardMeta: { marginTop: 6, flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: colors.muted, fontSize: 12 },
  metaDot: { color: colors.muted, fontSize: 12 },
  empty: { textAlign: 'center', color: colors.muted, marginTop: spacing.xl },
});
