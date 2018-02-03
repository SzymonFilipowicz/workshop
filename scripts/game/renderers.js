import React, { PureComponent } from "react";
import { StyleSheet, View, Dimensions } from "react-native";


this.howManyInRow=4;
this.HowManyInColumn=4;
this.marginGame=5;
this.yHeight = Dimensions.get('window').height;
this.xWidth = Dimensions.get('window').width;
this.boxWidth=this.xWidth/this.howManyInRow-2*marginGame;


const RADIUS = 20;
const X = this.boxWidth;
//X = 10;
let restartIndex = false;

class Rect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stop: false
    };

    if(restartIndex) {         // When flag is set up it means user re-entered to this view
      whatAlready=0;
      restartIndex=false;
    }
    
    //here we have actual index of box, constructor is called every time it's called
    this.whatAlready=whatAlready;
    whatAlready++;

    //here we avoid error with re-entering the game with clearing index
    if(whatAlready==(howManyInRow*HowManyInColumn)) { // We can't use 'this.' because it's pointg at component
      restartIndex= true;                             // we need to set up flag for next Rect call
    }
  }
  //we have two boxes at every place. Additional one is for cover
  render() {
    const x = this.props.position[0] ; //because we get entitiesGlobal as props
    const y = this.props.position[1] ; //we signed this values in index.js
    return (
      <View>
        <View style={[styles.rect, { backgroundColor: colors[getCol(this.whatAlready)], left: x, top: y }]} />
      </View>
    );
  }
}
let whatAlready=0;
getOpa = () => {
  return  this.opacityAll;  //uncovering box
}
this.opacityAll=0;
let colors = ["yellow","blue", "red", "pink", "green", "black", "white", "purple", "brown"] //variety of colors for our game
let coverColor="brown";                                     // color of cover boxes
const styles = StyleSheet.create({
  finger: {
    borderColor: "#CCC",
    borderWidth: 4,
    borderRadius: RADIUS * 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: "pink",
    position: "absolute"
  },
  rect: {
    borderColor: "#CCC",
    borderWidth: 4,
    width: X,
    height: X,
    backgroundColor: "pink",
    position: "absolute"
  }
});

export { Rect };
