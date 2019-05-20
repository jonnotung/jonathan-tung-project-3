//--------------------------------
//-----app object name space------
//--------------------------------
const torontoIpsumApp = {};

//------------------------------------------------
//-------define word library to draw from---------
//------------------------------------------------
//base words, always there. 187 words
torontoIpsumApp.wordLibraryBase = [`Finch`, `North York Center`, `Sheppard`, `York Mills`, `Lawrence`, `Eglinton`, `Davisville`, `St Clair`, `Summerhill`, `Rosedale`, `Bloor`, `Wellesley`, `College`, `Dundas`, `Queen`, `King`, `Union`, `St Andrew`, `Osgoode`, `St Patrick`, `Museum`, `St George`, `Spadina`, `Dupont`, `Glencairn`, `Yorkdale`, `Wilson`, `Downsview`, `Kipling`, `Islington`, `Royal York`, `Old Mill`, `Jane`, `Runnymede`, `High Park`, `Keele`, `Lansdowne`, `Dufferin`, `Ossington`, `Christie`, `Bathurst`, `Bay`, `Sherbourne`, `Castle Frank`, `Broadview`, `Chester`, `Pape`, `Donlands`, `Greenwood`, `Coxwell`, `Woodbine`, `Main Street`, `Victoria Park`, `Warden`, `Kennedy`, `Ellesmere`, `Midland`, `STC`, `Bayview`, `Bessarion`, `Leslie`, `Don Mills`, `McCowan`, `CN tower`, `Steamwhistle brewery`, `Queens quay`, `Wonderland`, `Ontario place`, `CNE`, `Cabbagetown`, `Corktown`, `Leslieville`, `The beaches`, `Sunnyside`, `Junction`, `Annex`, `Koreatown`, `North York`, `Etobicoke`, `Scarborough`, `East York`, `Toronto`, `Ward's Island`, `Center Island`, `Centerville`, `Olympic Island`, `Riverdale`, `Kensington Market`, `Chinatown`, `Guildwood`, `Harbourfront`, `Queensway`, `Richview`, `Ledbury Park`, `Graydon Hall`, `Riverside`, `Woodbridge`, `Christie pits`, `Allan Gardens`, `Casa Loma`, `Baldwin village`, `Bloorcourt`, `Leaside`, `Bloordale`, `Brockton`, `Church Wellsely Village`, `Cityplace`, `Little Italy`, `Little Portugal`, `Greektown`, `Danforth`, `Davenport`, `Distillery District`, `Dovercourt`, `East Chinatown`, `Forest Hill`, `Harbord Village`, `Keelesdale`, `King East`, `King West`, `Liberty Village`, `Little India`, `Little Tokyo`, `Markham`, `Mississauga`, `Moss Park`, `Mount Pleasant`, `Oakwood Village`, `Port Lands`, `Regent Park`, `Richmond Hill`, `Roncesvalles`, `St James Town`, `St Lawrence Market`, `Stockyards`, `Thorncliffe park`, `Thornhill`, `Vaughn`, `Weston`, `Woodbridge`, `Yorkville`, `Yonge`, `U of T`, `Ryerson`, `York`, `Humber`, `Centennial`, `George Brown`, `Seneca`, `Drake`, `Massey Hall`, `Roy Thompson Hall`, `The Weeknd`, `Jully Black`, `Peaches`, `Deborah Cox`, `Broken Social Scene`, `Feist`, `Metric`, `Lee's Palace`, `Scott Pilgrim`, `The phoenix`, `Horseshoe tavern`, `Will Arnett`, `Catherine O'hara`, `Howie Mandel`, `Mike Myers`, `Christopher Plummer`, `Neil Young`, `John Candy`, `David Cronenberg`, `Rick Moranis`, `Sarah Polley`, `Katheryn Winnick`, `MSTRKRFT`, `Our Lady Peace`, `Snow`, `Lights`, `Alvvays`, `Owen Pallett`, `Kardinal Offishall`, `Maestro`, `Death from above`, `k-os`, `Blue Rodeo`, `Choclair`, `Rush`];

//optional categories that can be added
//34 words
torontoIpsumApp.sportsWords = [`Skydome`, `Blue Jays`, `Rogers center`, `Joe Carter`, `Roberto Alomar`, `Jose Bautista`, `Carlos Delgado`, `Roy Halladay`, `ACC`, `Vince Carter`, `Curtis Joseph` ,`DeMar DeRozan`, `Kyle Lowry`, `Kawhi Leonard`, `Maple Leaf Gardens`, `Mats Sundin`, `Darryl Sittler`, `Doug Gilmour`, `Borje Salming`, `Wendel Clark`, `Penny Oleksiak`, `Rosie Maclennan`, `Michelle Williams`, `Silken Laumann`, `Heather Moyse`, `Phylicia George`, `Marlies`, `Toronto FC`, `Argos`, `Pinball Clemons`, `Rock`, `Maple Leafs`, `Raptors`, `St Michael's Majors`];

//49 words
torontoIpsumApp.slangWords = [`Trash panda`, `wasteman`, `bless`, `amped`, `ahlie`, `come thru`, `cyattie`, `deafaz`, `differently`, `fam`, `fom`, `greezy`, `merked`, `lowe`, `lowkey`, `nice`, `regulate`, `snake`, `styll`, `blem`, `beat`, `cheesed`, `extra`, `gassed`, `lit`, `sus`, `ting`, `sweetersman`, `preeing`, `tun up`, `top left`, `szeen`, `sav`,`marved`, `mossin`, `gheez`, `bout it`, `arms`, `waste yute`, `make moves`, `nize it`, `yutes`, `the 6ix`, `905`, `416`, `flex`, `cop`, `scoop`, `sauga`];

//wordLibrary that gets build dynamically based on user selection when generate button is hit
torontoIpsumApp.wordLibrary = [];

//punctuation library. More periods to make them more common. 4 - 1 - 1 ratio
torontoIpsumApp.punctuation = [`.`, `.`, `.`, `.`, `?`, `!` ];

//--------------------------------------------
//-------------variables----------------------
//--------------------------------------------

//store number of sentences per paragraph in torontoIpsumApp object, instead of passing it constantly as an argument
torontoIpsumApp.numOfSentences;
torontoIpsumApp.minWordsPerSent = 3;
torontoIpsumApp.maxWordsPerSent = 7;
torontoIpsumApp.generatedString = ``;

//set to store words (indexes) in current sentence to prevent repeats
torontoIpsumApp.currentSentence = new Set();

//-----------------------------------------------------------
//---------Functions ----------------------------------------
//-----------------------------------------------------------

//returns argument string with only the first letter capitalized
//based on example at: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
 torontoIpsumApp.makeCapitalized = function(ourString){
    return ourString.charAt(0).toUpperCase() + ourString.slice(1).toLowerCase();
};

//returns a random integer x such that: min <= x < max
torontoIpsumApp.randomNumRange = function(min, max) {
    const interval = max - min;
    return Math.floor(Math.random() * interval) + min;
};

//returns a random word from the word library, 
//if wordPosition = 0 capitalize it, otherwise returns as all lowercase
torontoIpsumApp.randomWord = function(wordPosition) {
    //get a random index for word library that's different from randNum in object
    const randNum = this.noRepeatRandNum();

    let newWord = this.wordLibrary[randNum];
    
    //Capitalize word if it's first in sentence, otherwise lowercase
    if (wordPosition === 0) {
        newWord = this.makeCapitalized(newWord);
    } else {
        newWord = newWord.toLowerCase();
    }
    return newWord;
}

//returns a randomm number that is not the same as randomIndex in torontoIpsumApp object
torontoIpsumApp.noRepeatRandNum = function() {
    //use let because we might reassign newRandomNum
    let newRandomNum = this.randomNumRange(0, this.wordLibrary.length);

    //check if newRandomNum has been seen in this sentenbce
    while (this.currentSentence.has(newRandomNum)) {
        newRandomNum = this.randomNumRange(0, this.wordLibrary.length);
    }
    //remember we got this index in this sentence now
    this.currentSentence.add(newRandomNum);
    return newRandomNum;
};

//builds up sentences in generatedOutput string in torontoIpsumApp object
//repeats randomWord() in a loop randomly between minWordsPerSent and maxWordsPerSent times 
torontoIpsumApp.putWordsInSentence = function() {
    //generate 5 random words and concatenate them to make a sentence
    //+1 to max since the range is not inclusive at the top end
    const randNumWords = this.randomNumRange(this.minWordsPerSent, this.maxWordsPerSent + 1);

    //clear words (indexes) already seen, start of a new sentence
    torontoIpsumApp.currentSentence.clear();

    for (let i = 0; i < randNumWords; i++) {
        //pick a new word that isn't the same as previous word
        const wordToAdd = this.randomWord(i);

        //concatenate new word to ongoing generated string
        torontoIpsumApp.generatedString = torontoIpsumApp.generatedString + ` ` + wordToAdd;
        //If last word in a sentence add random punctuation mark
        if (i === randNumWords - 1) {
            const punct = this.punctuation[this.randomNumRange(0, this.punctuation.length)];
            this.generatedString = this.generatedString + punct;
        }
    }
};

//build up paragraph(s) in generatedOutput string in torontoIpsumApp object
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
    //reset generated string each time generate button is pushed
    //put text in a div so it can be selected and copied by 1 button click
    torontoIpsumApp.generatedString = `<div class="text-to-copy">`;
    for(let i = 0; i < numParagraphs; i++) {
        this.buildParagraph();
    }
    //close div
    torontoIpsumApp.generatedString += `</div>`;
    //add copy button
    torontoIpsumApp.generatedString += `<button>Copy text</button>`;
};


//creates word library to pick from based on user selection
torontoIpsumApp.buildWordLibrary = function() {
     //build word dictionary based on category choices checked by user
    //reset word library
    torontoIpsumApp.wordLibrary = torontoIpsumApp.wordLibraryBase;
    //temporary array to store sports or slang words
    let tempCategories = [];
    //add appropriate categories
    if( torontoIpsumApp.$sportsCheck.is(`:checked`)) {
        tempCategories = tempCategories.concat(torontoIpsumApp.sportsWords);
    }
    if( torontoIpsumApp.$slangCheck.is(`:checked`)) {
        tempCategories = tempCategories.concat(torontoIpsumApp.slangWords);
    }
    torontoIpsumApp.wordLibrary = torontoIpsumApp.wordLibrary.concat(tempCategories);
};

//-----------------------------------------------------------
//---------Jquery event handlers-----------------------------
//-----------------------------------------------------------

//event listener for when generate button is clicked
torontoIpsumApp.generateText = function() {
    //When user presses 'generate' button
    $(`button`).on(`click`, function (event) {
        //disable default behviour
        event.preventDefault();

        //build word library based on categories user has selected
        torontoIpsumApp.buildWordLibrary();

        //capture number of sentences user wants 
        torontoIpsumApp.numOfSentences = torontoIpsumApp.$paragraphSizeSelector.val();
        //capture number of paragraphs user wants 
        const numOfParas = torontoIpsumApp.$numParaSelector.val();

        //get random index of word library, store as attribute in namespace object for easy access
        torontoIpsumApp.randomIndex = torontoIpsumApp.randomNumRange(0, torontoIpsumApp.wordLibrary.length);

        //start building the paragraphs we want to output
        torontoIpsumApp.multipleParagraphs(numOfParas);

        //clear generated output section
        torontoIpsumApp.$generatedOutput.empty();
        //add generated string to output section
        torontoIpsumApp.$generatedOutput.append(`<h2>Yo fam here's your text</h2>`);
        torontoIpsumApp.$generatedOutput.append(torontoIpsumApp.generatedString);
        //add class of add-padding-when-generated to output div to add padding
        torontoIpsumApp.$generatedOutput.addClass(`add-padding-when-generated`);
        
        //Add notification text for user to scroll down at bottom of starting screen
        $(`.scroll-down-notification`).hide().text(`Scroll down for your text!`).fadeIn();
    });
};

//event listener for when copy text button is pushed
//click event delegated to class .generated-output since copy button is dynamically generated
//Made following https://www.coderomeos.org/select-and-copy-data-to-clipboard-using-jquery
torontoIpsumApp.copyTextListener = function() {
    $(`.generated-output`).on(`click`, `button`, function(){
        const $textToCopy = $(`.text-to-copy`);
        $textToCopy.focus();
        $textToCopy.select();
        //copies the inner text to clipboard
        //standard JS document.execComand('copy) doesn't work in event listeners, this is alternative
        //compatible with chrome & firefox, unknown safari support, no support in IE/edge
        navigator.clipboard.writeText($textToCopy[0].innerText);
    });
}

//event listener for when add category buttons are clicked
torontoIpsumApp.checkBoxListener = function() {
    //if either checkbox status changes
    $(`input[type=checkbox]`).on(`change`, function(){

        //change text in buttons to updated status depending on which category boxes are checked
        if( torontoIpsumApp.$sportsCheck.is(`:checked`)) {
            torontoIpsumApp.$sportsButton .text(`Sports Added`);
        } else {
            torontoIpsumApp.$sportsButton .text(`Add Sports`);
        }

        if( torontoIpsumApp.$slangCheck.is(`:checked`)) {
            torontoIpsumApp.$slangButton.text(`Slang Added`);
        } else {
            torontoIpsumApp.$slangButton.text(`Add Slang`);
        }
    });
};

//-------------------------------------------------------------------
//---------Init wrapper function-------------------------------------
//-------------------------------------------------------------------
torontoIpsumApp.init = function() {
    //----------------------------------------
    //---------jquery DOM references----------
    //----------------------------------------
    torontoIpsumApp.$paragraphSizeSelector = $(`#paragraph-size`);
    torontoIpsumApp.$numParaSelector = $(`#paragraph-num`);
    torontoIpsumApp.$generatedOutput = $(`.generated-output`);
    torontoIpsumApp.$sportsCheck = $(`#sports`);
    torontoIpsumApp.$sportsButton = $(`.sports-button`);
    torontoIpsumApp.$slangCheck = $(`#slang`);
    torontoIpsumApp.$slangButton = $(`.slang-button`);

    this.generateText();
    this.copyTextListener();
    torontoIpsumApp.checkBoxListener();
}


//Document ready check
$(function(){
    torontoIpsumApp.init();
});