import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StoryWriting from './src/screens/storywriting/StoryWriting'
import { colorConstants } from './src/utils/constants'

const App = () => {
  return (
    <>
    <StatusBar backgroundColor={colorConstants.background}/>
    <StoryWriting/>
    </>
  )
}

export default App

const styles = StyleSheet.create({})