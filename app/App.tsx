/**
 * メイン画面
 */

import React, {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  useColorScheme,
  View,
} from 'react-native';
import Torch from 'react-native-torch';
import {
  BETWEEN_DURATION_MILLISECONDS as MORSE_BETWEEN_MILLISECONDS,
  DAH,
  DIT,
  MORSE_LONG_MILLISECONDS,
  MORSE_UNIT_MILLISECONDS,
  stringToMorse,
} from './helpers/morse.helper';
import {THROWED_CANCEL, sleep} from './helpers/time.helper';

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
  const [hasError, setHasError] = useState(false);
  const onChangeText = useCallback((newText: string) => {
    setText(newText);
    setHasError(stringToMorse(newText) === null);
  }, []);
  const lighting = useMemo(
    () => ({
      is: true,
    }),
    [],
  );
  const [showModal, setShowModal] = useState(false);
  const checkAndsleep = useCallback(
    async (mulliseconds: number) => {
      if (!lighting.is) {
        throw THROWED_CANCEL;
      }
      await sleep(mulliseconds);
      if (!lighting.is) {
        throw THROWED_CANCEL;
      }
    },
    [lighting],
  );

  const light = useCallback(async () => {
    const seq = stringToMorse(text);
    if (seq === null) {
      return;
    }
    lighting.is = true;
    setShowModal(true);
    try {
      for (const morseChar of seq) {
        for (const atom of morseChar) {
          Torch.switchState(true);
          if (atom === DIT) {
            await checkAndsleep(MORSE_LONG_MILLISECONDS);
          } else if (atom === DAH) {
            await checkAndsleep(MORSE_UNIT_MILLISECONDS);
          }
          Torch.switchState(false);
          await checkAndsleep(MORSE_UNIT_MILLISECONDS);
        }
        await checkAndsleep(MORSE_BETWEEN_MILLISECONDS);
      }
    } catch (error) {
      if (error !== THROWED_CANCEL) {
        throw error;
      }
    } finally {
      Torch.switchState(false);
      setShowModal(false);
    }
  }, [text, lighting, checkAndsleep]);
  const cancel = useCallback(() => {
    lighting.is = false;
  }, [lighting]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={backgroundStyle}>
        <View style={styles.container}>
          <Text style={textStyle}>
            モールス信号にしたい文字列を入力してください。
          </Text>
          <Text style={textStyle}>（現在は英数字しか送信できません）</Text>
          <TextInput
            value={text}
            onChangeText={onChangeText}
            style={styles.textInput}
          />
          {hasError && (
            <Text style={styles.errorText}>
              送信できない文字が含まれています。
            </Text>
          )}
          {!hasError && (
            <Pressable onPress={light} style={styles.button}>
              <Text style={styles.buttonText}>送信</Text>
            </Pressable>
          )}
        </View>
      </View>
      <Modal visible={showModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text>送信中</Text>
            <ActivityIndicator color="#1DA1F2" style={styles.indicator} />
            <Pressable onPress={cancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>キャンセル</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingTop: '10%',
    paddingBottom: '10%',
  },
  textInput: {
    flex: 2,
    backgroundColor: 'ghostwhite',
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 5,
    textAlignVertical: 'top',
  },
  button: {
    width: '80%',
    backgroundColor: '#1DA1F2',
    padding: 5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  errorText: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cancelButton: {
    width: '80%',
    backgroundColor: 'white',
    borderColor: '#1DA1F2',
    borderWidth: 1,
    padding: 5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: '#1DA1F2',
  },
  indicator: {
    margin: 5,
  },
});

export default App;
