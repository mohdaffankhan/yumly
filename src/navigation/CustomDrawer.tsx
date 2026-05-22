import {
  DrawerContentScrollView,
  DrawerItemList,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '@/context/AuthContext';
import { colors, radius, spacing } from '@/theme';

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const { user, signOut } = useAuth();
  const insets = useSafeAreaInsets();

  const confirmLogout = () => {
    Alert.alert('Log out?', 'You will need to sign in again.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: signOut },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(user?.name ?? 'F').charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name ?? 'Friend'}</Text>
        <Text style={styles.email}>{user?.email ?? 'not signed in'}</Text>
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: spacing.sm }}
        style={{ flex: 1 }}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Pressable
        onPress={confirmLogout}
        style={[styles.logout, { marginBottom: insets.bottom + spacing.md }]}
      >
        <Ionicons name="log-out-outline" size={18} color={colors.danger} />
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    backgroundColor: colors.primary,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.primary, fontSize: 26, fontWeight: '800' },
  name: { marginTop: spacing.md, color: '#fff', fontSize: 18, fontWeight: '700' },
  email: { color: '#FFE6D8', fontSize: 13, marginTop: 2 },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: '#FDECEC',
  },
  logoutText: { color: colors.danger, fontWeight: '700' },
});
