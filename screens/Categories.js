import {SafeAreaView, View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useState} from 'react';
import categoriesData from '../categories';
import AppContext from '../AppContext';

const Categories = ({navigation}) => {
  const {baseUrl, setUrl} = useContext(AppContext);
  const [category, setCategory] = useState(null);

  function onCategoryPress(ctg) {
    if (category && category.id === ctg.id) {
      setCategory(null);
      setUrl(baseUrl);
      return;
    }

    setCategory(ctg);
    setUrl(`${baseUrl}&category=${ctg.id}`);
  }

  return (
    <SafeAreaView className="flex-1 relative">
      <View className="bg-blue min-h-[300px]">
        <View className="pt-6">
          <Text className="text-light font-[Rubik-SemiBold] text-2xl text-center">
            KWIZZ
          </Text>
        </View>
        <View className="max-w-[200px] mx-auto flex-1 justify-center">
          <Text
            className={`font-[Rubik-Italic] text-center text-xl text-light ${
              category ? 'mb-24' : 'mb-12'
            }`}>
            Choose a category to start quiz
          </Text>
        </View>
      </View>
      <View
        className={`flex-row flex-wrap justify-center space-x-4 px-6 ${
          category ? '-mt-24' : '-mt-12'
        }`}>
        {categoriesData.map(ctg => {
          return (
            <TouchableOpacity
              key={ctg.id}
              onPress={() => {
                onCategoryPress(ctg);
              }}
              className={`w-[150px] h-[150px] px-0 mb-4 rounded-xl p-2 ${
                category?.id === ctg.id ? 'bg-[#b2e4d0]' : 'bg-[#fff]'
              }`}>
              <View className="w-24 h-24 rounded-full mx-auto">
                <Image source={ctg.img} className="w-24 h-24" />
              </View>
              <Text className="text-dark text-center font-[Rubik-SemiBold] uppercase">
                {ctg.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {category && (
        <View className="w-full absolute bottom-6 flex-row justify-center">
          <TouchableOpacity
            className="bg-yellow w-[220px] mx-auto p-3 rounded-lg"
            onPress={() => navigation.navigate('Difficulty')}>
            <Text className="font-[Rubik-Regular] text-xl text-center text-dark ">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Categories;
