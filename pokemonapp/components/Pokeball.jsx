import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native';
import LoginForm from './LoginForm';

const colors = {
  bodyBackground: 'rgba(209, 209, 209, 0.358)',
  white: '#F6F7F8',
  red: '#EF4144',
  greyDark: '#302D2D',
};

class Pokeball extends Component {
  state = {
    pokeballOpen: false,
    fadeInAnim: new Animated.Value(0),
    lightOpacity: new Animated.Value(0),
  };

  togglePokeball = () => {
    const { pokeballOpen, fadeInAnim } = this.state;

    if (!pokeballOpen) {
      this.setState({ pokeballOpen: true }, () => {
        Animated.timing(fadeInAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      });
    } else {
      this.closePokeball();
    }
  };

  closePokeball = () => {
    const { fadeInAnim } = this.state;

    Animated.timing(fadeInAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ pokeballOpen: false });
    });
  };

  handleOutsidePress = () => {
    const { pokeballOpen } = this.state;

    if (pokeballOpen) {
      this.closePokeball();
    }
  };

  startLightAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.lightOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.lightOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.startLightAnimation(); // Inicia la animación constantemente
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { pokeballOpen, fadeInAnim, lightOpacity } = this.state;

    return (
      <TouchableWithoutFeedback onPress={this.handleOutsidePress}>
        <View style={styles.app}>
          <TouchableOpacity
            style={[styles.pokeball, pokeballOpen && styles.pokeballOpen]}
            onPress={this.togglePokeball}
          >
            <View style={pokeballOpen ? styles.pokeballOpenDivider : styles.pokeballDivider}></View>
            <Animated.View
              style={[
                styles.pokeballCircle,
                !pokeballOpen && { top: '50%' },
                pokeballOpen && styles.pokeballOpenCircle,
              ]}
            ></Animated.View>
            <Animated.View
              style={[
                styles.pokeballInnerCircle,
                pokeballOpen && styles.pokeballOpenInnerCircle,
                { opacity: lightOpacity },
              ]}
            ></Animated.View>
          </TouchableOpacity>

          {pokeballOpen && (
            <Animated.View style={[styles.pokedexContainer, { opacity: fadeInAnim }]}>
              <LoginForm />
            </Animated.View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokeball: {
    width: 220,
    height: 200,
    backgroundColor: colors.red,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  pokeballDivider: {
    width: '100%',
    height: 30,
    backgroundColor: colors.greyDark,
  },
  pokeballOpen: {
    width: 255,
    height: 470,
  },
  pokeballOpenDivider: {
    width: '100%',
    height: 325,
    backgroundColor: '#fffffff1',
  },
  pokeballCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: colors.greyDark,
    backgroundColor: colors.white,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  pokeballOpenCircle: {
    top: '10%',
    left: '50%',
    transform: [{ translateX: -25 }],
  },
  pokeballInnerCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ef4144ac',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  pokeballOpenInnerCircle: {
    top: '15.4%',
  },
  pokedexContainer: {
    position: 'absolute',
    top: 100,
    width: '100%',
    height: '80%',
    alignItems: 'center',
  },
});

export default Pokeball;