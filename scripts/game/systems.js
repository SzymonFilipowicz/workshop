let targetX = 0,
  targetY = 0;
let goBackX = 0,
  goBackY = 0;
let currentID = 0;

let allowClick = true;

function calculateBoxFromCoord(pageX, pageY) {
  targetX = Math.floor(pageX / (this.boxWidth + this.marginGame * 2));
  targetY = Math.floor(pageY / (this.boxWidth + this.marginGame * 2));
  return (targetX + targetY * howManyInRow);
}

const MoveFinger = (entities, {touches}) => {
  //filter every entry for press event
  touches.filter(t => t.type === "start").forEach(t => {
    //we need to block clicking as long as two colors are visible
    if (allowClick) {
      //we need to recognize what box are we pressing
      currentID = calculateBoxFromCoord(touches[0].event.pageX, touches[0].event.pageY);
      //we set up clicked index to show up
      this.clicked = currentID;

      //we need to save position of box in case of false compare
      if (currentID < howManyInRow * HowManyInColumn) {
        goBackX = entities[currentID].position[0];
        goBackY = entities[currentID].position[1];
      }
    }
  });
  //filter every entry for end pressing event
  touches.filter(t => t.type === "end").forEach(t => {
    if (allowClick && currentID>=0 && currentID<howManyInRow * HowManyInColumn) { //check if game should react on end of click
      allowClick = false;             //we can block clicking here

      checkedID = calculateBoxFromCoord(touches[0].event.pageX, touches[0].event.pageY);

      //we set up new index to show up
      this.clickedP = checkedID;

      //simple timeout to make sure user see chosen pair
      if (checkedID < howManyInRow * HowManyInColumn) { //be sure 'if' won't fire unnesesery
        entities[checkedID].refresh = true;  //we need to change any parameter to refresh object

        setTimeout(function() { //it will start after 1s.
          this.clickedP = this.clicked = -1;

          entities[checkedID].refresh = false;
          entities[currentID].position = [goBackX, goBackY];

          currentID = checkedID = -1;
          allowClick = true;
        }, 1000);

      } else {
        this.clickedP = this.clicked = -1;
        allowClick = true;
      }
      //atual check if player get it right
      if (currentID < howManyInRow * HowManyInColumn) {
        if (checkedID >= 0 && checkedID < howManyInRow * HowManyInColumn && currentID != checkedID && entities[currentID]["pair"] == entities[checkedID]["pair"]) {
          //alert("pair!");
          entities[currentID].renderer = null;
          entities[checkedID].renderer = null;
        } else
          entities[currentID].position = [goBackX, goBackY];

        }
      }
  });

  //filter every entry for moving event
  touches.filter(t => t.type === "move").forEach(t => {
    if (allowClick) {

      let finger = entities[currentID]; // Setting box to finger variable
      if (finger && finger.position) { // filtering objects we want to move
        finger.position = [
          // setting up new position
          finger.position[0] + t.delta.pageX,
          finger.position[1] + t.delta.pageY
        ];
      }
    }
  });
  return entities;  //we need to return entities to refresh screen when system starts
};

export {
  MoveFinger
}; //export without default
