import React from 'react';
import {
  Platform,
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar
} from 'react-native';
import Communications from 'react-native-communications';
import { GameEngine } from "react-native-game-engine";

import { MoveFinger } from "../scripts/game/systems";

//this is global function used to make phone call from App
callMe = () => {
  Communications.phonecall(numberToCall, true);
}
let numberToCall = "2123";

// here we use GameEngine component
const Screen1 = () => (
  <GameEngine
      style={styles.container}    //using style from StyleSheet
      systems={[MoveFinger]}
      entities={entitiesGlobal}   // this is 'mapping like' entry
    >
    <StatusBar hidden={true} />
  </GameEngine>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});

export default Screen1;
