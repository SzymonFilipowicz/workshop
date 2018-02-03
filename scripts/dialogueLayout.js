import React from 'react';
import {
  ToastAndroid,
  View,
  Text,
    StyleSheet,
  Button
} from 'react-native';

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

    this._handleAddButton = this._handleAddButton.bind(this);

    this.state = {
      data: [],
      dialogueText: this.loadDialogueJson(),
      speechID: -1
    };

    //TUTAJ ZMIEN TRYB NA NIE AUTOMATYCZNE ODPOWIEDZI

  }


  _handleAddButton(howMany=1, start=false) {

    let newly_added_data;
    let textToAdd = "";
    //alert(howMany+" vs "+this.currentSpeech.connections.length+" vs "+this.currentSpeech.connections);
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
        let coordName = this.currentDialogue[characterID].character;//this.currentDialogue[characterID].character;
      //  alert(characterID+" vs "+this.currentDialogue[characterID].character);
        if(charactersPosition[coordName]!=undefined)
          tempCoord = charactersPosition[coordName];
        /*if(tempCoord==undefined) {
          tempCoord.x = defaultX;
          tempCoord.y = defaultY;
        }*/
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
      /*  if(characterLabelMode==1) {
          textToAdd = coordName+":\n " + textToAdd;
        }*/
      }
    //  alert(charactersPosition[coordName]);
//alert(tempCoord.x);


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
          data: result,
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
        alert('b');
    }
    else
      speechID=this.currentDialogue[speechID].connections[key];

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
  startDialogue = ()  =>   {
    if(dialogueScrollMode==0) {
      speechID=-1;
      this._handleAddButton(1, true); //1 because it is (true) starting speech
    } else {
      speechID=0;
      this._handleAddButton(this.currentSpeech.connections.length-1, false); //1 because it is (true) starting speech
    }
    //alert('c');
    //call this function to start loaded dialogue
      }

  loadDialogueJson = ()  =>  {

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


  render() {
    let added_buttons_goes_here = this.state.data.map( (data, index) => {
        return (
          <View style={{ left:data.x, top:data.y, width:"50%" }} key={data.key}>
            <Button style={{ flex:1, width:"50%" }}  key={data.key} title={data.title}
              onPress={ () => this.goToNextSpeech(data.key) } />
          </View>
        )
    });
    let options_button = this.state.data.map( (data, index) => {
        return (
          <View style={{ left:data.x, top:data.y, width:"50%" }} key={data.key}>
            <Button style={{ flex:1, width:"50%" }}  key={data.key} title={data.title}
              onPress={ () => this.goToNextSpeech(data.key) } />
          </View>
        )
    });

    return ( <
      View style={{ flex: 1,   alignItems: 'center', width:"100%", backgroundColor: '#333333'}}>
          <View style={{ flex: 1,  width:"80%", backgroundColor: '#841584'}}>
            {added_buttons_goes_here}
          </View>
      <Text >
      {this.props.dialogueText}
      Dialogue text should be here <
      /Text>

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
