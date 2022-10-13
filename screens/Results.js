import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import React, {useContext, useCallback} from 'react';
import AppContext from '../AppContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';

const Results = ({navigation}) => {
  const {result, setUrl, setCategory, setDifficulty, setResult} =
    useContext(AppContext);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Categories'); // remove two screens i.e. Document and Camera
        setResult(0);
        setUrl('');
        setCategory(null);
        setDifficulty(null);
        return true; // disable normal behaviour
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress); // detect back button press
      return () => BackHandler.removeEventListener('hardwareBackPress');
    }, []),
  );

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View>
        <Text>You Scored {result}</Text>
        <TouchableOpacity
          onPress={() => {
            setResult(0);
            setUrl('');
            setCategory(null);
            setDifficulty(null);
            navigation.navigate('Categories');
          }}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Results;
