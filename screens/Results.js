import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import AppContext from '../AppContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const Results = ({navigation}) => {
  const {result, setUrl, setCategory, setDifficulty, setResult} =
    useContext(AppContext);

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
