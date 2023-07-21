import { StyleSheet } from "react-native";
const postStyles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      width: "100%",
      borderRadius: 10,
      marginVertical: 10,
      overflow: "hidden",
      borderColor: "white",
      borderWidth: 1,
    },
    c1: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      backgroundColor: "black",
    },
    profilepic: {
      width: 30,
      height: 30,
      borderRadius: 30,
      borderColor: "white",
      borderWidth: 1,
    },
    username: {
      color: "white",
      marginLeft: 10,
      fontSize: 17,
      fontWeight: "bold",
    },
    image: {
      width: "100%",
      aspectRatio: 1,
    },
    s2: {
      width: "100%",
      flexDirection: "row",
      backgroundColor: "black",
      padding: 10,
      alignItems: "center",
    },
    s21: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconliked: {
      color: "#DC143C",
      fontSize: 30,
    },
    likeCount: {
      color: "white",
      marginLeft: 5,
      fontSize: 16,
    },
    s22: {
      marginLeft: 20,
    },
    s3: {
      width: "100%",
      backgroundColor: "#111111",
      padding: 10,
    },
    commentContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 3,
    },
    commentUser: {
      color: "white",
      fontWeight: "bold",
      fontSize: 17,
    },
    commentText: {
      color: "white",
      fontSize: 17,
      marginLeft: 5,
    },
    descriptionContainer: {
      backgroundColor: "black",
      padding: 10,
    },
    description: {
      color: "white",
      fontSize: 17,
    },
    commentInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    commentInput: {
      flex: 1,
      backgroundColor: "white",
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 20,
      marginRight: 10,
    },
    commentButton: {
      backgroundColor: "blue",
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
    },
    commentButtonText: {
      color: "white",
      fontWeight: "bold",
    },
  });

export default postStyles;