import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeStack from '@/navigation/HomeStack';
import ProfileDrawer from '@/navigation/ProfileDrawer';
import SearchScreen from '@/screens/SearchScreen';
import OrdersScreen from '@/screens/OrdersScreen';
import { useCart } from '@/context/CartContext';
import { colors } from '@/theme';
import type { TabParamList } from '@/types';

const Tab = createBottomTabNavigator<TabParamList>();

const HIDE_TAB_ON: Record<string, true> = {
  RestaurantDetail: true,
  Cart: true,
};

const baseTabBarStyle = {
  borderTopColor: colors.border,
  height: 64,
  paddingTop: 6,
  paddingBottom: 10,
};

export default function MainTabs() {
  const { count } = useCart();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: baseTabBarStyle,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerStyle: { backgroundColor: colors.bg },
        headerTitleStyle: { fontWeight: '700', color: colors.text },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={({ route }) => {
          const child = getFocusedRouteNameFromRoute(route) ?? 'Home';
          return {
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            tabBarStyle: HIDE_TAB_ON[child]
              ? { display: 'none' }
              : baseTabBarStyle,
          };
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: 'Your orders',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" color={color} size={size} />
          ),
          tabBarBadge: count > 0 ? count : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.primary,
            color: '#fff',
            fontSize: 10,
          },
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileDrawer}
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
