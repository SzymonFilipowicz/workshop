import React from 'react';
import {
  ToastAndroid,
  View,
  Text,
  Button
} from 'react-native';
import DialogueLayout from '../scripts/dialogueLayout';
import TuringLayout from '../scripts/turing';

let stringToShow="Welcome Home23";
let goToNextBtnStr="Next Screen";
let dialogueData = "BBB";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnText: 'Simple test',
      status:true
    };
  }
  toggleStatus = () => {

    this.setState({
      status: !this.state.status
    });
    //toogleDialogue();
    dialogueData = "lololo"
  }
  btnClicked = () => {
    this.setState({btnText:"Clicked"});
    ToastAndroid.show("nice!", ToastAndroid.SHORT);      //some native functionality is already implemented on JS side
  }
  nextScreen = (navigate) => {                           //we need to pass navigate as argument
    goToNextBtnStr="Refreshed name";
    homeButtonClicked(navigate)                          //We call global function to navigate between screens
  }
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {
      navigate
    } = this.props.navigation;                           // We are assigning nav from properties to local variable

    /*
    Dialogue layout has action property called from child and send to child property 'dialogueText' with 'dialogueData'
    */
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <DialogueLayout style={{ flex: 1, height:90}} action={this.toggleStatus} dialogueText={dialogueData}/>
        <Button
          title={this.state.btnText}
          onPress={() =>
            this.btnClicked()
          }
        />
        <Button
          title={goToNextBtnStr}
          onPress={() =>
            this.nextScreen(navigate)
          }
        />
        <TuringLayout style={{flex: 1}}/>
      </View>
    );
  }
}
export default HomeScreen;
