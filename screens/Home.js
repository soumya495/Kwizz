import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const Home = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 bg-blue">
      <View className="mt-24">
        <Text className="font-[Rubik-Medium] text-7xl text-center text-dark">
          KWIZZ
        </Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <Image
          source={require('../src/assets/images/intro.png')}
          className="w-[300px] h-[300px]"
          style={{resizeMode: 'contain'}}
        />
      </View>
      <TouchableOpacity
        className="mb-16 bg-yellow w-[220px] mx-auto p-3 rounded-lg"
        onPress={() => navigation.navigate('Categories')}>
        <Text className="font-[Rubik-Regular] text-xl text-center text-dark ">
          Get Started !
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
