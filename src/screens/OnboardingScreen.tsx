import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors, radius, spacing } from '@/theme';
import type { AuthStackParamList } from '@/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.illustration}>
        <Text style={styles.emoji}>🍔</Text>
        <View style={[styles.badge, styles.badgeOne]}>
          <Text style={styles.badgeEmoji}>🍕</Text>
        </View>
        <View style={[styles.badge, styles.badgeTwo]}>
          <Text style={styles.badgeEmoji}>🌮</Text>
        </View>
        <View style={[styles.badge, styles.badgeThree]}>
          <Text style={styles.badgeEmoji}>🍜</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Cravings delivered{'\n'}in minutes.</Text>
        <Text style={styles.subtitle}>
          Order from your favourite local kitchens and track every step to your door.
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.replace('Login')}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        >
          <Text style={styles.ctaText}>Get Started</Text>
        </Pressable>

        <Text style={styles.foot}>By continuing you agree to our Terms & Privacy.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  illustration: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacing.xl,
    borderRadius: radius.xl,
    backgroundColor: '#FFF1E8',
    position: 'relative',
  },
  emoji: { fontSize: 140 },
  badge: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  badgeOne: { top: 40, left: 30 },
  badgeTwo: { bottom: 60, right: 30 },
  badgeThree: { top: 90, right: 40 },
  badgeEmoji: { fontSize: 30 },
  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xl },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 38,
  },
  subtitle: {
    marginTop: spacing.md,
    fontSize: 15,
    color: colors.muted,
    lineHeight: 22,
  },
  cta: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  ctaPressed: { backgroundColor: colors.primaryDark },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  foot: {
    marginTop: spacing.lg,
    textAlign: 'center',
    fontSize: 12,
    color: colors.muted,
  },
});
