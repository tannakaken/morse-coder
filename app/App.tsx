/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  useColorScheme,
  View,
} from 'react-native';

const darkColor = '#000000';
const lightColor = '#f3f3f3';

const App = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode ? darkColor : lightColor,
    }),
    [isDarkMode],
  );
  const textStyle = useMemo(
    () =>
      ({
        color: isDarkMode ? 'white' : 'black',
      } as StyleProp<TextStyle>),
    [isDarkMode],
  );
  const [text, setText] = useState('');

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={backgroundStyle}>
        <Text style={textStyle}>
          モールス信号にしたい文字列を入力してください。
        </Text>
        <TextInput value={text} onChangeText={setText} />
      </View>
    </SafeAreaView>
  );
};

export default App;
