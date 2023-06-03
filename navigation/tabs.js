import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Home from "../src/screens/Home";
import More from "../src/screens/More";
import Active from "../src/screens/Active";
import Calm from "../src/screens/Calm";
import Track from "../src/screens/Track";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      justifyContent: "center",
      alignContent: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#0A7BF8",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 25,
          right: 25,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 80,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Active"
        component={Active}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#0A7BF8" : "#555",
                }}
              />
              <Text
                style={{
                  color: focused ? "#0A7BF8" : "#555",
                  fontSize: 12,
                }}
              >Active
              </Text>
            </View>
          ),
        }}
      />
        <Tab.Screen
            name="Calm"
            component={Calm}
            options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            top: 15,
                        }}
                    >
                        <Image
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? "#0A7BF8" : "#555",
                            }}
                        />
                        <Text
                            style={{
                                color: focused ? "#0A7BF8" : "#555",
                                fontSize: 12,
                            }}
                        >
                            Calm
                        </Text>
                    </View>
                ),
            }}
        />
        <Tab.Screen
            name="Home"
            component={Home}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        resizeMode="contain"
                        style={{
                            width: 40,
                            height: 40,
                            tintColor: focused ? "#fff" : "#fff",
                        }}
                    />
                ),
                tabBarButton: (props) => <CustomTabBarButton {...props} />,
            }}
        />

        <Tab.Screen
            name="Track"
            component={Track}
            options={{
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            top: 15,
                        }}
                    >
                        <Image
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? "#0A7BF8" : "#555",
                            }}
                        />
                        <Text
                            style={{
                                color: focused ? "#0A7BF8" : "#555",
                                fontSize: 12,
                            }}
                        >
                            Track
                        </Text>
                    </View>
                ),
            }}
        />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 15,
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#0A7BF8" : "#555",
                }}
              />
              <Text
                style={{
                  color: focused ? "#0A7BF8" : "#555",
                  fontSize: 12,
                }}
              >
                  More
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#b0b0b0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
