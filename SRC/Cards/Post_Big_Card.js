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
import postStyles from "../CommonCss/postcss";

const Post_Big_Card = ({
  post_pic,
  profile_image,
  username,
  likes,
  comments,
  post_description,
  userId, 
}) => {
  const styles = postStyles;
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState(comments);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [commentText, setCommentText] = useState("");
  
  useEffect(() => {
    setCommentList(comments);
    setLikeCount(likes.length);
    setIsLiked(likes.includes(username));
  }, [comments, likes, userId]);

  const handleLike = async () => {
    const action = isLiked ? "unlike" : "like";
    setIsLiked(!isLiked);

    try {
      const response = await fetch("http://10.0.2.2:3000/likepost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: userId, 
          username: username,
          postdescription: post_description,
          action: action,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        if (action === "like") {
          setLikeCount((prevCount) => prevCount + 1);
        } else {
          setLikeCount((prevCount) => prevCount - 1);
        }
      } else {
        console.log(data.error);
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.log(error);
      setIsLiked(!isLiked);
    }
  };

  const handleCommentSubmit = async () => {
    if (commentText.trim() !== "") {
      try {
        const response = await fetch("http://10.0.2.2:3000/commentpost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: userId, 
            username: username,
            postdescription: post_description,
            comment: commentText.trim(),
          }),
        });

        const data = await response.json();
        if (response.ok) {
          const newComment = {
            id: Date.now().toString(),
            username: username,
            comment: commentText.trim(),
          };
          setCommentList((prevComments) => [...prevComments, newComment]);
          setCommentText("");
        } else {
          console.log(data.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.c1}>
        <Image source={{ uri: profile_image }} style={styles.profilepic} />
        <Text style={styles.username}>{username}</Text>
      </View>
      {post_description && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{post_description}</Text>
        </View>
      )}
      <Image source={{ uri: post_pic }} style={styles.image} />
      <View style={styles.s2}>
        <View style={styles.s21}>
          {isLiked ? (
            <AntDesign
              name="heart"
              size={24}
              color="red"
              style={styles.iconliked}
              onPress={handleLike}
            />
          ) : (
            <AntDesign
              name="hearto"
              size={24}
              color="white"
              style={styles.icon}
              onPress={handleLike}
            />
          )}
          <Text style={styles.likeCount}>{likeCount}</Text>
        </View>
        <View style={styles.s22}>
          <FontAwesome
            name="comment"
            size={24}
            color="white"
            style={styles.icon}
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

export default Post_Big_Card;
