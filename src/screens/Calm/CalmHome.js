import React, { useContext } from "react";
import { ScrollView } from "react-native";
import SelectionTile from "../../components/SelectionTile";
import themeContext from "../../../styles/themeContext";

function CalmHome({navigation}) {

    const theme = useContext(themeContext);

    return (
        <ScrollView style={{backgroundColor:theme.backgroundColor}}>
            <SelectionTile name={"Change theme"} routeTo={'ScreenA'} navigation={navigation}/>
            <SelectionTile name={"Selection B"} routeTo={'ScreenB'} navigation={navigation}/>
        </ScrollView>
    );
}

export default CalmHome;
// import React, { useContext } from "react";
// import { ScrollView } from "react-native";
// import SelectionTile from "../../components/SelectionTile";
// import themeContext from "../../../styles/themeContext";

// function CalmHome({ navigation }) {
//   const theme = useContext(themeContext);

//   return (
//     <ScrollView style={{ backgroundColor: theme?.background }}>
//       <SelectionTile name={"Change theme"} routeTo={'ScreenA'} navigation={navigation} />
//       <SelectionTile name={"Selection B"} routeTo={'ScreenB'} navigation={navigation} />
//     </ScrollView>
//   );
// }

// export default CalmHome;
