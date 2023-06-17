import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import {useGlobalContext} from "../../hooks/useGlobalContext";

const Track = () => {
        let {medicineTrackerEnabled, medicalRecords} = useGlobalContext();

        const todayIndex = moment().day(); // Get the index of the current day (0 - Sunday, 1 - Monday, etc.)

        return (
            <View style={styles.container}>

                {/*Mood Tracker*/}
                <View style={styles.separator}>
                    <View style={styles.line}/>
                    <Text style={styles.title}>Mood during the week</Text>
                    <View style={styles.line}/>
                </View>

                {/*Medicine Tracker*/}
                {medicineTrackerEnabled && <View style={styles.separator}>
                    <View style={styles.line}/>
                    <Text style={styles.title}>Medicine intake for the week</Text>
                    <View style={styles.line}/>
                </View>}
                {medicineTrackerEnabled && <View style={styles.medicineTrackerContainer}>
                    {medicalRecords.map((state, index) => {
                        const dayName = moment().subtract(6 - index, 'days').format('ddd');
                        const isCurrentDay = index === todayIndex;

                        if (state.medicineTaken === undefined) {
                            return (
                                <View style={styles.dayContainer} key={index}>
                                    <Feather name="square" size={34} color={'#dadada'} />
                                    <Text style={[styles.dayText, isCurrentDay && styles.currentDayText]}>
                                        {dayName}
                                    </Text>
                                </View>
                            );
                        }

                        return (
                            <View style={styles.dayContainer} key={index}>
                                <Feather
                                    name={state.medicineTaken ? 'check-square' : 'x-square'}
                                    size={34}
                                    color={state.medicineTaken ? '#2aa627' : '#ff5959'}
                                />
                                <Text style={[styles.dayText, isCurrentDay && styles.currentDayText]}>
                                    {dayName}
                                </Text>
                            </View>
                        );
                    })}
                </View>}

            </View>
        );
    }
;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    medicineTrackerContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    dayContainer: {
        marginTop: 8,
        alignItems: 'center',
    },
    emptyDayContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#ddd',
        borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayText: {
        marginTop: 5,
    },
    emptyDayText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#777',
    },
    currentDayText: {
        fontWeight: 'bold',
        color: '#000',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        marginBottom: 0
    },
    line: {
        flex: 1,
        height: 2,
        backgroundColor: '#c4c4c4',
    },
    title: {
        color: '#838383',
        marginHorizontal: 5,
    },
});

export default Track;
