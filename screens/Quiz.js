import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import AppContext from '../AppContext';

const Quiz = () => {
  const {url} = useContext(AppContext);

  return (
    <View>
      <Text>{url}</Text>
    </View>
  );
};

export default Quiz;
