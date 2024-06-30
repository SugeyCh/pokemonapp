import React from 'react';
import { View, StyleSheet } from 'react-native';
import Pokeball from '@/components/Pokeball'
import { styles } from '@/styles/appStyles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Pokeball />
    </View>
  );
};

export default HomeScreen;