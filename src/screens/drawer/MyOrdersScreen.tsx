import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing } from '@/theme';

const orders = [
  { id: 'o1', name: 'Pasta Bella', date: 'Yesterday · 7:42 PM', total: 24.5 },
  { id: 'o2', name: 'Burger Republic', date: 'Mon · 12:10 PM', total: 18.0 },
  { id: 'o3', name: 'Sakura Sushi', date: 'Last week', total: 42.0 },
  { id: 'o4', name: 'Pizza Forno', date: '2 weeks ago', total: 28.4 },
];

export default function MyOrdersScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={styles.sub}>Everything you've ordered, all in one place.</Text>
        {orders.map((o) => (
          <View key={o.id} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{o.name}</Text>
              <Text style={styles.meta}>{o.date}</Text>
            </View>
            <Text style={styles.total}>${o.total.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  sub: { color: colors.muted, marginBottom: spacing.lg },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  name: { fontWeight: '700', color: colors.text },
  meta: { color: colors.muted, fontSize: 13, marginTop: 2 },
  total: { fontWeight: '700', color: colors.text },
});
