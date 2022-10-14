import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import AppContext from '../AppContext';
import Shuffle from '../shuffle';

const Quiz = ({navigation}) => {
  const {url, category, setResult} = useContext(AppContext);
  const [questions, setQuestions] = useState(null);
  const [currQues, setCurrQues] = useState(null);
  const [loading, setLoading] = useState(null);
  const [answerLoaded, setAnswerLoaded] = useState({
    loaded: false,
    selectedAns: null,
    correctAns: null,
  });

  // console.log(questions);

  // fetch questions from api
  async function fetchQuestions() {
    setLoading(true);

    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data);

      if (data.response_code == 2) throw 'Failed';

      data.results.forEach(result => {
        result.options = Shuffle([
          ...result.incorrect_answers,
          result.correct_answer,
        ]);
      });

      setQuestions(data.results);
      setCurrQues(0);
    } catch (e) {
      console.log('Error', e);
      setQuestions(null);
      setCurrQues(0);
    }

    setLoading(false);
  }

  useEffect(() => {
    setResult({
      correct: 0,
      incorrect: 0,
      skipped: 0,
    });
    setAnswerLoaded({
      loaded: false,
      selectedAns: null,
      correctAns: null,
    });
    setQuestions(null);
    setCurrQues(0);
    fetchQuestions();

    // when user presses back in middle of quiz
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to End the quiz?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            setResult({
              correct: 0,
              incorrect: 0,
              skipped: 0,
            });
            navigation.navigate('Results');
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // checks the correct answer
  function loadAnswer(opt) {
    setAnswerLoaded({
      loaded: true,
      selectedAns: opt,
      correctAns: questions[currQues].correct_answer,
    });

    // result is incremented when ans is correct
    if (opt === questions[currQues].correct_answer) {
      setResult(prev => ({
        ...prev,
        correct: prev.correct + 1,
      }));
    } else {
      setResult(prev => ({
        ...prev,
        incorrect: prev.incorrect + 1,
      }));
    }
  }

  // loads next question
  function nextQuestion() {
    console.log(currQues, questions.length - 1);
    console.log('hello - 1');

    // handle skip situation
    if (!answerLoaded.loaded) {
      setResult(prev => ({
        ...prev,
        skipped: prev.skipped + 1,
      }));
    }

    if (currQues < questions.length - 1) {
      setCurrQues(prev => prev + 1);
      setAnswerLoaded({
        loaded: false,
        selectedAns: null,
        correctAns: null,
      });
    } else {
      console.log('hello - 2');
      navigation.navigate('Results');
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-blue">
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Image
            source={require('../src/assets/images/loader.gif')}
            className="w-32 h-32"
          />
        </View>
      ) : !questions ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-[Rubik-Medium] text-light">
            Something Went Wrong !
          </Text>
          <TouchableOpacity
            className="bg-yellow w-[180px] mx-auto p-3 rounded-lg mt-6"
            onPress={fetchQuestions}>
            <Text className="font-[Rubik-Regular] text-xl text-center text-dark ">
              Try Again!
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View className="w-[90%] mx-auto pt-6 pb-4 flex-row items-center relative border-b-[1px] border-b-gray">
            <View className="flex-1">
              <Text className="text-light font-[Rubik-SemiBold] text-xl text-center">
                {category.name}
              </Text>
            </View>
          </View>
          <View className="w-11/12 mx-auto justify-center my-10">
            <Text
              className={`font-[Rubik-Italic] text-center text-xl text-light`}>
              {decodeURIComponent(questions[currQues].question)}
            </Text>
          </View>
          <View className="w-11/12 mx-auto justify-center bg-[#fff] rounded-2xl space-y-4 py-6">
            {questions[currQues].options.map((option, indx) => {
              if (answerLoaded.loaded) {
                // answer is correct
                if (answerLoaded.selectedAns === answerLoaded.correctAns) {
                  return (
                    <TouchableOpacity
                      key={indx}
                      className={`w-11/12 mx-auto border-[1px] border-yellow p-3 ${
                        answerLoaded.correctAns === option && 'bg-[#86efac]'
                      } px-6 rounded-full`}>
                      <Text
                        className={`text-sm font-[Rubik-Regular] ${
                          answerLoaded.correctAns === option
                            ? 'text-[#166534]'
                            : 'text-dark'
                        }`}>
                        {decodeURIComponent(option)}
                      </Text>
                    </TouchableOpacity>
                  );
                }

                // answer is incorrect
                return (
                  <TouchableOpacity
                    key={indx}
                    className={`w-11/12 mx-auto border-[1px] border-yellow p-3 ${
                      answerLoaded.correctAns === option && 'bg-[#86efac]'
                    } ${
                      answerLoaded.selectedAns === option && 'bg-[#fca5a5]'
                    } px-6 rounded-full`}>
                    <Text
                      className={`text-sm font-[Rubik-Regular] text-dark ${
                        answerLoaded.correctAns === option && 'text-[#166534]'
                      } ${
                        answerLoaded.selectedAns === option && 'text-[#dc2626]'
                      }`}>
                      {decodeURIComponent(option)}
                    </Text>
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  key={indx}
                  onPress={() => loadAnswer(option)}
                  className="w-11/12 mx-auto border-[1px] border-yellow p-3 px-6 rounded-full">
                  <Text className="text-sm font-[Rubik-Regular] text-dark">
                    {decodeURIComponent(option)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View className="w-full my-10">
            <Text className="text-lg font-[Rubik-Regular] text-light text-center">
              {currQues + 1} of out {questions.length}
            </Text>
          </View>
          <View className="w-full items-center">
            <TouchableOpacity
              className="bg-[#fff] p-4 rounded-full"
              onPress={nextQuestion}>
              {answerLoaded.loaded ? (
                <AntIcon name="right" color="#166534" size={30} />
              ) : (
                <AntIcon name="close" color="#dc2626" size={30} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Quiz;
