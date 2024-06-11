import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colorConstants, fontConstants, images } from '../../../utils/constants'
import { CustomInput } from '../../../customs'

const data = [
  {
    tab: "Correct Grammar & Spelling",
    case: "correct_grammar"
  },
  {
    tab: "Make it longer",
    case: "make_it_longer"
  },
  {
    tab: "Make it shorter",
    case: "make_it_shorter"
  },
]


export const AskAi = (props) => {
  const [select, setSelect] = useState("")
  const { selectedText, responseText, setResponseText, askAgastyaInput, setAskAgastyaInput } = props

  const processText = (option) => {
    let processedText = selectedText ? selectedText : askAgastyaInput;
    switch (option) {
      case 'correct_grammar':
        processedText = 'Corrected grammar text.';
        break;
      case 'make_it_longer':
        processedText = 'This is a longer version of the text.';
        break;
      case 'make_it_shorter':
        processedText = 'This is shorter text.';
        break;
      default:
        processedText;
        break;
    }

    setResponseText(processedText);
  };


  return (
    <View style={styles.container1}>
      <View style={styles.container2}>
        <Text style={styles.text1}>Ask Agastya AI</Text>
        <Pressable style={styles.container3} onPress={() => { processText(select); }}>
          <Image source={images.Next} style={styles.image1} />
        </Pressable>
      </View>
      <CustomInput
        style={styles.inpContainer}
        inpStyle={styles.inpTxt}
        placeholder="Ask me or choose an option"
        value={askAgastyaInput}
        onChangeText={(txt) => setAskAgastyaInput(txt)}
      />
      <View style={styles.container4}>

        {
          responseText === ""
            ?
            data.map((item, index) => {
              return (
                <Pressable key={index} style={[styles.container5, select === item.case && styles.active]} onPress={() => { setSelect(item.case) }}>
                  <Text style={styles.text2}>{item.tab}</Text>
                </Pressable>
              )
            })
            :
            <>
              <Text style={styles.text3}>{responseText}</Text>
              <View style={styles.container6}>
                <Pressable style={styles.container7} onPress={() => setResponseText("")}>
                  <Text>Clear</Text>
                </Pressable>
                <Pressable style={styles.container7} onPress={props.continuePress}>
                  <Text>Continue</Text>
                </Pressable>
              </View>
            </>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container1: {
    width: responsiveWidth(100),
    marginTop: responsiveHeight(3)
  },
  container2: {
    width: responsiveWidth(90),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  text1: {
    fontSize: 18,
    color: colorConstants.border,
    fontFamily: fontConstants.ibm_regular,
  },
  container3: {
    width: responsiveWidth(8),
    height: responsiveHeight(4),
    borderWidth: 1,
    borderColor: colorConstants.border,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  image1: {
    width: responsiveWidth(8),
    height: responsiveHeight(2),
    resizeMode: "contain"
  },
  inpContainer: {
    marginTop: responsiveHeight(2)
  },
  inpTxt: {
    borderColor: colorConstants.yellow
  },
  container4: {
    width: responsiveWidth(90),
    alignSelf: "center",
    marginTop: responsiveHeight(4),
  },
  container5: {
    marginVertical: responsiveHeight(1)
  },
  text2: {
    fontSize: 18,
    color: colorConstants.textClr,
    fontFamily: fontConstants.ibm_regular,
  },
  active: {
    backgroundColor: colorConstants.yellow
  },
  text3: {
    fontSize: 14,
    color: colorConstants.textClr,
    fontFamily: fontConstants.ibm_regular,
  },
  container6: {
    width: responsiveWidth(90),
    alignSelf: "center",
    marginVertical: responsiveHeight(2),
    flexDirection: "row",
    justifyContent: "space-around"
  },
  container7: {
    width: responsiveWidth(40),
    height: responsiveHeight(5),
    backgroundColor: colorConstants.border,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  },
})