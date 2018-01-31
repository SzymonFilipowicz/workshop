import React, { PureComponent } from "react";
import { Text, StyleSheet, View, Dimensions, Button } from "react-native";

/* a^n b^2n c^3n */
let goToNextBtnStr = "Start";
let endStatus = 7;               // what state is final
let currentState=0;              // we start at state 0
let currentLetter = 'X';         // starting from X but doesn't really matter
let currentIndex=0;              // index we are at in the word

/* some example words to be or not to be accepted */
let stream = "abcaabcaX";        // no
stream = "aabbbbccccccX";        // yes
stream = "abbcccX";              // yes
stream = "abccX";                // no
stream = "aabbbbcccccX";         // no

class TuringLayout extends PureComponent {
  // use to start checking your word
  startMoving = () => {
    //machine will simulate as long as we break it or reach final state
    while(currentState!=endStatus && currentState!=-1) {
        currentState=this.goNext();
    }

    //accepted stream has now form of Y^6n
    if(currentState==endStatus) {
      alert("win "+stream);
    } else {
      alert("lose "+stream);
    }

  }

  // walking thru word and changing state according to actual state and letter
  goNext = () => {
    currentLetter = stream[currentIndex];   // setting current letter from our word
    switch(currentState) {
      case 0 :                              // we are at state 0
        if(currentLetter=='a') {            // in state 0 we get 'a'
          /* because string in JS is inmutable we need to create new one!
             We are changing letter 'a' into 'Y' (can be whatever, but same
             across all machine) and moving into another state (1)
          */
          stream = stream.substring(0, currentIndex) + 'Y' + stream.substring(currentIndex+1);
          currentIndex++;                   // We chacked current letter so we can increase index
          return 1;                         // We accept this situation and changing to state 1
        } else if(currentLetter=='Y') {     // If it's not the first iteration,
          currentIndex++;                   // we need to move thru 'Y' that were 'a' before
          return 0;                         // We still need to find 'a'
        } else if(currentLetter=='X') {     // When we reached 'X' it means the word was empty
          return endStatus;                 // so cool (n=0) or we changed all letters to 'Y' correctly
        } else {
          return -1;                        // if we get anything else word is wrong (-1 will break machine)
        }
        break;
      case 1 :                              // We are at state 1 (looking for 'b')
        if(currentLetter=='a' || currentLetter=='Y') {  //going thru future 'a' and 'Y' that was 'b' before
          currentIndex++;
          return 1;
        } else if(currentLetter=='b') {     //changing first 'b'
          stream =  stream.substring(0, currentIndex) + 'Y' + stream.substring(currentIndex+1);
          currentIndex++;
          return 2;                         //changing to state 2 where we will look for 2nd 'b'
        } else {
          return -1;
        }
        break;
      case 2 :
        if(currentLetter=='b') {            //changing 2nd 'b'
          stream =  stream.substring(0, currentIndex) + 'Y' + stream.substring(currentIndex+1);
          currentIndex++;
          return 3;                         //now we need to find three 'c'
        } else {
          return -1;
        }
        break;
      case 3 :
        if(currentLetter=='b' || currentLetter=='Y') {  //going thru 'b' and 'Y'
          currentIndex++;
          return 3;
        } else if(currentLetter=='c') {                 //changing first 'c'
          stream =  stream.substring(0, currentIndex) + 'Y' + stream.substring(currentIndex+1);
          currentIndex++;
          return 4;
        } else {
          return -1;
        }
        break;
      case 4 :
        if(currentLetter=='c') {                        //changing 2nd 'c'
          stream =  stream.substring(0, currentIndex) + 'Y' + stream.substring(currentIndex+1);
          currentIndex++;
          return 5;
        } else {
          return -1;
        }
        break;
      case 5 :
        if(currentLetter=='c') {                       //changing 3rd 'c'
          stream =  stream.substring(0, currentIndex) + 'Y' + stream.substring(currentIndex+1);
          currentIndex++;
          return 6;
        } else {
          return -1;
        }
        break;
      case 6 :                                        // If we changed 3rd 'c' we can go
        currentIndex = 0;                             // at start of the word and do all again
        return 0;
        break;
      default :
        break;
    }
    return -1;
  }

  render() {
    return (
      <View>
      <Button
        title={goToNextBtnStr}      // react brackets!
        onPress={() =>
          this.startMoving()        // Start checking word in 'stream' variable
        }
      />
      </View>
    );
  }
}

export default TuringLayout;        // Export TuringLayout as default
