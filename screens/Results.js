import {View, Text, TouchableOpacity, BackHandler, Image} from 'react-native';
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
        setResult({
          correct: 0,
          incorrect: 0,
          skipped: 0,
        });
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
    <SafeAreaView className="flex-1 bg-[#fff]">
      <View className="w-11/12 mx-auto pt-6 pb-4 flex-row items-center relative border-b-[1px] border-b-gray">
        <TouchableOpacity
          className="absolute left-4 top-5 z-50 px-2"
          onPress={() => {
            navigation.navigate('Categories');
            setResult({
              correct: 0,
              incorrect: 0,
              skipped: 0,
            });
            setUrl('');
            setCategory(null);
            setDifficulty(null);
          }}>
          <Text className="font-[Rubik-Light] text-dark text-3xl">{'<'}</Text>
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-blue font-[Rubik-SemiBold] text-2xl text-center">
            KWIZZ
          </Text>
        </View>
      </View>
      <View className="items-center mt-8">
        <View className="w-40 h-40 rounded-full overflow-hidden">
          {result.correct >= 8 && (
            <Image
              source={require('../src/assets/images/happy.gif')}
              className="w-40 h-40"
            />
          )}
          {result.correct >= 5 && result.correct < 8 && (
            <Image
              source={require('../src/assets/images/pleased.gif')}
              className="w-40 h-40"
            />
          )}
          {result.correct >= 0 && result.correct < 5 && (
            <Image
              source={require('../src/assets/images/sad.gif')}
              className="w-40 h-40"
            />
          )}
        </View>
        <View className="w-full items-center mt-8">
          <Text className="font-[Rubik-Black] text-7xl text-yellow">
            {result.correct < 10 ? `0${result.correct}` : result.correct}
          </Text>
          <Text className="text-blue font-[Rubik-SemiBold] uppercase">
            Your Score
          </Text>
        </View>
        <View className="w-full mt-8 mb-12">
          <View className="w-10/12 mx-auto flex-row border-[1px] border-light justify-between px-6 py-3 rounded-full">
            <Text className="font-[Rubik-Regular] text-dark">
              Total Questions
            </Text>
            <Text className="font-[Rubik-SemiBold] text-dark">10</Text>
          </View>
          <View className="w-10/12 my-2 mx-auto flex-row border-[1px] border-light justify-between px-6 py-3 rounded-full">
            <Text className="font-[Rubik-Regular] text-[#16a34a]">
              Correct Answers
            </Text>
            <Text className="font-[Rubik-SemiBold] text-[#16a34a]">
              {result.correct}
            </Text>
          </View>
          <View className="w-10/12 mb-2 mx-auto flex-row border-[1px] border-light justify-between px-6 py-3 rounded-full">
            <Text className="font-[Rubik-Regular] text-[#dc2626]">
              Incorrect Answers
            </Text>
            <Text className="font-[Rubik-SemiBold] text-[#dc2626]">
              {result.incorrect}
            </Text>
          </View>
          <View className="w-10/12 mx-auto flex-row border-[1px] border-light justify-between px-6 py-3 rounded-full">
            <Text className="font-[Rubik-Regular] text-[#eab308]">
              Skipped Questions
            </Text>
            <Text className="font-[Rubik-SemiBold] text-[#eab308]">
              {result.skipped}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className="bg-yellow w-[220px] mx-auto p-3 rounded-lg"
          onPress={() => {
            setResult({
              correct: 0,
              incorrect: 0,
              skipped: 0,
            });
            setUrl('');
            setCategory(null);
            setDifficulty(null);
            navigation.navigate('Categories');
          }}>
          <Text className="font-[Rubik-Regular] text-xl text-center text-dark">
            Play Again !
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Results;
