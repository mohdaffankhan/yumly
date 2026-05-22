import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing } from '@/theme';

export default function SettingsScreen() {
  const [push, setPush] = useState(true);
  const [promos, setPromos] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Row label="Push notifications" value={push} onChange={setPush} />
        <Row label="Promotional emails" value={promos} onChange={setPromos} />
        <Row label="Dark mode" value={dark} onChange={setDark} />

        <Text style={styles.note}>
          Toggles are stored locally and reset on reload — this is a UI demo.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ true: colors.primary, false: '#D1D5DB' }}
        thumbColor="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  label: { color: colors.text, fontSize: 15, fontWeight: '600' },
  note: {
    marginTop: spacing.lg,
    color: colors.muted,
    fontSize: 12,
    textAlign: 'center',
  },
});
