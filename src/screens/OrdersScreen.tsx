import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useCart } from '@/context/CartContext';
import { colors, radius, spacing } from '@/theme';

const past = [
  { id: 'o1', name: 'Pasta Bella', status: 'Delivered', date: 'Yesterday', total: 24.5 },
  { id: 'o2', name: 'Burger Republic', status: 'Delivered', date: 'Mon', total: 18.0 },
  { id: 'o3', name: 'Sakura Sushi', status: 'Delivered', date: 'Last week', total: 42.0 },
];

export default function OrdersScreen() {
  const { items, total, count } = useCart();

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={styles.section}>In progress</Text>
        {count === 0 ? (
          <Text style={styles.empty}>
            Nothing in progress. Build a cart to get started.
          </Text>
        ) : (
          <View style={styles.active}>
            <View style={styles.activeIcon}>
              <Ionicons name="bicycle" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.activeTitle}>Pending checkout</Text>
              <Text style={styles.activeMeta}>
                {count} item{count > 1 ? 's' : ''} · ${total.toFixed(2)}
              </Text>
              <Text style={styles.activeHint} numberOfLines={1}>
                {items.map((i) => i.name).join(', ')}
              </Text>
            </View>
          </View>
        )}

        <Text style={[styles.section, { marginTop: spacing.xl }]}>Past orders</Text>
        {past.map((o) => (
          <View key={o.id} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowName}>{o.name}</Text>
              <Text style={styles.rowMeta}>
                {o.status} · {o.date}
              </Text>
            </View>
            <Text style={styles.rowTotal}>${o.total.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  section: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  empty: { color: colors.muted, fontSize: 14, marginBottom: spacing.md },
  active: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: '#FFF1E8',
    padding: spacing.md,
    borderRadius: radius.md,
  },
  activeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTitle: { fontWeight: '700', color: colors.text },
  activeMeta: { marginTop: 2, color: colors.text, fontSize: 13 },
  activeHint: { marginTop: 2, color: colors.muted, fontSize: 12 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowName: { fontWeight: '600', color: colors.text },
  rowMeta: { marginTop: 2, color: colors.muted, fontSize: 13 },
  rowTotal: { fontWeight: '700', color: colors.text },
});
