import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors, radius, spacing } from '@/theme';

const faqs = [
  {
    q: 'How do I track an order?',
    a: 'Open the Orders tab to see live status and delivery updates.',
  },
  {
    q: 'Can I cancel after placing?',
    a: 'You have a 2-minute window before the restaurant accepts the order.',
  },
  {
    q: 'Where do payments go?',
    a: 'This is a UI demo — no real payments are processed.',
  },
];

export default function HelpScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={styles.title}>How can we help?</Text>
        <Text style={styles.sub}>Common questions, answered quickly.</Text>

        {faqs.map((f) => (
          <View key={f.q} style={styles.card}>
            <View style={styles.qRow}>
              <Ionicons name="help-circle-outline" size={20} color={colors.primary} />
              <Text style={styles.q}>{f.q}</Text>
            </View>
            <Text style={styles.a}>{f.a}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  sub: { color: colors.muted, marginTop: 4, marginBottom: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  qRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  q: { fontWeight: '700', color: colors.text, fontSize: 15, flex: 1 },
  a: { marginTop: 6, color: colors.muted, lineHeight: 20 },
});
