import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text,Linking } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker,Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { readJSONFile } from '../../utils/FileUtils';
import intMarkers from '../../dataSources/nearByMedicalLocation.json'
import customMarkerImage from'../../../assets/medical_center.png'

const NearByMedicalCenter = () => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const [markers, setmarkers] = useState([])
  
  

  useEffect (()=>{
    setmarkers(intMarkers)
  },[])

console.log(markers)
  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (locationPermission) {
      const getCurrentLocation = async () => {
        const { coords } = await Location.getCurrentPositionAsync();
        setCurrentLocation(coords);
      };

      getCurrentLocation();
    }
  }, [locationPermission]);

  if (!locationPermission) {
    // Handle when location permission is not granted
    return null;
  }

  const initialRegion = currentLocation
    ? {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : {
        latitude: 43.676075,
        longitude: -79.452860,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      const handlePhoneNumberLongPress = (mobileNumber) => {
       console.log("on long press/..........")
        const url = `tel:${mobileNumber}`;
        Linking.openURL(url);
      };    

  return (
    <View style={styles.container} onLayout={onLayout}>
      {layout.width > 0 && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          region={initialRegion}>
          {currentLocation && (
            markers.map(marker=>(
              <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              image= {customMarkerImage}>
               <Callout onLongPress={()=>handlePhoneNumberLongPress(marker.mobileNumber)} >
               <View style={styles.calloutStyles}>
              <Text>{marker.title}</Text>
              <Text>{marker.mobileNumber}</Text>
          </View>
        </Callout>  

              </Marker>
            ))
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 490,
  },
  map: {
    flex: 1,
  },
  calloutStyles:{
    width: 200, // Customize the width according to your needs
   height:50,
  }
});

export default NearByMedicalCenter;
