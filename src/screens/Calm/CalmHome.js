import React, { useContext } from "react";
import { ScrollView } from "react-native";
import SelectionTile from "../../components/SelectionTile";
import themeContext from "../../../styles/themeContext";
import { useGlobalContext } from "../../hooks/useGlobalContext";

function CalmHome({ navigation }) {
  // const theme = useContext(themeContext);
  const { theme } = useGlobalContext();

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <SelectionTile
        name={"Change Theme"}
        routeTo={"ChangeTheme"}
        navigation={navigation}
      />
      <SelectionTile
        name={"Selection B"}
        routeTo={"ScreenB"}
        navigation={navigation}
      />
    </ScrollView>
  );
}

export default CalmHome;
