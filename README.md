workshop

project used in workshop

How to :

    If you didn't install React-Native yet, go to https://github.com/SzymonFilipowicz/reactNativeTutorial/blob/master/README.md
    Set up SDK environment path properly in 'Android/local.properties'
    Turn on emulator
    Turn on project by typing (sudo is in case of error during connecting to emulator)


npm install
sudo react-native run-android


To do in practise branch :

    Remove error from re-entering into game
    Remove coverage boxes in game
    Fix if clausule in Turing.js
    Fix collection creatinig for game in index.js
    Add action calling from child to parent to change layout into game
    Add some unique options component into Graphic dialogue

Solve :

    Error appears because we have index of every box stored in local variable (this.whatAlready=whatAlready). Because react is calling constructor function every time it's rebuild, we need to zero our index every time we finish constructing all boxes. To do this, add at the end of Rect constructor function code below :


  if(whatAlready==(howManyInRow*HowManyInColumn))  // We can't use 'this.' because it's pointg at component
      restartIndex= true;                             // we need to set up flag for next Rect call

Code above is setting flag every time we reach maximum number of boxes on the screen. Next thing to do is zero our counter at the beggining of constructor.


  if(restartIndex) {         // When flag is set up it means user re-entered to this view
      whatAlready=0;
      restartIndex=false;
  }



    Add 'brown' color at the end of colors collection in renderer.js. Next thing we can do is add two flags (because only two boxes can show theyre two colors at the same time) into index.js (where our getCol function take place)


this.clicked = -1;                       
this.clickedP = -1;

These will point index of boxes we want to see. To do this we need to set up proper value every time we interact with any box First flag need to be set up when we starting press any box, so add tihs after 'currentID' is known in 'touches.filter(t => t.type === "start").forEach(t => {})' in systems.js


  this.clicked = currentID; 

And 2nd flag need to be when we stop pressing screen after checkedID is calculeted in 'touches.filter(t => t.type === "end").forEach(t => {})'

this.clickedP = checkedID;

If we have this, we just need to configure getCol function to properly return variables


  getCol = (index) => {
  if(index==clicked || index==clickedP)
    return this.entitiesGlobal[index]["pair"];
  else
    return numberOfColors;    //this is last index of color collection
}

After that we can just remove coverage boxes in layout and remove opacity property from boxes.

6. Firstly we need to add another mapped component. First declare new array as state

Then add new mapped component as new variable


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
            

Next, create renderif file as follow


'use strict';
const isFunction = input => typeof input === 'function';
export default predicate => elemOrThunk =>
  predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null;
        

Then use it in render section of DialogueLayout


{renderIf(this.currentSpeech.text === "Graphic")(
              options_button
)}
{renderIf(this.currentSpeech.text === "Graphic")(
    	<Button style={{ flex: 1}}
        title="back"
        onPress={this.startDialogue}
    />
)}

As final touch, add code above at the beggining of 'startDialogue' function


  this.loadDialogueJson();
  
