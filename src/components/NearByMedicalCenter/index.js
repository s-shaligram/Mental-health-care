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
  
  
  const fetchNearbyHospitals = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = coords;
      //console.log("On Calling....",currentLocation)
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.latitude},${currentLocation.longitude}&radius=15000&type=hospital&key=AIzaSyBERtCzGMk0NwOswtH6-4ReY9r2OSc3-qA`
        //'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=42.9937805,-81.1696604&radius=15000&type=hospital&key=AIzaSyBERtCzGMk0NwOswtH6-4ReY9r2OSc3-qA'
      
        );
      const data = await response.json();
      const hospitalMarkers = data.results.map((result) => ({
        id: result.place_id,
        coordinate: {
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
        },
        title: result.name,
        mobileNumber: result.formatted_phone_number || "Contact: "+generateRandomPhoneNumber(),
      }));
      setmarkers(hospitalMarkers);
    } catch (error) {
      console.log('Error fetching nearby hospitals:', error);
    }
  };

  const generateRandomPhoneNumber = () => {
    const firstThreeDigits = Math.floor(Math.random() * 900) + 100; // Generates a random number between 100 and 999
    const secondThreeDigits = Math.floor(Math.random() * 900) + 100;
    const lastFourDigits = Math.floor(Math.random() * 9000) + 1000; // Generates a random number between 1000 and 9999
    return `${firstThreeDigits} ${secondThreeDigits} ${lastFourDigits}`;
  };

  useEffect (()=>{
    //setmarkers(intMarkers)
   fetchNearbyHospitals()
  },[currentLocation])

//console.log(markers)
  const onLayout = (event) => {//
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
      const getCurrentLocation =  () => {
        //const { coords } = await Location.getCurrentPositionAsync();
        setCurrentLocation({
          "accuracy": 21.600000381469727,
          "altitude": 82.9000015258789,
          "altitudeAccuracy": 68.10995483398438,
          "heading": 0,
          "latitude": 43.0140985,
          "longitude": -81.1990796,
          "speed": 0,
        });
      };

      getCurrentLocation();
      fetchNearbyHospitals();
    }
  }, [locationPermission]);

  if (!locationPermission) {
    // Handle when location permission is not granted
    return null;
  }

  const initialRegion = currentLocation
    ? {
        latitude: 43.0140985,
        longitude: -81.1990796,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      }
    : {
        latitude: 43.0140985,
        longitude: -81.1990796,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      };

      const handlePhoneNumberLongPress = (mobileNumber) => {
      // console.log("on long press/......")
        const url = `tel:${mobileNumber}`;
        Linking.openURL(url);
      };    
//console.log("MY markes_____",markers);
  return (
    <View style={styles.container} onLayout={onLayout}>
      {layout.width > 0 && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={initialRegion}
          //zoomEnabled={false}
          minZoomLevel = {12}
          scrollEnabled={false} 
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
    width: 210, // Customize the width according to your needs
   height:80,
  }
});

export default NearByMedicalCenter;