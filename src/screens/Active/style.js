import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  count: {
    fontSize: 70,
    marginBottom: 40,
    fontWeight: "bold",
    color: "#1D741B", // Customize the color as per your preference
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  avatar: {
    width: 150, // Customize the width as per your requirement
    height: 150, // Customize the height as per your requirement
    borderRadius: 25, // Customize the borderRadius as per your preference
    marginBottom: 90,
  },
  button: {
    backgroundColor: "#FFA500",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
export default styles;
