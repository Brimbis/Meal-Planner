import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#16423C",
    padding: 8,
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "aquamarine",
  },

  linearGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },

  textInput: {
    height: 40,
    width: 300,
    borderColor: "white",
    color: "white",
    borderWidth: 2,
    marginHorizontal: "auto",
    marginVertical: 10,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  inputContainer: {
    width: 300,
    marginHorizontal: "auto",
  },

  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },

  smallTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },

  buttonContainerLarge: {
    height: 45,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D2A26",
    marginHorizontal: "auto",
    marginVertical: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  buttonContainerSmall: {
    height: 45,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f3d39",
    marginHorizontal: "auto",
    marginVertical: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  separator: {
    marginVertical: 8,
  },

  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#172e2b",
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
  description: {
    fontSize: 14,
    color: "white",
  },
  buttonContainer: {
    marginVertical: 10,
    alignSelf: "center",
    width: "50%",
    display: "flex",
    justifyContent: "space-between",
    height: 80,
  },
  footerContainer: {
    alignSelf: "center",
    width: "50%",
  },
  itemActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: "white",
  },
  profileImageContainer: {
    height: "auto",
    width: "auto",
    borderRadius: 20,
    backgroundColor: "#2D6059",
    alignSelf: "center",
    justifyContent: "center",
    padding: 10,
    position: "absolute",
    top: -60,
  },

  profileContainer: {
    display: "flex",
    backgroundColor: "#16423C",
    padding: 10,
    height: "auto",
    width: "80%",
    alignSelf: "center",
    borderRadius: 20,
  },

  separatorLine: {
    margin: 10,
    width: "80%",
    borderBottomColor: "#FFFFFF",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },

  imageContainer: {
    alignSelf: "center",
  },


  listContainer: {
    flex: 0.75,
    paddingHorizontal: 10,
  },

  mealBox: {
    height: 'auto',
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C4DAD2",
    marginHorizontal: "auto",
    marginVertical: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  }, 

  mealBoxText: {
    fontSize: 16, 
    textAlign: "center",
    justifyContent: 'center', 
    color: '#5D5D5D', 
    paddingVertical: 5, 
  }, 

  weekdayText: {
    fontSize: 20,
    fontWeight: 'bold', 
    textAlign: "left",
    justifyContent: 'left', 
    color: '#16423C', 
    paddingLeft: 20, 
  }, 

  weekdayBox: {
    height: 45,
    width: "80%",
    alignItems: "left",
    justifyContent: "center",
    backgroundColor: "#C4DAD2",
    marginHorizontal: "auto",
    marginVertical: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  }, 
});
