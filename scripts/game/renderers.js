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


class Rect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      btnText: 'Welcome Home23'
    };

    //here we have actual index of box, constructor is called every time it's called
    this.whatAlready=whatAlready;
    whatAlready++;
  }
  //we have two boxes at every place. Additional one is for cover
  render() {
    const x = this.props.position[0] ; //because we get entitiesGlobal as props
    const y = this.props.position[1] ; //we signed this values in index.js
    return (
      <View>
        <View style={[styles.rect, { backgroundColor: coverColor, left: x, top: y }]} />
        <View style={[styles.rect, { opacity:getOpa(), backgroundColor: colors[getCol(this.whatAlready)], left: x, top: y }]} />
      </View>
    );
  }
}
let whatAlready=0;
getOpa = () => {
  return  this.opacityAll;  //uncovering box
}
this.opacityAll=0;
let colors = ["yellow","blue", "red", "pink", "green", "black", "white", "purple"] //variety of colors for our game
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
