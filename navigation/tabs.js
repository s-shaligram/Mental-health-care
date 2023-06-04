import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Text, View, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Home from "../src/screens/Home";
import More from "../src/screens/More";
import Active from "../src/screens/Active";
import Calm from "../src/screens/Calm";
import Track from "../src/screens/Track";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator initialRouteName="Home"
                       screenOptions={{
                           tabBarShowLabel: false,
                           tabBarStyle: {
                               position: "absolute",
                               // bottom: 10,
                               // left: 25,
                               // right: 25,
                               // elevation: 0,
                               backgroundColor: "#ffffff",
                               // borderRadius: 15,
                               height: 60,
                           },
                       }}
        >
            <Tab.Screen
                name="Active"
                component={Active}
                options={{
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
                                color={focused ? "#0A7BF8" : "#555"}
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
                                color={focused ? "#0A7BF8" : "#555"}
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
                    tabBarIcon: ({focused}) => (
                        <Icon
                            name={focused ? "ios-home" : "ios-home-outline"}
                            size={35}
                            color={focused ? "#ffff" : "#555"}
                        />
                    ),
                    tabBarButton: (props) => <CustomTabBarButton {...props} />,
                }}
            />

            <Tab.Screen
                name="Track"
                component={Track}
                options={{
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
                                color={focused ? "#0A7BF8" : "#555"}
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
                                color={focused ? "#0A7BF8" : "#555"}
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

export default Tabs;

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            justifyContent: "center",
            alignContent: "center",
            margin: 15
        }}
        onPress={onPress}
    >
        <View
            style={{
                bottom: 6,
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