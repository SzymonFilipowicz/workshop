# workshop
project used in workshop

How to :
1. If you didn't install React-Native yet, go to https://github.com/SzymonFilipowicz/reactNativeTutorial/blob/master/README.md
2. Set up SDK environment path properly in 'Android/local.properties'
3. Turn on emulator
4. Turn on project by typing (sudo is in case of error during connecting to emulator)
<code>
npm install
sudo react-native run-android
</code><br><br><br>

To do in practise branch :
1. Remove error from re-entering into game
2. Remove coverage boxes in game
3. Fix if clausule in Turing.js
4. Fix collection creatinig for game in index.js
5. Add action calling from child to parent to change layout into game
6. Add some unique options component into Graphic dialogue 

Solve :
1. Error appears because we have index of every box stored in local variable (this.whatAlready=whatAlready).
Because react is calling constructor function every time it's rebuild, we need to zero our index every time we finish constructing all boxes. To do this, add at the end of Rect constructor function code below :
<code>
  if(whatAlready==(howManyInRow*HowManyInColumn))  // We can't use 'this.' because it's pointg at component
      restartIndex= true;                             // we need to set up flag for next Rect call
</code>
Code above is setting flag every time we reach maximum number of boxes on the screen. Next thing to do is zero our counter at the beggining of constructor. 
<code>
  if(restartIndex) {         // When flag is set up it means user re-entered to this view
      whatAlready=0;
      restartIndex=false;
  }
</code><br><br>
2. Add 'brown' color to colors collection in renderer.js.
Next thing we can do is add two flags (because only two boxes can show theyre two colors at the same time) into index.js (where our getCol function take place)
<code>
  this.clicked = -1;
  this.clickedP = -1;
  </code>

These will point index of boxes we want to see. To do this we need to set up proper value every time we interact with any box 
First flag need to be set up when we starting press any box, so add tihs after 'currentID' is known in
'touches.filter(t => t.type === "start").forEach(t => {})'
<code>
  this.clicked = currentID; //add this to the </code>
And 2nd flag need to be when we stop pressing screen after checkedID is calculeted in 'touches.filter(t => t.type === "end").forEach(t => {})'
<code>this.clickedP = checkedID;</code>
If we have this, we just need to configure getCol function to properly return variables :
<code>
  getCol = (index) => {
  if(index==clicked || index==clickedP)
    return this.entitiesGlobal[index]["pair"];
  else
    return numberOfColors;    //this is last index of color collection
}
</code>
After that we can just remove coverage boxes in layout and remove opacity property from boxes. 
