import React from 'react';
import {
  ToastAndroid,
  View,
  Text,
  StyleSheet,
  Button,
  Picker,
  Slider
} from 'react-native';
import renderIf from './renderif';

//properties are only as var
var dialogueScrollMode = 1;
var characterLabelMode = 1; //0 off, 1 on without new line, 2 with new line
var startingID = 0; //id of first dialogue to pop up
var defaultX = 0, defaultY = 0; //default coordination for dialogue boxes or if no name provided

//you need to provide all data here
function loadAllDialogues() {
  this.allDialogues = [];
  this.charactersPosition = [];

  this.allDialogues[0] = require('../json/options.json');
  /* every dialogue here, increase index as well */

  this.charactersPosition["John"] = {x:1, y:2};
  this.charactersPosition["Bob"] = {x:50, y:20};
  /* set up character position by name */
}

this.currentDialogue = [];
this.currentSpeech = [];
let dialogueID=0;

function getNewDialogue(id) {
  return this.allDialogues[id];
}

class DialogueLayout extends React.Component {
  constructor(props) {
    super(props);

  //  this._handleAddButton = this._handleAddButton.bind(this);

    this.state = {
      optionsGraphic: [],
      value:0,  //if you remove this line it will sitll work but won't show value at first
      data: [],
      dialogueText: this.loadDialogueJson(),
    };

    //we can push values into states
    this.state.optionsGraphic.push({tittle:"FOV", key:0});
    this.state.optionsGraphic.push({tittle:"BLOOD", key:1});
    this.state.optionsGraphic.push({tittle:"BLUR", key:2});
  }

  //we can set up default values for arguments
  _handleAddButton(howMany=1, start=false) {
    let newly_added_data;
    //let textToAdd = "";   //we dont need to declare variables in js but we should
    for(let i=0; i<howMany; i++){
      let characterID = 0;
      if(start)
        textToAdd=this.currentSpeech.text;
      else {
        textToAdd=this.currentDialogue[this.currentSpeech.connections[i]].text;
        characterID=this.currentSpeech.connections[i];
      }

      let tempCoord = {x:defaultX, y:defaultY};
      if(this.currentDialogue[characterID].character) {
        let coordName = this.currentDialogue[characterID].character;
        if(charactersPosition[coordName]!=undefined)
          tempCoord = charactersPosition[coordName];

        switch(characterLabelMode) {
          case 1:
            textToAdd = coordName+": " + textToAdd;
            break;
          case 2:
            textToAdd = coordName+":\n " + textToAdd;
            break;
          default :
            break;
        }
      }

      newly_added_data = { key:dialogueID, x:tempCoord.x, y:tempCoord.y, title: textToAdd, content: 'new content goes here' };
      this.state.data.push(newly_added_data);
      dialogueID++;
    }

    this.setState({
        data: this.state.data
    });
  }

  _handleRemoveButton(key) {
      let result = this.state.data.filter( (data) => data.key !== key );
      this.setState({
          data: result,       // ',' at the end is NOT bringing error but can mislead
      });
  }

  cleanAllDialogueOptions() {
    dialogueID=0;
    this.state.data.length = 0
    this.setState({
        data: []
    });
  }

  endTalk() {
    data= [];
    speechID=-1;
    this.currentSpeech = this.currentDialogue[0];
  }

  goToNextSpeech(key) {
    if(speechID==-1 ) {
      speechID=0;

    }
    else {
      speechID=this.currentDialogue[speechID].connections[key];
    }

    this.currentSpeech = this.currentDialogue[speechID];
    this.cleanAllDialogueOptions();

    if(Array.isArray(this.currentSpeech.connections)==false)
    {
      this.currentSpeech.connections = this.currentSpeech.connections.split(',');
    }
    let tempLength = this.currentSpeech.connections.length;
    if(tempLength>0) {
      this._handleAddButton(tempLength-1);
      this.setState({dialogueText: this.currentSpeech.text});
    } else {
      this.setState({dialogueText: this.currentSpeech.text});
      this.endTalk();
    }
  }
  startDialogue = () => {      //call this function to start loaded dialogue
    this.cleanAllDialogueOptions();
    this.loadDialogueJson();
    if(dialogueScrollMode==0) {
      speechID=-1;
      this._handleAddButton(1, true); //1 because it is (true) starting speech
    } else {
      speechID=0;
      this._handleAddButton(this.currentSpeech.connections.length-1, false); //1 because it is (true) starting speech
    }
  }

  loadDialogueJson = ()  =>  {
    //we need to make sure we have current dialogue loaded
    if(!this.currentDialogue)
      loadAllDialogues();

    this.changeDialogueBase(startingID);
    this.currentSpeech = this.currentDialogue[0]; //0 is starting text
    if(Array.isArray(this.currentSpeech.connections)==false)
      this.currentSpeech.connections = this.currentSpeech.connections.split(',');

    return this.currentSpeech.text;
  }

  changeDialogueBase(id) {
      this.currentDialogue = getNewDialogue(id);
  }
  nativeFunc() {
    ToastAndroid.show("Hello Android", ToastAndroid.SHORT);
  }

  //we need to simulate variables as if we click option button
  goBackToOptions() {
    speechID=0; //option button is visible at first view
    this.goToNextSpeech(1); //and we click second button (option button)
  }

  render() {
    let added_buttons_goes_here = this.state.data.map( (data, index) => {
        return (
          <View style={{ left:data.x, top:data.y, width:"50%" }} key={data.key}>
            <Button style={{ flex:1, width:"50%" }}  key={data.key} title={data.title}
              onPress={ () => this.goToNextSpeech(data.key) } />
          </View>
        )
    });
    let options_button = this.state.optionsGraphic.map( (optionsGraphic, index) => {
        return (
          <View style={{ left:0, top:0, width:"50%" }} key={optionsGraphic.key}>
            <Button style={{ flex:1, width:"50%" }}  key={optionsGraphic.key} title={optionsGraphic.tittle}
              onPress={ () => this.nativeFunc() } />
            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
        )
    });
    return (
      <View style={{ flex: 1,   alignItems: 'center', width:"100%", backgroundColor: '#333333'}}>
          <View style={{ flex: 1,  width:"80%", backgroundColor: '#841584'}}>
            {added_buttons_goes_here}
            {renderIf(this.currentSpeech.text === "Graphic")(
              <View>
              {options_button}
              <Slider
                value={this.state.value}
                onValueChange={(value) => this.setState({value})} />
              <Text>Value: {this.state.value}</Text>
              <Button style={{ flex: 1}}
                title="back"
                onPress={() => this.goBackToOptions()}
              />
              </View>
            )}
            {/* we can merge both renderIf with View */}
          </View>
      <Text >
        {this.props.dialogueText}
        Dialogue text should be here
      </Text>

      <
      /* this is how we call action function from parent
      Button onPress = {
        this.props.action
      }*/
      Button onPress = {this.startDialogue}
      title = {this.state.dialogueText}
      color = "#841584"
      accessibilityLabel = "Start Dialogue" /
      >
      <
      /View>
    );
  }
}

const styles = StyleSheet.create({
  dialogueStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default DialogueLayout;
