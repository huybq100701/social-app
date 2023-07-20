import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { icons1 } from "../CommonCss/pagecss";

const Post_Big_Card = ({
  post_pic,
  profile_image,
  username,
  likes,
  comments,
  post_description,
  postId,
  onLikePost,
  onAddComment,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState(comments);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    setCommentList(comments);
    setLikeCount(likes.length);
  }, [comments, likes]);

  const handleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    onLikePost(username, postId);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      const newComment = {
        id: Date.now().toString(),
        username: username,
        comment: commentText.trim(),
      };
      setCommentList((prevComments) => [...prevComments, newComment]);
      setCommentText("");
      onAddComment(username, postId, commentText);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.c1}>
        <Image source={{ uri: profile_image }} style={styles.profilepic} />
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{post_description}</Text>
      </View>
      <Image source={{ uri: post_pic }} style={styles.image} />
      <View style={styles.s2}>
        <View style={styles.s21}>
          {isLiked ? (
            <AntDesign
              name="heart"
              size={24}
              color="black"
              style={styles.iconliked}
              onPress={handleLike}
            />
          ) : (
            <AntDesign
              name="hearto"
              size={24}
              color="black"
              style={icons1}
              onPress={handleLike}
            />
          )}
          <Text style={styles.likeCount}>{likeCount}</Text>
        </View>

        <View style={styles.s22}>
          <FontAwesome
            name="comment"
            size={24}
            color="black"
            style={icons1}
            onPress={() => setShowComments(!showComments)}
          />
        </View>
      </View>

      {showComments && (
        <View style={styles.s3}>
          {commentList.map((item) => (
            <View style={styles.commentContainer} key={item.id}>
              <Text style={styles.commentUser}>{item.username}</Text>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
          ))}
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity
              style={styles.commentButton}
              onPress={handleCommentSubmit}
            >
              <Text style={styles.commentButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: "black",
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
    color: "grey",
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

export default Post_Big_Card;