import React, { createContext, useContext, useState } from 'react';
import moment from "moment/moment";

const useHook = () => {
    const [moodRecords, setMoodRecords] = useState([]);
    const [medicineTrackerEnabled, setMedicineTrackerEnabled] = useState(true);
    const [sleepTrackerEnabled, setSleepTrackerEnabled] = useState(true);
    const [medicalRecords, setMedicalRecords] = useState([
        {
            date: (moment().day()-6),
            medicineTaken: true
        },
        {
            date: (moment().day()-5),
            medicineTaken: true
        },
        {
            date: (moment().day()-4),
            medicineTaken: false
        },
        {
            date: (moment().day()-3),
            medicineTaken: true
        },
        {
            date: (moment().day()-2),
            medicineTaken: false
        },
        {
            date: (moment().day()-1),
            medicineTaken: true
        },
        {
            date: (moment().day()),
            medicineTaken: undefined
        }
    ]);
    const [sleepRecords, setSleepRecords] = useState([
        {
            date: (moment().day()-6),
            sleepHours: 4
        },
        {
            date: (moment().day()-5),
            sleepHours: 5
        },
        {
            date: (moment().day()-4),
            sleepHours: 2
        },
        {
            date: (moment().day()-3),
            sleepHours: 8
        },
        {
            date: (moment().day()-2),
            sleepHours: 6
        },
        {
            date: (moment().day()-1),
            sleepHours: 7
        },
        {
            date: (moment().day()),
            sleepHours: 0
        }
    ]);
    return {
        medicalRecords,
        setMedicalRecords,
        moodRecords,
        setMoodRecords,
        medicineTrackerEnabled,
        setMedicineTrackerEnabled,
        sleepTrackerEnabled,
        setSleepTrackerEnabled,
        sleepRecords,
        setSleepRecords
    };
};

export const GContext = createContext({});
export const CommonProvider = ({ children }) => {
    const hook = useHook();
    return <GContext.Provider value={hook}>{children}</GContext.Provider>;
};
export const useGlobalContext = () => useContext(GContext);
