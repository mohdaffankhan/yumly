import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@/screens/HomeScreen';
import RestaurantDetailScreen from '@/screens/RestaurantDetailScreen';
import CartScreen from '@/screens/CartScreen';
import { colors } from '@/theme';
import type { HomeStackParamList } from '@/types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTitleStyle: { fontWeight: '700', color: '#fff' },
        headerTintColor: '#fff',
        headerBackTitle: 'Back',
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.bg },
        animation: 'slide_from_right',
        statusBarStyle: 'light',
        statusBarBackgroundColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          statusBarStyle: 'dark',
          statusBarBackgroundColor: colors.bg,
        }}
      />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={{ title: 'Restaurant' }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Your Cart' }}
      />
    </Stack.Navigator>
  );
}
