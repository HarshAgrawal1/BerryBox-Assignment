import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import QuoteListScreen from "./src/screens/QuotesListScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import { NavigationContainer } from "@react-navigation/native";

// Define the Tab enum for better type safety
enum TabNames {
  Home = "Home",
  Quotes = "Quotes",
  Favorites = "Favorites",
}

// Define the icon names as literal types to satisfy TypeScript's type checking
const iconNames = {
  [TabNames.Home]: {
    active: "home" as const,
    inactive: "home-outline" as const,
  },
  [TabNames.Quotes]: {
    active: "book" as const,
    inactive: "book-outline" as const,
  },
  [TabNames.Favorites]: {
    active: "heart" as const,
    inactive: "heart-outline" as const,
  },
} as const;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => {
          // Ensure route.name is typed as TabNames
          const iconName =
            route.name === TabNames.Home
              ? iconNames[TabNames.Home].active
              : route.name === TabNames.Quotes
              ? iconNames[TabNames.Quotes].active
              : route.name === TabNames.Favorites
              ? iconNames[TabNames.Favorites].active
              : "home"; // fallback

          return {
            tabBarIcon: ({ focused, color, size }) => {
              // Ensure safe access of iconNames
              const currentIcon =
                iconNames[route.name as TabNames] || { inactive: "home-outline" };

              return (
                <Ionicons
                  name={focused ? currentIcon.active : currentIcon.inactive}
                  size={size}
                  color={color}
                />
              );
            },
            tabBarActiveTintColor: "#2f95dc",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          };
        }}
      >
        <Tab.Screen name={TabNames.Home} component={HomeScreen} />
        <Tab.Screen name={TabNames.Quotes} component={QuoteListScreen} />
        <Tab.Screen name={TabNames.Favorites} component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
