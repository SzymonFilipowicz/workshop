import { AppRegistry } from 'react-native';
import App from './App';

import React, { Component } from 'react';
import { Rect } from "./scripts/game/renderers";
import { MoveFinger } from "./scripts/game/systems";
var shuffle = require('shuffle-array');             //will shuffle memory boxes

AppRegistry.registerComponent('Workshop', () => App);   //we actually start App here

homeButtonClicked = (navigate) => {                     // this function is global
  navigate('Screen1')                                   // that way we can handle navigator
};                                                      // from one file



//creating collection of memory boxes. In one iteration we create two matching boxes
/* creating mix collection that recognize boxes color goes here */

getCol = (index) => {
  return   this.entitiesGlobal[index]["pair"];
}

//we are creating objects used to present memory boxes
this.entitiesGlobal = new Object();
let addTop=0;
let x=0, y=0;
for(let i=0; i<this.HowManyInColumn*this.howManyInRow; i++) {

  x=this.marginGame+(this.boxWidth+2*this.marginGame)*(i%this.howManyInRow);
  if(i%this.howManyInRow==0 && i>0) {
    y+=this.boxWidth+this.marginGame;
  }

  this.entitiesGlobal[i] = new Object();
  this.entitiesGlobal[i]["id"]=i;
  this.entitiesGlobal[i]["pair"]=this.collection[i];
  this.entitiesGlobal[i]["renderer"]=Rect;    //here we point what kind of layout to render

  this.entitiesGlobal[i]["position"]=new Object();
  this.entitiesGlobal[i]["position"][0]=x;
  this.entitiesGlobal[i]["position"][1]=this.marginGame+y;


}
