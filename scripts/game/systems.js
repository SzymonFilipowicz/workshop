let targetX = 0,
  targetY = 0;
let goBackX = 0,
  goBackY = 0;
let currentID = 0;


const MoveFinger = (entities, {
  touches
}) => {
  //filter every entry for press event
  touches.filter(t => t.type === "start").forEach(t => {
    //we need to recognize what box are we pressing
    targetX = Math.floor(touches[0].event.pageX / (this.boxWidth + this.marginGame * 2));
    targetY = Math.floor(touches[0].event.pageY / (this.boxWidth + this.marginGame * 2));
    currentID = targetX + targetY * howManyInRow;
    //we need to save position of box in case of false compare
    if (currentID < howManyInRow * HowManyInColumn) {
      goBackX = entities[currentID].position[0];
      goBackY = entities[currentID].position[1];
      this.opacityAll = 100;    //we are making visible the actual box
    }
  });
  //filter every entry for end pressing event
  touches.filter(t => t.type === "end").forEach(t => {
    let targetX2 = Math.floor(touches[0].event.pageX / (this.boxWidth + this.marginGame * 2));
    let targetY2 = Math.floor(touches[0].event.pageY / (this.boxWidth + this.marginGame * 2));
    checkedID = targetX2 + targetY2 * howManyInRow;

    //simple timeout to make sure user see chosen pair
    if (checkedID < howManyInRow * HowManyInColumn) { //be sure if not fire unnesesery
      setTimeout(function() {   //it will start after 1s.
        this.opacityAll = 0;
        entities[checkedID].position = [this.marginGame + targetX2 * this.boxWidth + ((this.marginGame * 2) * (targetX2)),
          this.marginGame + targetY2 * this.boxWidth + ((this.marginGame) * (targetY2))
        ];
        entities[currentID].position = [goBackX, goBackY];
      }, 1000);

      entities[checkedID].position = [this.marginGame + targetX2 * this.boxWidth + ((this.marginGame * 2) * (targetX2)),
        this.marginGame + targetY2 * this.boxWidth + ((this.marginGame) * (targetY2))
      ];
    }
    //atual check if player get it right
    if (currentID < howManyInRow * HowManyInColumn) {
      if (currentID != checkedID && entities[currentID]["pair"] == entities[checkedID]["pair"]) {
        //alert("pair!");
        entities[currentID].renderer = null;
        entities[checkedID].renderer = null;
      } else
        entities[currentID].position = [goBackX, goBackY];

    }
  });

  //filter every entry for moving event
  touches.filter(t => t.type === "move").forEach(t => {
    let finger = entities[currentID];     // Setting box to finger variable
    if (finger && finger.position) {      // filtering objects we want to move
      finger.position = [                 // setting up new position
        finger.position[0] + t.delta.pageX,
        finger.position[1] + t.delta.pageY
      ];
    }
  });

  return entities;
};

let stop = 0;

export {
  MoveFinger
}; //export without default
