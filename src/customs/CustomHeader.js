import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colorConstants, fontConstants, images } from '../utils/constants'

export const CustomHeader = (props) => {
  return (
    <View style={styles.container1}>
      <Pressable style={styles.container2}>
        <Image source={images.BackArrow} style={styles.image1}/>
      </Pressable>
      <Text style={styles.text1}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container1:{
        width:responsiveWidth(100),
        height:responsiveHeight(6),
        flexDirection:"row",
        alignItems:"center"
    },
    container2:{
        width:responsiveWidth(7),
        height:responsiveHeight(2),
        marginHorizontal:responsiveWidth(2),
    },
    image1:{
        width:responsiveWidth(7),
        height:responsiveHeight(2),
        resizeMode:"contain"
    },
    text1:{
        fontSize:22,
        color:colorConstants.headingText,
        fontFamily:fontConstants.ibm_regular
    }
})