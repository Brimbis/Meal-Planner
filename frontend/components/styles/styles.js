import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#16423C", // Dark green background
    padding: 0,
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
    color: "white",
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

  // Bookmark-specific styles
  bookmarkContainer: {
    flex: 1,
    justifyContent: "flex-start", // Align content at the top
    backgroundColor: "#16423C", // Dark background color for bookmark section
    padding: 0,
  },

  bookmarkLinearGradient: {
    width: "100%",
    height: 200, // Fixed height for the gradient section
    justifyContent: "center",
    alignItems: "center",
  },

  bookmarkTitle: {
    textAlign: "center",
    fontSize: 24, // Larger font for bookmarks title
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },

  bookmarkMealCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },

  bookmarkMealImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },

  bookmarkMealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  bookmarkMealSummary: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },

  bookmarkRemoveButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },

  bookmarkRemoveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  bookmarkNoFavoritesText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    marginTop: 20,
  },

  bookmarkLoadingText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    marginTop: 20,
  },

  bookmarkErrorText: {
    textAlign: "center",
    fontSize: 18,
    color: "#FF6347", // Red color for error messages
    marginTop: 20,
  },

  bookmarkListContainer: {
    flex: 1, // Flex to fill available space for list
    paddingHorizontal: 10,
    paddingBottom: 20, // Padding at the bottom for spacing
  },
});
