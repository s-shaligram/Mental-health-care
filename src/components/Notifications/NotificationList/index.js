import React, {useState} from "react";
import { View } from "react-native";
import Notification from "../Notification";

const NotificationList = ()=>{

const [notifications, setNotifications] = useState("")

const onDeleteNotification = (id)=>{

    const updateNotifiCations =  notifications.filter(


        (notification) => notification.id !== id
    );

    setNotifications(updateNotifiCations)
}

return (
    <View>
{/*     
        {notifications.map((notification)=>{
    
          <Notification 
          
          key ={notification.id}
          id ={notification.id}
          message = {notification.message}
          onDelete = {onDeleteNotification}  
          
          />
    
    
         
    
    
        })} */}
    
    
    </View>
    
    );

}



const styeles = {



}


export default NotificationList