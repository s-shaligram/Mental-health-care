import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "../src/screens/Home";
import More from "../src/screens/More";
import Active from "../src/screens/Active";
import Mind2Header from "../src/components/Mind2Header";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator initialRouteName="Home"
                       screenOptions={{
                           tabBarShowLabel: false,
                           tabBarStyle: {
                               position: "absolute",
                               backgroundColor: "#ffffff",
                               height: 60,
                           },
                       }}
        >
            <Tab.Screen
                name="Active"
                component={Active}
                options={{
                    headerTitle: () => (<Mind2Header screenName={"Active"} showLogo={false}/>),
                    headerStyle: {height: 70},
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
            {/*<Tab.Screen*/}
            {/*    name="Calm"*/}
            {/*    component={Calm}*/}
            {/*    options={{*/}
            {/*        headerTitle: () => (<Mind2Header screenName={"Calm"} showLogo={false}/>),*/}
            {/*        headerStyle: {height: 70},*/}
            {/*        tabBarIcon: ({focused}) => (*/}
            {/*            <View*/}
            {/*                style={{*/}
            {/*                    alignItems: "center",*/}
            {/*                    justifyContent: "center",*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                <Icon*/}
            {/*                    name={focused ? "ios-moon" : "ios-moon-outline"}*/}
            {/*                    size={25}*/}
            {/*                    color={focused ? "#1D741B" : "#555"}*/}
            {/*                />*/}
            {/*                <Text*/}
            {/*                    style={{*/}
            {/*                        color: focused ? "#1D741B" : "#555",*/}
            {/*                        fontSize: 12,*/}
            {/*                    }}*/}
            {/*                >*/}
            {/*                    Calm*/}
            {/*                </Text>*/}
            {/*            </View>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerTitle: () => (<Mind2Header screenName={"Mind 2.0"}/>),
                    headerStyle: {height: 70},
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

            {/*<Tab.Screen*/}
            {/*    name="Track"*/}
            {/*    component={Track}*/}
            {/*    options={{*/}
            {/*        headerTitle: () => (<Mind2Header screenName={"Track"} showLogo={false}/>),*/}
            {/*        headerStyle: {height: 70},*/}
            {/*        tabBarIcon: ({focused}) => (*/}
            {/*            <View*/}
            {/*                style={{*/}
            {/*                    alignItems: "center",*/}
            {/*                    justifyContent: "center",*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                <Icon*/}
            {/*                    name={focused ? "ios-compass" : "ios-compass-outline"}*/}
            {/*                    size={25}*/}
            {/*                    color={focused ? "#1D741B" : "#555"}*/}
            {/*                />*/}

            {/*                <Text*/}
            {/*                    style={{*/}
            {/*                        color: focused ? "#1D741B" : "#555",*/}
            {/*                        fontSize: 12,*/}
            {/*                    }}*/}
            {/*                >*/}
            {/*                    Track*/}
            {/*                </Text>*/}
            {/*            </View>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
            <Tab.Screen
                name="More"
                component={More}
                options={{
                    headerTitle: () => (<Mind2Header screenName={"More"} showLogo={false}/>),
                    headerStyle: {height: 70},
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
  );
};

export default Tabs;

const CustomTabBarButton = ({ children, onPress }) => (
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
        backgroundColor: "#1D741B",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);
