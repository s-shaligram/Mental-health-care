import React from "react";
import { View, TouchableOpacity } from "react-native";

const Notification  = ({id,message,onDelete}) =>{

 const [_message, setMessage] = useState("")   

    const handleOnDelete = () =>{

        onDelete(id);
    }

    return (
        <View styeles= {styeles.notification}>
        
            <Text>{_message}</Text>
            <TouchableOpacity onPress={handleOnDelete}><Text>Delete</Text> </TouchableOpacity>
        </View>
        
        
        )

}




const styeles = {
     notification: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'lightgray',
  },
} 

export default Notification