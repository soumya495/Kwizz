import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import AppContext from '../AppContext';

const Difficulty = ({navigation}) => {
  const {baseUrl, url, setUrl} = useContext(AppContext);
  const [difficulty, setDifficulty] = useState(null);

  function handleDifficulty(diff) {
    setDifficulty(diff);

    if (diff !== 'easy' && url.includes(`&difficulty=easy`)) {
      setUrl(prev => prev.replace('&difficulty=easy', `&difficulty=${diff}`));
      return;
    }
    if (diff !== 'medium' && url.includes(`&difficulty=medium`)) {
      setUrl(prev => prev.replace('&difficulty=medium', `&difficulty=${diff}`));
      return;
    }
    if (diff !== 'hard' && url.includes(`&difficulty=hard`)) {
      setUrl(prev => prev.replace('&difficulty=hard', `&difficulty=${diff}`));
      return;
    }

    setUrl(prev => `${prev}&difficulty=${diff}`);
  }

  console.log('Main Url: ', url);

  return (
    <SafeAreaView className="flex-1 relative bg-[#fff]">
      <View className="w-11/12 mx-auto pt-6 pb-4 flex-row items-center relative border-b-[1px] border-b-gray">
        <TouchableOpacity
          className="absolute left-4 top-5 z-50 px-2"
          onPress={() => navigation.goBack()}>
          <Text className="font-[Rubik-Light] text-dark text-3xl">{'<'}</Text>
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-blue font-[Rubik-SemiBold] text-2xl text-center">
            KWIZZ
          </Text>
        </View>
      </View>
      <View className="mx-auto justify-center pt-14 pb-6">
        <Text className={`font-[Rubik-Italic] text-center text-xl text-dark `}>
          Choose a Difficulty Level
        </Text>
      </View>
      <View className="mx-auto rounded-full overflow-hidden border-2 border-[#fff]">
        {!difficulty && (
          <Image
            source={require('../src/assets/images/init.gif')}
            style={{resizeMode: 'contain'}}
            className="w-72 h-72"
          />
        )}
        {difficulty && difficulty === 'easy' && (
          <Image
            source={require('../src/assets/images/easy.gif')}
            style={{resizeMode: 'contain'}}
            className="w-72 h-72"
          />
        )}
        {difficulty && difficulty === 'medium' && (
          <Image
            source={require('../src/assets/images/medium.gif')}
            style={{resizeMode: 'contain'}}
            className="w-72 h-72"
          />
        )}
        {difficulty && difficulty === 'hard' && (
          <Image
            source={require('../src/assets/images/hard.gif')}
            style={{resizeMode: 'contain'}}
            className="w-72 h-72"
          />
        )}
      </View>
      <View className="w-10/12 mx-auto my-6">
        <TouchableOpacity
          onPress={() => handleDifficulty('easy')}
          className={`border-[1px] border-[#86efac] ${
            difficulty === 'easy' && 'bg-[#86efac]'
          } p-2 rounded-full`}>
          <Text
            className={`text-[#166534] font-[Rubik-Medium] text-2xl text-center`}>
            Easy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDifficulty('medium')}
          className={`my-4 border-[1px] border-[#fde047] ${
            difficulty === 'medium' && 'bg-[#fde047]'
          } p-2 rounded-full`}>
          <Text
            className={`text-[#ca8a04] font-[Rubik-Medium] text-2xl text-center`}>
            Medium
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDifficulty('hard')}
          className={`border-[1px] border-[#fca5a5] ${
            difficulty === 'hard' && 'bg-[#fca5a5]'
          } p-2 rounded-full`}>
          <Text
            className={`text-[#dc2626] font-[Rubik-Medium] text-2xl text-center`}>
            Hard
          </Text>
        </TouchableOpacity>
      </View>
      {difficulty && (
        <View className="w-full absolute bottom-7 flex-row justify-center">
          <TouchableOpacity
            className="bg-yellow w-[220px] mx-auto p-3 rounded-lg"
            onPress={() => navigation.navigate('Quiz')}>
            <Text className="font-[Rubik-Regular] text-xl text-center text-dark ">
              Start Quiz!
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Difficulty;
