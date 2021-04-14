import {RootState} from '@src/boot/rootState';
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import csStyles from './styles';
import {Colors} from '@src/styles/colors';

export default function InternetErrorComponent() {
  const {isConnected} = useSelector((state: RootState) => ({
    isConnected: state.network.isConnected,
  }));

  return !isConnected ? (
    <View style={csStyles.view_loading}>
      <View style={csStyles.viewContent}>
        <ActivityIndicator color={Colors.San_Marino} />
        <Text>Kết nối mạng ...</Text>
      </View>
    </View>
  ) : null;
}
