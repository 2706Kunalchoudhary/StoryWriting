import { Image, Keyboard, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CustomHeader, CustomInput } from '../../customs'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { colorConstants, fontConstants, images } from '../../utils/constants'
import { AskAi } from './components'

const data = [
    {
        tab: "Keyboard",
        img: images.Keyboard
    },
    {
        tab: "Ai",
        img: images.Star
    },
]


const StoryWriting = () => {
    const [popUpBar, setPopUpBar] = useState(false)
    const [expandedIndexes, setExpandedIndexes] = useState([]);
    const [titleText, setTitleText] = useState("")
    const [subTitleText, setSubTitleText] = useState("")
    const [bodyText, setBodyText] = useState("")
    const [selection, setSelection] = useState({ start: 0, end: 0 });
    const [selectedText, setSelectedText] = useState('');
    const [responseText, setResponseText] = useState("")
    const [askAgastyaInput, setAskAgastyaInput] = useState('');
    const [active, setActive] = useState("Keyboard")
    const bodyInputRef = useRef(null);


    const titleData = [
        {
            tab: "Title",
            component: <CustomInput
                placeholder="Enter Title"
                value={titleText}
                onChangeText={(txt) => setTitleText(txt)} refs={bodyInputRef}
            />
        },
        {
            tab: "Sub Title",
            component: <CustomInput
                placeholder="Enter Sub-Title"
                value={subTitleText}
                onChangeText={(txt) => setSubTitleText(txt)}
                refs={bodyInputRef}
            />
        },
        {
            tab: "Body",
            component: <CustomInput
                placeholder="Write Story..."
                value={bodyText}
                onChangeText={(txt) => setBodyText(txt)}
                multiline={true}
                style={styles.container5}
                inpStyle={styles.txtInp}
                refs={bodyInputRef}
                onSelectionChange={({ nativeEvent: { selection } }) => setSelection(selection)}
                selection={selection}
            />
        },
    ]

    const toggleInput = (index) => {
        if (expandedIndexes.includes(index)) {
            setExpandedIndexes(expandedIndexes.filter(item => item !== index));
        } else {
            setExpandedIndexes([...expandedIndexes, index]);
        }
    };

    useEffect(() => {
        if (active === "Keyboard") {
            handleKeyboardPress()
        }
    }, [popUpBar, expandedIndexes])


    const handleKeyboardPress = () => {
        setActive("Keyboard")
        if (bodyInputRef.current) {
            bodyInputRef.current.focus();
        }
    };

    const handleStarPress = () => {
        setActive("Ai")
        Keyboard.dismiss()
    }

    useEffect(() => {
        handleGetSelectedText()
    }, [selection])


    const handleGetSelectedText = () => {
        const selected = bodyText.substring(selection.start, selection.end);
        setSelectedText(selected);
    };

    const handleContinue = () => {
        const beforeText = bodyText.substring(0, selection.start);
        const afterText = bodyText.substring(selection.end);
        const newBodyText = beforeText + responseText + afterText;
        setBodyText(newBodyText);
        setSelection({ start: beforeText.length + responseText.length, end: beforeText.length + responseText.length });
        if (bodyText.includes(askAgastyaInput) && askAgastyaInput !== "") {
            setBodyText(bodyText.replace(askAgastyaInput, responseText))
        }
    };

    return (
        <SafeAreaView style={styles.main}>
            <CustomHeader title="Write New Story" />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container1}>
                    {
                        titleData.map((item, index) => {
                            const isExpanded = expandedIndexes.includes(index);
                            return (
                                <View key={index} style={styles.container2}>
                                    <Pressable style={styles.container3} onPress={() => { setPopUpBar(true); toggleInput(index) }}>
                                        <Text style={styles.text1}>{item.tab}</Text>
                                    </Pressable>
                                    {isExpanded && item.component}
                                </View>
                            )
                        })
                    }
                    {
                        popUpBar
                        &&
                        <View style={styles.container4}>
                            {
                                data.map((item, index) => {
                                    const handlePress = item.tab === 'Keyboard' ? handleKeyboardPress : handleStarPress;
                                    return (
                                        <Pressable key={index} style={styles.container6} onPress={handlePress}>
                                            <Image source={item.img} style={styles.image1} />
                                        </Pressable>
                                    )
                                })
                            }
                        </View>
                    }
                    {active === "Ai"
                        &&
                        <AskAi
                            selectedText={selectedText}
                            responseText={responseText}
                            setResponseText={setResponseText}
                            askAgastyaInput={askAgastyaInput}
                            setAskAgastyaInput={setAskAgastyaInput}
                            continuePress={handleContinue} />}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default StoryWriting

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    container1: {
        width: responsiveWidth(100),
        height: responsiveHeight(100),
    },
    container2: {
        width: responsiveWidth(90),
        alignSelf: "center"
    },
    container3: {
        width: responsiveWidth(100),
        marginVertical: responsiveHeight(2)
    },
    container4: {
        width: responsiveWidth(100),
        height: responsiveHeight(4),
        flexDirection: "row",
        alignItems: "center"
    },
    text1: {
        fontSize: 16,
        color: colorConstants.border,
        fontFamily: fontConstants.ibm_bold
    },
    container5: {
        height: responsiveHeight(20),
        marginBottom: responsiveHeight(3)
    },
    txtInp: {
        height: responsiveHeight(20),
        textAlignVertical: "top"
    },
    container6: {
        width: responsiveWidth(10),
        height: responsiveHeight(4),
        marginHorizontal: responsiveWidth(5),
        justifyContent: "center",
        alignItems: "center"
    },
    image1: {
        width: responsiveWidth(8),
        height: responsiveHeight(3),
        resizeMode: "contain",
    }
})