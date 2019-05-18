//--------------------------------
//-----app object name space------
//--------------------------------
const torontoIpsumApp = {};

//------------------------------------------------
//-------define word library to draw from---------
//------------------------------------------------
torontoIpsumApp.wordLibrary = [`Finch`, `North York Center`, `Sheppard`, `York Mills`, `Lawrence`, `Eglinton`, `Davisville`, `St Clair`, `Summerhill`, `Rosedale`, `Bloor`, `Wellesley`, `College`, `Dundas`, `Queen`, `King`, `Union`, `St Andrew`, `Osgoode`, `St Patrick`, `Museum`, `St George`, `Spadina`, `Dupont`, `Glencairn`, `Yorkdale`, `Wilson`, `Downsview`, `Kipling`, `Islington`, `Royal York`, `Old Mill`, `Jane`, `Runnymede`, `High Park`, `Keele`, `Lansdowne`, `Dufferin`, `Ossington`, `Christie`, `Bathurst`, `Bay`, `Sherbourne`, `Castle Frank`, `Broadview`, `Chester`, `Pape`, `Donlands`, `Greenwood`, `Coxwell`, `Woodbine`, `Main Street`, `Victoria Park`, `Warden`, `Kennedy`, `Ellesmere`, `Midland`, `STC`, `Bayview`, `Bessarion`, `Leslie`, `Don Mills`, `McCowan`,

`Skydome`, `Blue Jays`, `Rogers center`, `Joe Carter`, `Roberto Alomar`, `Jose Bautista`, `Carlos Delgado`, `Roy Halladay`, `ACC`, `Vince Carter`, `Curtis Joseph` ,`DeMar DeRozan`, `Kyle Lowry`, `Kawhi Leonard`, `Maple Leaf Gardens`, `Mats Sundin`, `Darryl Sittler`, `Doug Gilmour`, `Borje Salming`, `Wendel Clark`, `Penny Oleksiak`, `Rosie Maclennan`, `Michelle Williams`, `Silken Laumann`, `Heather Moyse`, `Phylicia George`,

`CN tower`, `Steamwhistle brewery`, `Queens quay`, `Wonderland`, `Ontario place`, `CNE`,

`Cabbagetown`, `Corktown`, `Leslieville`, `The beaches`, `Sunnyside`, `Junction`, `Annex`, `Koreatown`, `North York`, `Etobicoke`, `Scarborough`, `East York`, `Toronto`, `Ward's Island`, `Center Island`, `Centerville`, `Olympic Island`, `Riverdale`, `Kensington Market`, `Chinatown`, `Guildwood`, `Harbourfront`, `Queensway`, `Richview`, `Ledbury Park`, `Graydon Hall`, `Riverside`, `Woodbridge`, `Christie pits`, `Allan Gardens`, `Casa Loma`, `Baldwin village`, `Bloorcourt`, `Leaside`, `Bloordale`, `Brockton`, `Church Wellsely Village`, `Cityplace`, `Little Italy`, `Little Portugal`, `Greektown`, `Danforth`, `Davenport`, `Distillery District`, `Dovercourt`, `East Chinatown`, `Forest Hill`, `Harbord Village`, `Keelesdale`, `King East`, `King West`, `Liberty Village`, `Little India`, `Little Tokyo`, `Markham`, `Mississauga`, `Moss Park`, `Mount Pleasant`, `Oakwood Village`, `Port Lands`, `Regent Park`, `Richmond Hill`, `Roncesvalles`, `St James Town`, `St Lawrence Market`, `Stockyards`, `Thorncliffe park`, `Thornhill`, `Vaughn`, `Weston`, `Woodbridge`, `Yorkville`, `Yonge`,

`U of T`, `Ryerson`, `York`, `Humber`, `Centennial`, `George Brown`, `Seneca`,

`Trash panda`, `wasteman`, `bless`, `amped`, `ahlie`, `come thru`, `cyattie`, `deafaz`, `differently`, `fam`, `fom`, `greezy`, `merked`, `lowe`, `lowkey`, `nice`, `regulate`, `snake`, `styll`, `blem`, `beat`, `cheesed`, `extra`, `gassed`, `lit`, `sus`, `ting`, `sweetersman`, `preeing`, `tun up`, `top left`, `szeen`, `sav`,`marved`, `mossin`, `gheez`, `bout it`, `arms`, `waste yute`, `make moves`, `nize it`, `yutes`, `the 6ix`, `905`, `416`, `flex`, `cop`, `scoop`, `sauga`,
`Drake`, `Massey Hall`, `Roy Thompson Hall`, `The Weeknd`];

//----------------------------------------
//---------jquery DOM references----------
//----------------------------------------
torontoIpsumApp.$paragraphSizeSlider = $(`#paragraph-size`);
torontoIpsumApp.$numParaSlider = $(`#paragraph-num`);
torontoIpsumApp.$sliderValueDisplay = $(`.slider-value`);
torontoIpsumApp.$paraNumSliderDisplay = $(`.num-paras-disp`)
torontoIpsumApp.$generatedOutput = $(`.generated-output`);


//--------------------------------------------
//-------------variables----------------------
//--------------------------------------------
//used in MVP, disused currently
// torontoIpsumApp.wordsPerSentence = 5;

torontoIpsumApp.numOfSentences;
torontoIpsumApp.minWordsPerSent = 3;
torontoIpsumApp.maxWordsPerSent = 7;
torontoIpsumApp.generatedString = ``;
//store past/current randomIndex in object, instead of constantly passing it as an argument
torontoIpsumApp.randomIndex;

//-----------------------------------------------------------
//---------Ye olde functions for doin thangs-----------------
//-----------------------------------------------------------

//returns argument string with only the first letter capitalized
 torontoIpsumApp.makeCapitalized = function(ourString){
    return ourString.charAt(0).toUpperCase() + ourString.slice(1).toLowerCase();
};

//returns a random integer x such that: min <= x < max
torontoIpsumApp.randomNumRange = function(min, max) {
    const interval = max - min;
    return Math.floor(Math.random() * interval) + min;
};

//returns a random word from the word library, 
//if wordPosition = 0 capitalize it
torontoIpsumApp.randomWord = function(wordPosition) {
    //get a random index for word library that's different from randNum in object
    const randNum = this.noRepeatRandNum();
    //use let because we're modifying the word based on where it is in a sentence
    let newWord = this.wordLibrary[randNum];
    
    //Capitalize word if it's first in sentence, otherwise lowercase
    if (wordPosition === 0) {
        newWord = this.makeCapitalized(newWord);
    } else {
        newWord = newWord.toLowerCase();
    }
    return newWord;
}

//returns a randomm number that is not the same as randomIndex in namespace object
torontoIpsumApp.noRepeatRandNum = function() {
    //use let because we might reassign newRandomNum
    let newRandomNum = this.randomNumRange(0, this.wordLibrary.length);
    //while new random number is equal to randNum in object
    while (newRandomNum === this.randomIndex) {
        newRandomNum = this.randomNumRange(0, this.wordLibrary.length);
    }
    return newRandomNum;
};

//builds up sentences in generatedOutput string in namespace object
//repeats randomWord() in a loop randomly between minWordsPerSent and maxWordsPerSent times 
torontoIpsumApp.putWordsInSentence = function() {
    //generate 5 random words and concatenate them to make a sentence
    //+1 to max since the range is not inclusive at the top end
    const randNumWords = this.randomNumRange(this.minWordsPerSent, this.maxWordsPerSent + 1);
   
    for (let i = 0; i < randNumWords; i++) {
        //pick a new word that isn't the same as previous word
        const wordToAdd = this.randomWord(i);

        //concatenate new word to ongoing generated string
        torontoIpsumApp.generatedString = torontoIpsumApp.generatedString + ` ` + wordToAdd;
        //If last word in a sentence add a period
        if (i === randNumWords - 1) {
            torontoIpsumApp.generatedString = torontoIpsumApp.generatedString + `.`;
        }
    }
};

//build up paragraph(s) in generatedOutput string in namespace object
//repeats putWordsInSentence() in a loop
torontoIpsumApp.buildParagraph = function() {
    //create string we want to concatenate onto
    torontoIpsumApp.generatedString += `<p>`;

    //for the number of sentences
    for (let i = 0; i < torontoIpsumApp.numOfSentences; i++) {
        torontoIpsumApp.putWordsInSentence();
    }
    //close </p> tag on generated string
    torontoIpsumApp.generatedString += `</p>`;
};


//build up multiple paragraphs
//repeats buildUpParagraph() in a loop
//called in generate button event handler
torontoIpsumApp.multipleParagraphs = function(numParagraphs) {
    //clear generated string each time generate button is pushed
    torontoIpsumApp.generatedString = ``;
    for(let i = 0; i < numParagraphs; i++) {
        this.buildParagraph();
    }
};


//-----------------------------------------------------------
//---------Ye olde jquery event handlers---------------------
//-----------------------------------------------------------

//event listener for when paragraph size slide input changes
//display slider's value on page
torontoIpsumApp.paraSizeListener = function() {
        torontoIpsumApp.$paragraphSizeSlider.change(function () {
            torontoIpsumApp.$sliderValueDisplay.text($(this).val());
        });
};

//event listener for when paragraph size slide input changes
//display slider's value on page
torontoIpsumApp.numParaListener = function(){
    torontoIpsumApp.$numParaSlider.change(function(){
        const value = $(this).val();
        torontoIpsumApp.$paraNumSliderDisplay.text(value);
        //dynamically add the 's' at the end of 'paragraph'
        if(value > 1) {
            $(`.para-plural`).text(`s`);
        } else {
            $(`.para-plural`).empty();
        }
    });
};

//event listener for when generate button is clicked
torontoIpsumApp.generateText = function() {
    //When user presses 'generate' button
    $(`button`).on(`click`, function (event) {
        //disable default behviour
        event.preventDefault();

        

        //capture number of sentences user wants from paragraphSize slider
        torontoIpsumApp.numOfSentences = torontoIpsumApp.$paragraphSizeSlider.val();

        const numOfParas = torontoIpsumApp.$numParaSlider.val();
        console.log(numOfParas);

        //random index of word library, store as attribute in namespace object for easy access
        torontoIpsumApp.randomIndex = torontoIpsumApp.randomNumRange(0, torontoIpsumApp.wordLibrary.length);

        //start building the paragraph we want to output
        torontoIpsumApp.multipleParagraphs(numOfParas);

        //clear generated output section
        torontoIpsumApp.$generatedOutput.empty();
        //add generated string to output section
        torontoIpsumApp.$generatedOutput.append(`<h2>Yo fam here's your text</h2>`);
        torontoIpsumApp.$generatedOutput.append(torontoIpsumApp.generatedString);
        

        $(`.scroll-down-notification`).hide().text(`Scroll down for your text!`).fadeIn();

    });
};

//-------------------------------------------------------------------
//---------Ye olde init wrapper function-----------------------------
//-------------------------------------------------------------------
torontoIpsumApp.init = function() {
    this.paraSizeListener();
    this.generateText();
    this.numParaListener();

    //Display sliders starting value on page load/reload
    torontoIpsumApp.$sliderValueDisplay.text(torontoIpsumApp.$paragraphSizeSlider.val());
    torontoIpsumApp.$paraNumSliderDisplay.text(torontoIpsumApp.$numParaSlider.val());
}


//Document ready check
$(function(){
    
    torontoIpsumApp.init();

});