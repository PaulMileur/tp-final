import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, StatusBar as S } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; //liaison entre les liens et => le Router
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; //type de navigation
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Accueil from "./screens/Accueil";
import Formulaire from "./screens/Formulaire";
import Gestion from "./screens/Gestion";

const Tab = createBottomTabNavigator(); //permet de créer le router

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "#aaa",
            tabBarActiveBackgroundColor: "teal",
            tabBarInactiveBackgroundColor: "#eee",
            unmountOnBlur: true,
          }}
        >
          <Tab.Screen
            name={"accueil"}
            component={Accueil}
            options={{
              headerShown: false,
              tabBarLabel: "Accueil",
              tabBarIcon: function ({ color, size }) {
                return (
                  <MaterialCommunityIcons
                    name={"home"}
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name={"formulaire"}
            component={Formulaire}
            options={{
              headerShown: false,
              tabBarLabel: "Formulaire",
              tabBarIcon: function ({ color, size }) {
                return (
                  <MaterialCommunityIcons
                    name={"plus-circle-outline"}
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name={"gestion"}
            component={Gestion}
            options={{
              headerShown: false,
              tabBarLabel: "Gestion",
              tabBarIcon: function ({ color, size }) {
                return (
                  <MaterialCommunityIcons
                    name={"autorenew"}
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: S.currentHeight,
  },
});
