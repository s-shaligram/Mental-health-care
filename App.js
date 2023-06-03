import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import MoodTracker from './MoodTrack/moodtracker';

export default function App() {

  // SplashScreen.preventAutoHideAsync()
  // .then((prevented) => {
  //   console.log('Prevented:', prevented);
  // })
  // .catch((error) => {
  //   console.log('Prevent error:', error);
  // });

  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />
      <MoodTracker/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
