import React, { createContext, useContext, useState } from 'react';

const useHook = () => {
    const [medicalRecords, setMedicalRecords] = useState([]);
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
