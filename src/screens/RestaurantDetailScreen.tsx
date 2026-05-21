import { useLayoutEffect } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useCart } from '@/context/CartContext';
import { findRestaurant } from '@/data/restaurants';
import { colors, radius, spacing } from '@/theme';
import type { HomeStackParamList } from '@/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'RestaurantDetail'>;

const menu = [
  { id: 'm1', name: 'Signature special', desc: 'Chef‘s pick of the day', price: 14 },
  { id: 'm2', name: 'House classic', desc: 'A loved staple', price: 11 },
  { id: 'm3', name: 'Seasonal plate', desc: 'Fresh, in season', price: 13 },
  { id: 'm4', name: 'Sweet finish', desc: 'Dessert to round it off', price: 7 },
];

export default function RestaurantDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const restaurant = findRestaurant(id);
  const name = route.params.name ?? restaurant?.name ?? 'Restaurant';
  const price = route.params.price ?? restaurant?.price ?? 0;
  const { add, count } = useCart();

  useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation, name]);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View
          style={[
            styles.hero,
            { backgroundColor: restaurant?.color ?? '#FFE4D2' },
          ]}
        >
          <Text style={styles.heroEmoji}>{restaurant?.emoji ?? '🍽️'}</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.tagline}>
            {restaurant?.tagline ?? 'Delicious things made fresh.'}
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.metaPill}>
              <Ionicons name="star" size={14} color={colors.accent} />
              <Text style={styles.metaPillText}>{restaurant?.rating ?? 4.5}</Text>
            </View>
            <View style={styles.metaPill}>
              <Ionicons name="time-outline" size={14} color={colors.muted} />
              <Text style={styles.metaPillText}>{restaurant?.eta ?? '20-30 min'}</Text>
            </View>
            <View style={styles.metaPill}>
              <Ionicons name="pricetag-outline" size={14} color={colors.muted} />
              <Text style={styles.metaPillText}>from ${price}</Text>
            </View>
          </View>

          <Text style={styles.section}>Menu</Text>

          {menu.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuDesc}>{item.desc}</Text>
                <Text style={styles.menuPrice}>${item.price}</Text>
              </View>
              <Pressable
                onPress={() =>
                  add({
                    id: `${id}-${item.id}`,
                    name: `${item.name} · ${name}`,
                    price: item.price,
                  })
                }
                style={({ pressed }) => [
                  styles.addBtn,
                  pressed && styles.addBtnPressed,
                ]}
                accessibilityLabel={`Add ${item.name} to cart`}
              >
                <Ionicons name="add" size={20} color="#fff" />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          onPress={() => navigation.navigate('Cart')}
          style={({ pressed }) => [
            styles.viewCart,
            pressed && styles.viewCartPressed,
          ]}
        >
          <Text style={styles.viewCartText}>
            {count > 0 ? `View cart · ${count} item${count > 1 ? 's' : ''}` : 'View cart'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: 120 },
  hero: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: { fontSize: 100 },
  body: { padding: spacing.xl },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  tagline: { marginTop: 6, color: colors.muted, fontSize: 14 },
  metaRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  metaPillText: { fontSize: 12, color: colors.text, fontWeight: '600' },
  section: {
    marginTop: spacing.xl,
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  menuName: { fontSize: 15, fontWeight: '700', color: colors.text },
  menuDesc: { marginTop: 2, color: colors.muted, fontSize: 13 },
  menuPrice: { marginTop: 6, fontWeight: '700', color: colors.text },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnPressed: { backgroundColor: colors.primaryDark, transform: [{ scale: 0.95 }] },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  viewCart: {
    backgroundColor: colors.text,
    paddingVertical: 16,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  viewCartPressed: { opacity: 0.85 },
  viewCartText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
