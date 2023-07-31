import React, {useState, useEffect} from "react";
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
import {useGlobalContext} from "../../hooks/useGlobalContext";

const ViewGoalsButton = () => {
    const [goals, setGoals] = useState([]);
    const [goalText, setGoalText] = useState("");
    const [goalInfo, setGoalInfo] = useState([]);
    const [isListVisible, setListVisible] = useState(false);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
    const {theme} = useGlobalContext();
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
    const handleViewGoals = () => {
        setGoalInfo([
            {
                title: "Practice Mindfulness or Meditation",
                description:
                    "Set a goal to engage in mindfulness or meditation exercises for a certain amount of time each day. This can help reduce stress, improve focus, and enhance overall well-being.",
            },
            {
                title: "Engage in Physical Exercise",
                description:
                    "Aim to incorporate physical activity into your daily routine. It can be a walk, yoga session, workout, or any form of exercise that you enjoy. Regular exercise has been shown to boost mood, reduce anxiety, and increase energy levels.",
            },
            {
                title: "Connect with Loved Ones",
                description:
                    "Make it a goal to reach out and connect with friends, family, or supportive individuals in your life. This can be through phone calls, video chats, or meeting in person. Social connections play a vital role in maintaining mental well-being.",
            },
            {
                title: "Practice Gratitude",
                description:
                    "Set a goal to identify and appreciate things you are grateful for each day. It can be as simple as writing down three things you are thankful for or reflecting on positive experiences. Cultivating gratitude can shift focus towards positivity and improve overall outlook.",
            },
            {
                title: "Engage in Creative Activities",
                description:
                    "Allocate time for creative pursuits that bring you joy, such as painting, writing, playing an instrument, or crafting. Engaging in creative activities can provide a sense of fulfillment and serve as a form of self-expression.",
            },
            {
                title: "Prioritize Self-Care",
                description:
                    "Make self-care a daily goal by setting aside time for activities that nurture your well-being. This can include taking a relaxing bath, reading a book, practicing self-reflection, or engaging in hobbies that bring you pleasure.",
            },
            {
                title: "Monitor and Challenge Negative Thoughts",
                description:
                    "Set a goal to be aware of negative thoughts or self-talk and practice challenging and reframing them. This can involve techniques like cognitive restructuring, positive affirmations, or seeking professional help if needed.",
            },
        ]);
        setListVisible(!isListVisible);
    };

    const deleteGoals = async () => {
        try {
            await AsyncStorage.removeItem("userGoals");
            console.log("Successfully deleted goals.");
            setGoals([]);
            setGoalText("");
        } catch (error) {
            console.error("Error deleting goals:", error);
        }
    };
    return (
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
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 25,
        flexDirection: "column",
        alignItems: "center",
        marginTop: 5,
        marginStart: 10,
        height: 60,
        marginEnd: 10,
    },
    container2: {
        flex: 1,
    },
    container1: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 5,
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 0,
        marginHorizontal: 20,
        elevation: 5,
    },
    scrollView: {
        margin: 15,
        padding: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

});
export default ViewGoalsButton;
