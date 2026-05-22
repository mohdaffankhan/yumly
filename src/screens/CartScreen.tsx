import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useCart } from '@/context/CartContext';
import { colors, radius, spacing } from '@/theme';
import type { HomeStackParamList } from '@/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'Cart'>;

export default function CartScreen({ navigation }: Props) {
  const { items, total, count, add, remove, clear } = useCart();

  const checkout = () => {
    Alert.alert('Order placed', 'Your food is on the way 🛵', [
      {
        text: 'Track Orders',
        onPress: () => {
          clear();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        },
      },
    ]);
  };

  if (count === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🍽️</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>
            Find something tasty and add it to start an order.
          </Text>
          <Pressable
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
            }
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          >
            <Text style={styles.ctaText}>Browse restaurants</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        contentContainerStyle={styles.list}
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.rowPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.qty}>
              <Pressable onPress={() => remove(item.id)} style={styles.qtyBtn}>
                <Ionicons name="remove" size={16} color={colors.text} />
              </Pressable>
              <Text style={styles.qtyText}>{item.qty}</Text>
              <Pressable
                onPress={() => add({ id: item.id, name: item.name, price: item.price })}
                style={styles.qtyBtn}
              >
                <Ionicons name="add" size={16} color={colors.text} />
              </Pressable>
            </View>
          </View>
        )}
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={styles.summaryValue}>$2.50</Text>
        </View>
        <View style={[styles.summaryRow, { marginTop: spacing.sm }]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${(total + 2.5).toFixed(2)}</Text>
        </View>

        <Pressable
          onPress={checkout}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        >
          <Text style={styles.ctaText}>Checkout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  list: { padding: spacing.lg, gap: spacing.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  rowName: { fontWeight: '700', color: colors.text, fontSize: 14 },
  rowPrice: { marginTop: 2, color: colors.muted, fontSize: 13 },
  qty: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  qtyText: { minWidth: 18, textAlign: 'center', fontWeight: '700' },
  summary: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryLabel: { color: colors.muted, fontSize: 14 },
  summaryValue: { color: colors.text, fontSize: 14, fontWeight: '600' },
  totalLabel: { color: colors.text, fontSize: 16, fontWeight: '700' },
  totalValue: { color: colors.text, fontSize: 16, fontWeight: '800' },
  cta: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  ctaPressed: { backgroundColor: colors.primaryDark },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyEmoji: { fontSize: 72, marginBottom: spacing.lg },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  emptySub: {
    marginTop: spacing.sm,
    color: colors.muted,
    textAlign: 'center',
  },
});
