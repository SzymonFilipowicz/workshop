# workshop
project used in workshop

How to :
1. If you didn't install React-Native yet, go to https://github.com/SzymonFilipowicz/reactNativeTutorial/blob/master/README.md
2. Set up SDK environment path properly in 'Android/local.properties'
3. Turn on emulator
4. Turn on project by typing (sudo is in case of error during connecting to emulator)
<pre><code>
npm install
sudo react-native run-android
</code></pre><br>

To do in practise branch :
1. Fix Turing machine (watch out it will break app, use double R)
2. Add unique components into Graphic option and fix 'back' buttons to properly lead
3. Prepare pair indexes for boxes in index.js
4. Make memory game actually show true colors

TURING (ZADANIE 1) :
	-zmiany na Y (37 linijka)
		stream = stream.substring(0, currentIndex) + 'Y' + stream.substring(currentIndex+1);
	-przejście przez poprzednie Y
		52 linijka:
			else if(currentLetter=='Y')
		62, 83,  linijka:
		 	|| currentLetter=='Y'

DIALOGUE.JS (ZADANIE 2) :
-renderif
	W 211 linijce można dodać coś w tym stylu:
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

INDEX.JS (ZADANIE 3 do linijki 22) :
	for(let i=0; i<numberOfColors; i++)
	{
		this.collection[i*2]=i;
		this.collection[i*2+1]=i;
	}
	shuffle(this.collection);

GŁÓWNE ZADANIE :
index.js :
	1. Zadeklaruj zmienne dla obu wybranych kwadratów (linijka 15)
	this.clicked = -1;                       
	this.clickedP = -1;

	2. Stwórz funkcje zwracającą odpowiedni kolor (linijka 24)
	getCol = (index) => {
	  if(index==clicked || index==clickedP)
	    return this.entitiesGlobal[index]["pair"];
	  else
	    return numberOfColors;    //this is last index of color collection
	}
system.js :
	3. Ustaw odpowiednie wartości w systems.js
		23 linijka:
			this.clicked = currentID;
		40 linijka:
			this.clickedP = checkedID;
renderer.js :
	4. Musimy zmienić style w View na dynamiczny background-color (45 linijka) :
		backgroundColor: colors[getCol(this.whatAlready)],

	5. Nadal nie działa poprawnie, czemu? (musimy zmienić state, ale dla czego dla pierwszego kwadratu nie? - bo zmieniamy jego stan pozycji)
		index.js (50 linijka) :
			this.entitiesGlobal[i]["refresh"]=false;
		systems.js :
			44 linijka :
				entities[checkedID].refresh = true;
			49 linijka :
				entities[checkedID].refresh = false;
