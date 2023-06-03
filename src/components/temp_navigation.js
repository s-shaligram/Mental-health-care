import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


// this is for temporary navigation only
const TempNavigation = () => {
    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Tab 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>More</Text>
        </TouchableOpacity>
      </View>
    );
  }


  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex:1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#f2f2f2',
      height: 60,
      marginTop:20
      
    },
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabText: {
      fontSize: 16,
    },
  });
  
  export default TempNavigation