import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Post_Big_Card from '../Cards/Post_Big_Card';

const FollowersRandomPost = () => {
  const [posts, setPosts] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchPosts();
    // const refreshInterval = setInterval(fetchPosts, 2000); // Fetch new posts every 5 seconds

    // return () => {
    //   clearInterval(refreshInterval); // Cleanup the interval on unmount
    // };
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/getposts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <ScrollView style={styles.container}>
      {posts.map((item) => (
        <Post_Big_Card
          key={item._id + refreshKey}
          postId={item._id}
          username={item.username}
          profile_image={item.profile_image}
          post_pic={item.post_pic}
          likes={item.likes}
          comments={item.comments}
          post_description={item.postdescription}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
  },
  refreshContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  refreshText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default FollowersRandomPost;