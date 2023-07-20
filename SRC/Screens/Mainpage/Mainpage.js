import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { containerFull } from '../../CommonCss/pagecss'
import { formHead } from '../../CommonCss/formcss'
import Bottomnavbar from '../../Components/Bottomnavbar'
import TopNavbar from '../../Components/TopNavbar'
import FollowersRandomPost from '../../Components/FollowersRandomPost'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Foundation } from '@expo/vector-icons';

const Mainpage = ({ navigation }) => {
  const [userdata, setUserdata] = useState(null)

  const loadData = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem('user')
      if (data) {
        setUserdata(JSON.parse(data))
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} page="MainPage" />
      <Bottomnavbar navigation={navigation} page="MainPage" />
      <FollowersRandomPost userdata={userdata} />
    </View>
  )
}

export default Mainpage

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(219, 174, 197, 0.8)',
    paddingVertical: 50,
  },
  refreshButton: {
    position: 'absolute',
    top: 50,
    right: 10,
  },
})