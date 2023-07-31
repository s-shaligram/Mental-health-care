import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const ViewGoalsButton = () => {
  const [goals, setGoals] = useState([]);
  const [goalText, setGoalText] = useState("");
  const [goalInfo, setGoalInfo] = useState([]);
  const [isListVisible, setListVisible] = useState(false);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  const { theme } = useGlobalContext();
  useEffect(() => {
    retrieveGoals();
  }, []);



  const retrieveGoals = async () => {
    try {
      const goalsData = await AsyncStorage.getItem("userGoals");
      if (goalsData !== null) {
        const parsedData = JSON.parse(goalsData);
        const goalsArray = parsedData.goals.checkedItems;
        const goalTextValue = parsedData.goals.goals;
        setGoals(goalsArray);
        setGoalText(goalTextValue);
      } else {
        setGoals([]);
        setGoalText("");
      }
    } catch (error) {
      console.error("Error retrieving goals:", error);
    }
  };

    return (
        <View>
        <View style={[styles.container2, {backgroundColor: theme.background}]}>
            {goals.length > 0 ? (
                <TouchableOpacity>
                    <View
                        style={{
                            ...styles.container,
                            backgroundColor: theme.background,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                marginTop: 10,
                                fontWeight: "bold",
                                color: theme.color,
                            }}
                        >
                            Today's Goals:
                        </Text>
                    </View>

                    <View style={styles.container1}>
                        {goalText && <Text>{goalText}</Text>}
                        {goals.map((goal, index) => (
                            <Text key={index} style={{fontSize: 18, fontWeight: "bold"}}>
                                {index + 1}. {goal}
                            </Text>
                        ))}
                    </View>
                </TouchableOpacity>
            ) : (
                <>
                    <Text style={{fontSize: 18, marginTop: 20, textAlign: 'center'}}>
                        Oops!!
                    </Text>
                    <Text style={{fontSize: 18, marginTop: 5, textAlign: 'center', margin: 20}}>
                        It looks either you haven't set any goals or deleted them.
                    </Text>
                </>
            )}

            <View style={{margin: 20, marginBottom: 0}}>
                <View style={{marginBottom: 10}}>
                    <Button
                        color={"#ff3d11"}
                        title="Delete Goals" onPress={deleteGoals}/>
                </View>
                <View style={{}}>
                    <Button
                        color={"#FFA500"}
                        title="Goal Breakdown"
                        onPress={handleViewGoals}
                    />
                </View>
            </View>

            <View style={styles.container2}>
                <ScrollView style={{...styles.scrollView}}>
                    {isListVisible && (
                        <View style={{marginBottom: 10}}>
                            {goalInfo.map((goal, index) => (
                                <View key={index}>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 18,
                                            color: theme.color,
                                        }}
                                    >
                                        {goal.title}
                                    </Text>
                                    <Text
                                        style={{fontSize: 16, marginTop: 10, color: theme.color}}
                                    >
                                        {goal.description}
                                    </Text>
                                    <View
                                        style={{
                                            borderBottomWidth: 1,
                                            marginVertical: 10,
                                        }}
                                    />
                                </View>
                            ))}
                        </View>
                    )}
                </ScrollView>
            </View>

        </View>

      <View style={styles.container2}>
        <ScrollView style={{ ...styles.scrollView }}>
          {isListVisible && (
            <View>
              {goalInfo.map((goal, index) => (
                <View key={index}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      color: theme.color,
                    }}
                  >
                    {goal.title}
                  </Text>
                  <Text
                    style={{ fontSize: 16, marginTop: 10, color: theme.color }}
                  >
                    {goal.description}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      marginVertical: 10,
                    }}
                  />
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#fff",
        // borderRadius: 5,
        paddingLeft: 25,
        flexDirection: "column",
        alignItems: "center",
        marginTop: 5,
        // marginBottom: 5,
        marginStart: 10,
        height: 60,
        marginEnd: 10,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.22,
        // shadowRadius: 2.22,
        // elevation: 3,
    },
    container2: {
        flex: 1, // Make the container fill the entire screen
    },
    // container1: {
    //   backgroundColor: "#fff",
    //   borderRadius: 5,
    //   paddingLeft: 25,
    //   flexDirection: "column",
    //   alignItems: "center",
    //   marginTop: 10,
    //   marginBottom: 5,
    //   marginStart: 10,
    //   height: 160,
    //   marginEnd: 10,
    //   shadowColor: "#000",
    //   shadowOffset: {
    //     width: 0,
    //     height: 1,
    //   },
    //   shadowOpacity: 0.22,
    //   shadowRadius: 2.22,
    //   elevation: 3,
    // },
    container1: {
        backgroundColor: "#fff",
        borderRadius: 10,
        // paddingHorizontal: 25,
        // paddingVertical: 5,
        padding: 5,
        flexDirection: "column",
        alignItems: "center",
        // marginTop: 10,
        marginBottom: 0,
        marginHorizontal: 20,
        // minHeight: 60,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        elevation: 5,
    },
    scrollView: {
        // backgroundColor: "red",
        // marginTop: 0,
        // marginBottom: 0,
        margin: 15,
        // maxHeight: 540, // Adjust the maximum height as needed
        padding: 8,
        // minHeight: 110,

    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollView: {
    // backgroundColor: "red",
    marginTop: 0,
    marginBottom: 0,
    maxHeight: 540, // Adjust the maximum height as needed
    padding: 8,
    minHeight: 110,
  },
});
export default ViewGoalsButton;
