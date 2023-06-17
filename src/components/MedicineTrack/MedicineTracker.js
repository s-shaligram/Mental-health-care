import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const MedicineTracker = () => {
    const [intakeState, setIntakeState] = useState();
    const [responseText, setResponseText] = useState('');

    const randomWelcomeMessage = () => {
        let arr = [
            `Hope you didn\'t forget your medicine for today`,
            `Just checking, have you already taken your medicine today?`,
            `Hey there! Remember to take your medicine today, did you get a chance to?`,
            `Did you remember to take your medicine today? It's important to stay on track!`,
            `Reminder! Have you taken your medicine yet?`,
            `Quick question: have you checked off your medicine for today? Don't want you to miss it!`
        ]
        return arr[Math.floor(Math.random()*arr.length)]
    };

    const handleIntakeStateChange = (intakeState) => {
        setIntakeState(intakeState);
    };


    const handleResponseText = (selectedText) => {
        if (selectedText === '😄') {
            setResponseText('Keep it up!! 😊');
        } else if (selectedText === '😞') {
            setResponseText('Everything will be fine, no need to worry!')
        } else if (selectedText === '😠') {
            setResponseText('Calm down and let it go. 🙂🙃')
        } else if (selectedText === '😌') {
            setResponseText('Peace ☮️')
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.emojiContainer}>
                <TouchableOpacity
                    style={styles.emoji}
                    onPress={() => {
                        handleIntakeStateChange('😄');
                        handleResponseText('😄');
                    }}
                >
                    <Text style={styles.emojiText}>😄</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.emoji}
                    onPress={() => {
                        handleIntakeStateChange('😞');
                        handleResponseText('😞');
                    }}
                >
                    <Text style={styles.emojiText}>😞</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.emoji}
                    onPress={() => {
                        handleIntakeStateChange('😠');
                        handleResponseText('😠');
                    }}
                >
                    <Text style={styles.emojiText}>😠</Text>
                </TouchableOpacity>

            </View>
            <Text style={styles.selectedOption}>
                {intakeState ? responseText : randomWelcomeMessage()}
            </Text>
        </View>
    );
};

export default MedicineTracker;