import React, { createContext, useContext, useState } from 'react';
import moment from "moment/moment";

const useHook = () => {
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
    const [moodRecords, setMoodRecords] = useState([]);
    const [medicineTrackerEnabled, setMedicineTrackerEnabled] = useState(true);

    return {
        medicalRecords,
        setMedicalRecords,
        moodRecords,
        setMoodRecords,
        medicineTrackerEnabled,
        setMedicineTrackerEnabled
    };
};

export const GContext = createContext({});
export const CommonProvider = ({ children }) => {
    const hook = useHook();
    return <GContext.Provider value={hook}>{children}</GContext.Provider>;
};
export const useGlobalContext = () => useContext(GContext);
