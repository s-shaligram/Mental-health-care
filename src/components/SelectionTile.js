import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const SelectionTile = (props) => {
  const {name, routeTo, navigation} = props;
  return (
    <TouchableOpacity
        style={styles.container}
      onPress={() => {
        navigation.navigate(routeTo, {
          data1: {},
          data2: {
            dataField1: 1,
            dataField2: "kav"
          },
        });
      }}
    >
      <View>
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginStart: 10,
    height: 90,
    marginEnd: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  }
});

export default SelectionTile;
