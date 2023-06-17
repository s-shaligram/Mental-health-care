import React, { createContext, useContext, useState } from 'react';

const useHook = () => {
    const [medicalRecords, setMedicalRecords] = useState();
    const [moodRecords, setMoodRecords] = useState();

    return { medicalRecords, setMedicalRecords, moodRecords, setMoodRecords };
};

export const GContext = createContext({});
export const CommonProvider = ({ children }) => {
    const hook = useHook();
    return <GContext.Provider value={hook}>{children}</GContext.Provider>;
};
export const useGlobalContext = () => useContext(GContext);
