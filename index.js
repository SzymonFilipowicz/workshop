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

this.clicked = this.clickedP = -1;

/* we don't need to point at 'this' because it's default pointer across all documents
  when we are out of component */
let numberOfColors = (this.howManyInRow*HowManyInColumn)/2;
//creating collection of memory boxes. In one iteration we create two matching boxes
this.collection = [];
for(let i=0; i<numberOfColors; i++)
{
  this.collection[i*2]=i;
  this.collection[i*2+1]=i;
}
shuffle(this.collection);

getCol = (index) => {
  if(index==clicked || index==clickedP)
    return this.entitiesGlobal[index]["pair"];
  else
    return numberOfColors;    //this is last index of color collection
}

//we are creating objects used to present memory boxes
this.entitiesGlobal = new Object(); // this needs to be object, so can be {} as well
let addTop=0;
let x=0, y=0;
for(let i=0; i<this.HowManyInColumn*this.howManyInRow; i++) {
  x=this.marginGame+(this.boxWidth+2*this.marginGame)*(i%this.howManyInRow);
  if(i%this.howManyInRow==0 && i>0) {
    y+=this.boxWidth+this.marginGame;
  }

  this.entitiesGlobal[i] = new Object(); // can be [], {} as well
  this.entitiesGlobal[i]["id"]=i;
  this.entitiesGlobal[i]["pair"]=this.collection[i];
  this.entitiesGlobal[i]["renderer"]=Rect;    //here we point what kind of component render

  this.entitiesGlobal[i]["position"]={};  //can be new Object() or [] as well
  this.entitiesGlobal[i]["position"][0]=x;
  this.entitiesGlobal[i]["position"][1]=this.marginGame+y;

  this.entitiesGlobal[i]["refresh"]=false;
}
