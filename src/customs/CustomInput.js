import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colorConstants } from '../utils/constants'

export const CustomInput = (props) => {
  return (
    <View style={[styles.container1,props.style]}>
      <TextInput style={[styles.txtInp,props.inpStyle]}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      placeholderTextColor={colorConstants.border}
      multiline={props.multiline}
      ref={props.refs}
      onSelectionChange={props.onSelectionChange}
      selection={props.selection}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container1:{
        width:responsiveWidth(90),
        height:responsiveHeight(5),
        alignSelf:"center"
    },
    txtInp:{
        width:responsiveWidth(90),
        height:responsiveHeight(5),
        borderWidth:1,
        borderRadius:8,
        borderColor:colorConstants.border,
        fontSize:14,
        color:colorConstants.textClr,
        paddingHorizontal:10
    }
})