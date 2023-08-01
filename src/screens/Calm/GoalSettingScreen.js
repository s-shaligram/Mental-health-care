import React, {useState, useContext, useEffect} from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {AntDesign, FontAwesome} from "@expo/vector-icons";
import {connect} from "react-redux";
import {setGoals} from "../././../../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {NotificationContext} from "../../hooks/useNotificationContext";
import CancelDialog from "./CancelDialog"; // Import the new CancelDialog component

const GoalSettingScreen = ({onFinishGoalSetting, setShowGoalSetting}) => {
    const [goals, setGoals] = useState("");
    const [checkedItems, setCheckedItems] = useState([]);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const {scheduleNotification} = useContext(NotificationContext);

    useEffect(() => {
        // Schedule the end-of-day notification at 9:00 PM
        scheduleEndOfDayNotification();
    }, []);

    const scheduleEndOfDayNotification = async () => {
        try {
            const endOfDay = new Date();
            endOfDay.setHours(21, 0, 0, 0); // Set the notification time to 9:00 PM
            const currentTime = new Date();
            if (endOfDay < currentTime) {
                // If endOfDay is before the current time, schedule the notification for tomorrow
                endOfDay.setDate(endOfDay.getDate() + 1);
            }

            const secondsUntilEndOfDay = Math.round(
                (endOfDay.getTime() - currentTime.getTime()) / 1000
            );
            await scheduleNotification(
                "EOG", // Activity key for end-of-day notification
                "Daily Goals",
                "Have you completed your daily scheduled goals?",
                secondsUntilEndOfDay
            );
            console.log("End-of-day notification scheduled.");
        } catch (error) {
            console.error("Error scheduling end-of-day notification:", error);
        }
    };

    const handleFinish = async () => {
        try {
            // Create an object to store the goals and checkedItems
            const data = {
                goals: goals,
                checkedItems: checkedItems,
            };

            //Notification
            await scheduleNotification(
                "GS",
                "Goal Set",
                "Congratulations..you have set today's goals",
                3
            );
            // Save the data to AsyncStorage
            await AsyncStorage.setItem("userGoals", JSON.stringify(data));

            // Call the onFinishGoalSetting callback with the goals
            onFinishGoalSetting(data);
        } catch (error) {
            console.error("Error saving goals and checkedItems to storage:", error);
        }
    };

    const handleClose = () => {
        setShowCancelModal(true);
    };

    const handleCancelOption = (option) => {
        setSelectedOption(option);
        setShowCancelModal(false);
        if (option === "continue") {
            setShowGoalSetting(true);
        } else if (option === "exit") {
            onFinishGoalSetting(null);
        }
    };

    const handleCheckItem = (item) => {
        if (checkedItems.includes(item)) {
            setCheckedItems(
                checkedItems.filter((checkedItem) => checkedItem !== item)
            );
        } else {
            setCheckedItems([...checkedItems, item]);
        }
    };

    const GoalList = () => {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Set Your Daily Goals</Text>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.checklistItemContainer}
                        onPress={() =>
                            handleCheckItem("Practice Mindfulness or Meditation")
                        }
                    >
                        <FontAwesome
                            name={
                                checkedItems.includes("Practice Mindfulness or Meditation")
                                    ? "check-square-o"
                                    : "square-o"
                            }
                            size={20}
                            color={
                                checkedItems.includes("Practice Mindfulness or Meditation")
                                    ? "#1D741B"
                                    : "#000"
                            }
                        />
                        <Text style={styles.checklistItem}>
                            Practice Mindfulness or Meditation
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.checklistItemContainer}
                        onPress={() => handleCheckItem("Engage in Physical Exercise")}
                    >
                        <FontAwesome
                            name={
                                checkedItems.includes("Engage in Physical Exercise")
                                    ? "check-square-o"
                                    : "square-o"
                            }
                            size={20}
                            color={
                                checkedItems.includes("Engage in Physical Exercise")
                                    ? "#1D741B"
                                    : "#000"
                            }
                        />
                        <Text style={styles.checklistItem}>
                            Engage in Physical Exercise
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.checklistItemContainer}
                        onPress={() => handleCheckItem("Connect with Loved Ones")}
                    >
                        <FontAwesome
                            name={
                                checkedItems.includes("Connect with Loved Ones")
                                    ? "check-square-o"
                                    : "square-o"
                            }
                            size={20}
                            color={
                                checkedItems.includes("Connect with Loved Ones")
                                    ? "#1D741B"
                                    : "#000"
                            }
                        />
                        <Text style={styles.checklistItem}>Connect with Loved Ones</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.checklistItemContainer}
                        onPress={() => handleCheckItem("Practice Gratitude")}
                    >
                        <FontAwesome
                            name={
                                checkedItems.includes("Practice Gratitude")
                                    ? "check-square-o"
                                    : "square-o"
                            }
                            size={20}
                            color={
                                checkedItems.includes("Practice Gratitude") ? "#1D741B" : "#000"
                            }
                        />
                        <Text style={styles.checklistItem}>Practice Gratitude</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.checklistItemContainer}
                        onPress={() => handleCheckItem("Engage in Creative Activities")}
                    >
                        <FontAwesome
                            name={
                                checkedItems.includes("Engage in Creative Activities")
                                    ? "check-square-o"
                                    : "square-o"
                            }
                            size={20}
                            color={
                                checkedItems.includes("Engage in Creative Activities")
                                    ? "#1D741B"
                                    : "#000"
                            }
                        />
                        <Text style={styles.checklistItem}>
                            Engage in Creative Activities
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.checklistItemContainer}
                        onPress={() => handleCheckItem("Prioritize Self-Care")}
                    >
                        <FontAwesome
                            name={
                                checkedItems.includes("Prioritize Self-Care")
                                    ? "check-square-o"
                                    : "square-o"
                            }
                            size={20}
                            color={
                                checkedItems.includes("Prioritize Self-Care")
                                    ? "#1D741B"
                                    : "#000"
                            }
                        />
                        <Text style={styles.checklistItem}>Prioritize Self-Care</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.checklistItemContainer}
                        onPress={() =>
                            handleCheckItem("Monitor and Challenge Negative Thoughts")
                        }
                    >
                        <FontAwesome
                            name={
                                checkedItems.includes("Monitor and Challenge Negative Thoughts")
                                    ? "check-square-o"
                                    : "square-o"
                            }
                            size={20}
                            color={
                                checkedItems.includes("Monitor and Challenge Negative Thoughts")
                                    ? "#1D741B"
                                    : "#000"
                            }
                        />
                        <Text style={styles.checklistItem}>
                            Monitor and Challenge Negative Thoughts
                        </Text>
                    </TouchableOpacity>
                    {/* Add other checklist items here */}
                    <TouchableOpacity style={styles.button} onPress={handleFinish}>
                        <Text style={styles.buttonText}>Finish</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={{backgroundColor: '#ffff', flex: 1}}>
            {!showCancelModal && <GoalList/>}
            {showCancelModal && (
                <CancelDialog handleCancelOption={handleCancelOption}/>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffff",
        borderRadius: 0,
        margin: 25,
        marginHorizontal: 40
    },
    header: {
        marginBottom: 20,
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    checklistHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 25,
        marginBottom: 20,
    },
    checklistItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 1,
        marginVertical: 15,
    },
    content: {
        marginBottom: 80
    },
    checklistItem: {
        fontSize: 16,
        marginLeft: 10,
    },
    button: {
        backgroundColor: "#FFA500",
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default connect(null, {setGoals})(GoalSettingScreen);
