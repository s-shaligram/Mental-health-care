import {NavigationContainer, DarkTheme, DefaultTheme} from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import * as SplashScreen from "expo-splash-screen";
import {View, Appearance} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {CommonProvider} from "./src/hooks/useGlobalContext";
import { EventRegister } from 'react-native-event-listeners';
import darkMode from './styles/darkMode';
import themeContext from './styles/themeContext';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    const[theme, setTheme] = useState(false);

    useEffect(() => {
        const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
            setTheme(data);
            console.log(data);
        })

        return ()=> {
            EventRegister.removeAllListeners(listener);
        }
    }, [theme]);

    useEffect(() => {
        async function prepare() {
            try {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare().then();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View
            style={{
                flex: 1,
            }}
            onLayout={onLayoutRootView}
        >
            <CommonProvider>
                {/* <themeContext.Provider value={darkMode === true ? darkMode.dark : darkMode.light}>
                    <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}> */}
                    <themeContext.Provider value={theme ? darkMode.dark : darkMode.light}>
                    <NavigationContainer theme={theme ? DarkTheme : DefaultTheme}>

                        <Tabs></Tabs>
                    </NavigationContainer>
                </themeContext.Provider>
            </CommonProvider>
        </View>
    );
}
// import { createContext, useState, useEffect } from "react";
// import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
// import Tabs from "./navigation/tabs";
// import * as SplashScreen from "expo-splash-screen";
// import { View, Appearance } from "react-native";

// const darkMode = {
//   light: {
//     theme: 'light',
//     color: 'black',
//     background: 'white'
//   },
//   dark: {
//     theme: 'dark',
//     color: 'white',
//     background: 'black'
//   }
// };

// const themeContext = createContext(darkMode.light);

// export default function App() {
//   const [appIsReady, setAppIsReady] = useState(false);
//   const [theme, setTheme] = useState(false);

//   useEffect(() => {
//     const listener = Appearance.addChangeListener(({ colorScheme }) => {
//       setTheme(colorScheme === 'dark');
//     });

//     return () => {
//       Appearance.removeChangeListener(listener);
//     };
//   }, []);

//   useEffect(() => {
//     async function prepare() {
//       try {
//         await SplashScreen.preventAutoHideAsync();
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         // Tell the application to render
//         setAppIsReady(true);
//       }
//     }

//     prepare();
//   }, []);

//   const onLayoutRootView = async () => {
//     if (appIsReady) {
//       await SplashScreen.hideAsync();
//     }
//   };

//   if (!appIsReady) {
//     return null;
//   }

//   return (
//     <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
//       <themeContext.Provider value={theme ? darkMode.dark : darkMode.light}>
//         <NavigationContainer theme={theme ? DarkTheme : DefaultTheme}>
//           <Tabs />
//         </NavigationContainer>
//       </themeContext.Provider>
//     </View>
//   );
// }
