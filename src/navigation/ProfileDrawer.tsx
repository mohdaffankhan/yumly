import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import ProfileScreen from '@/screens/ProfileScreen';
import MyOrdersScreen from '@/screens/drawer/MyOrdersScreen';
import SettingsScreen from '@/screens/drawer/SettingsScreen';
import HelpScreen from '@/screens/drawer/HelpScreen';
import CustomDrawer from '@/navigation/CustomDrawer';
import { colors } from '@/theme';
import type { DrawerParamList } from '@/types';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function ProfileDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTitleStyle: { fontWeight: '700' },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
        drawerActiveBackgroundColor: '#FFF1E8',
        drawerLabelStyle: { fontWeight: '600', fontSize: 14 },
        drawerItemStyle: { borderRadius: 12, paddingHorizontal: 4 },
      }}
    >
      <Drawer.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          drawerLabel: 'Profile',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="MyOrders"
        component={MyOrdersScreen}
        options={{
          title: 'My Orders',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          title: 'Help',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
