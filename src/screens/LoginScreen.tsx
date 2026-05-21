import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '@/context/AuthContext';
import { colors, radius, spacing } from '@/theme';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const canSubmit = email.includes('@') && password.length >= 4;

  const onSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      await signIn(email.trim());
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to keep ordering your favourites.</Text>
        </View>

        <View style={styles.form}>
          <Field
            icon="mail-outline"
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Field
            icon="lock-closed-outline"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable
            disabled={!canSubmit || loading}
            onPress={onSubmit}
            style={({ pressed }) => [
              styles.cta,
              (!canSubmit || loading) && styles.ctaDisabled,
              pressed && canSubmit && styles.ctaPressed,
            ]}
          >
            <Text style={styles.ctaText}>{loading ? 'Signing in…' : 'Sign In'}</Text>
          </Pressable>

          <Text style={styles.hint}>
            Use any email and a password (4+ chars) to mock sign in.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({
  icon,
  ...rest
}: React.ComponentProps<typeof TextInput> & {
  icon: React.ComponentProps<typeof Ionicons>['name'];
}) {
  return (
    <View style={styles.field}>
      <Ionicons name={icon} size={18} color={colors.muted} />
      <TextInput
        placeholderTextColor={colors.muted}
        style={styles.input}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing.xl },
  title: { fontSize: 28, fontWeight: '800', color: colors.text },
  subtitle: { marginTop: spacing.sm, color: colors.muted, fontSize: 15 },
  form: { padding: spacing.xl, gap: spacing.md },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  input: { flex: 1, paddingVertical: 14, color: colors.text, fontSize: 15 },
  cta: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  ctaPressed: { backgroundColor: colors.primaryDark },
  ctaDisabled: { backgroundColor: '#F2C2AE' },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  hint: {
    color: colors.muted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
