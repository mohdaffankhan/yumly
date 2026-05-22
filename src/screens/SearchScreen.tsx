import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { restaurants } from '@/data/restaurants';
import { colors, radius, spacing } from '@/theme';
import type { TabParamList } from '@/types';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return restaurants;
    return restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.tagline.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.header}>
        <View style={styles.input}>
          <Ionicons name="search" size={18} color={colors.muted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Find pizza, sushi, burgers…"
            placeholderTextColor={colors.muted}
            style={styles.field}
            autoCorrect={false}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color={colors.muted} />
            </Pressable>
          )}
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(r) => r.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No matches. Try a different word.</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            onPress={() =>
              navigation.navigate('HomeTab', {
                screen: 'RestaurantDetail',
                params: { id: item.id, name: item.name, price: item.price },
              })
            }
          >
            <View style={[styles.thumb, { backgroundColor: item.color }]}>
              <Text style={styles.thumbEmoji}>{item.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowName}>{item.name}</Text>
              <Text style={styles.rowMeta}>{item.cuisine}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { padding: spacing.lg, paddingBottom: spacing.sm },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
  },
  field: { flex: 1, paddingVertical: 14, color: colors.text },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowPressed: { opacity: 0.7 },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbEmoji: { fontSize: 24 },
  rowName: { fontWeight: '700', color: colors.text },
  rowMeta: { color: colors.muted, fontSize: 13, marginTop: 2 },
  empty: { textAlign: 'center', color: colors.muted, marginTop: spacing.xl },
});
