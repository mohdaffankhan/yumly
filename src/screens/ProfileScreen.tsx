import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { useAuth } from '@/context/AuthContext';
import { colors, radius, spacing } from '@/theme';

const stats = [
  { label: 'Orders', value: '12' },
  { label: 'Saved', value: '6' },
  { label: 'Rewards', value: '320' },
];

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

  const confirmSignOut = () => {
    Alert.alert('Log out?', 'You will need to sign in again.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: signOut },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.topRow}>
          <Text style={styles.heading}>Profile</Text>
          <Pressable
            onPress={openDrawer}
            style={styles.menuBtn}
            accessibilityLabel="Open menu"
          >
            <Ionicons name="menu" size={22} color={colors.text} />
          </Pressable>
        </View>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(user?.name ?? 'F').charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>{user?.name ?? 'Friend'}</Text>
          <Text style={styles.email}>{user?.email}</Text>

          <View style={styles.statsRow}>
            {stats.map((s) => (
              <View key={s.label} style={styles.stat}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.section}>Account</Text>
        <Pressable style={styles.row} onPress={openDrawer}>
          <Ionicons name="receipt-outline" size={18} color={colors.text} />
          <Text style={styles.rowLabel}>Open side menu</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.muted} />
        </Pressable>

        <Pressable style={styles.row} onPress={confirmSignOut}>
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={[styles.rowLabel, { color: colors.danger }]}>Log out</Text>
          <View />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.lg },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: { fontSize: 24, fontWeight: '800', color: colors.text },
  menuBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: '800' },
  name: { marginTop: spacing.md, fontSize: 20, fontWeight: '700', color: colors.text },
  email: { color: colors.muted, fontSize: 13, marginTop: 2 },
  statsRow: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  stat: {
    flex: 1,
    paddingVertical: spacing.md,
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  statValue: { fontSize: 18, fontWeight: '800', color: colors.text },
  statLabel: { color: colors.muted, fontSize: 12, marginTop: 2 },
  section: {
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: { flex: 1, color: colors.text, fontSize: 15 },
});
