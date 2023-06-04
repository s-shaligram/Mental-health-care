import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const NearByMedicalCenter = () => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [layout, setLayout] = useState({ width: 0, height: 0 });

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

  const markers = [
    { id: 1, coordinate: { latitude: 42.9849, longitude: -81.2453 }, title: 'Marker 1' },
    { id: 2, coordinate: { latitude: 42.9840, longitude: -81.2330 }, title: 'Marker 2' },
    { id: 3, coordinate: { latitude: 42.9771, longitude: -81.2453 }, title: 'Marker 3' },
  ];
  

  const initialRegion = currentLocation
    ? {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
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
            />
            ))
            
            // <Marker
            //   coordinate={{
            //     latitude: currentLocation.latitude,
            //     longitude: currentLocation.longitude,
            //   }}
            // />
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
});

export default NearByMedicalCenter;
