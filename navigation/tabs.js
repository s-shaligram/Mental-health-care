import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "../src/screens/Home";
import More from "../src/screens/More";
import Active from "../src/screens/Active";
import Mind2Header from "../src/components/Mind2Header";
import Track from "../src/screens/Track";
import Calm from "../src/screens/Calm";
import { useContext,useState } from "react";
//import themeContext from "../../../styles/themeContext";
import themeContext from "../styles/themeContext";
const Tab = createBottomTabNavigator();

const Tabs = () => {
    const [theme, setTheme] = useState("light"); // Initial theme state (e.g., "light" or "dark")
    //const theme = useContext(themeContext);
    return (
       // <themeContext.Provider value={theme}>
        <Tab.Navigator initialRouteName="Home"
                       screenOptions={{
                           tabBarShowLabel: false,
                           tabBarStyle: {
                               //position: "absolute",
                               //backgroundColor:theme?.background,
                               //backgroundColor: theme?.background,
                               height: 60,
                               backgroundColor: "#999999"
                           },
                           
                       }}
        >
            <Tab.Screen
                name="Active"
                component={Active}
                options={{
                    headerTitle: () => (<Mind2Header screenName={"Active"} showLogo={false} backgroundColor={"#999999"}/>),
                    headerStyle: {height: 90,backgroundColor: "#999999"},
                    // headerTintColor: "#999999",
                    // headerPressColor: "#999999",
                   tabBarIcon: ({focused}) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Icon
                                name={focused ? "ios-flame" : "ios-flame-outline"}
                                size={25}
                                color={focused ? "#1D741B" : "#555"}
                            />
                            <Text
                                style={{
                                    color: focused ? "#1D741B" : "#555",
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
                    headerTitle: () => (<Mind2Header screenName={"Calm"} showLogo={false}/>),
                    headerStyle: {height: 90,backgroundColor: "#999999"},
                    tabBarIcon: ({focused}) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Icon
                                name={focused ? "ios-moon" : "ios-moon-outline"}
                                size={25}
                                color={focused ? "#1D741B" : "#555"}
                            />
                            <Text
                                style={{
                                    color: focused ? "#1D741B" : "#555",
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
                    headerTitle: () => (<Mind2Header screenName={"Mind 2.0"}/>),
                    headerStyle: {height: 90,backgroundColor: "#999999"},
                    tabBarIcon: ({focused}) => (
                        <Icon
                            name={focused ? "ios-home" : "ios-home-outline"}
                            size={35}
                            color={focused ? "#ffff" : "#ffff"}
                        />
                    ),
                    tabBarButton: (props) => <CustomTabBarButton {...props} />,
                }}
            />

            <Tab.Screen
                name="Track"
                component={Track}
                options={{
                    headerTitle: () => (<Mind2Header screenName={"Track"} showLogo={false}/>),
                    headerStyle: {height: 90,backgroundColor: "#999999"},
                    tabBarIcon: ({focused}) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Icon
                                name={focused ? "ios-compass" : "ios-compass-outline"}
                                size={25}
                                color={focused ? "#1D741B" : "#555"}
                            />

                            <Text
                                style={{
                                    color: focused ? "#1D741B" : "#555",
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
                    headerTitle: () => (<Mind2Header screenName={"More"} showLogo={false}/>),
                    headerStyle: {height: 90,backgroundColor: "#999999"},
                    tabBarIcon: ({focused}) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Icon
                                name={focused ? "ios-menu" : "ios-menu-outline"}
                                size={25}
                                color={focused ? "#1D741B" : "#555"}
                            />

              <Text
                style={{
                  color: focused ? "#1D741B" : "#555",
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
    //</themeContext.Provider>
  );
};

export default Tabs;

// const CustomTabBarButton = ({ children, onPress }) => (
//   <TouchableOpacity
//     style={{
//       justifyContent: "center",
//       alignContent: "center",
//       margin: 15,
//     }}
//     onPress={onPress}
//   >
//     <View
//       style={{
//         bottom: 6,
//         width: 70,
//         height: 70,
//         borderRadius: 35,
//         backgroundColor: "#1D741B",
//       }}
//     >
//       {children}
//     </View>
//   </TouchableOpacity>
// );
const CustomTabBarButton = ({ children, onPress }) => {
    const theme = useContext(themeContext);
  
    return (
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignContent: "center",
          margin: 15,
        }}
        onPress={onPress}
      >
        <View
          style={{
            bottom: 6,
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: "#1D741B"
            //backgroundColor: theme?.background, // Use the theme's background color dynamically
          }}
        >
          {children}
        </View>
      </TouchableOpacity>
    );
  };
  
