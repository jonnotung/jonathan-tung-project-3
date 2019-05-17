const wordLibrary = [`Finch`, `North York Center`, `Sheppard`, `York Mills`, `Lawrence`, `Eglinton`, `Davisville`, `St Clair`, `Summerhill`, `Rosedale`, `Bloor`, `Wellesley`, `College`, `Dundas`, `Queen`, `King`, `Union`, `St Andrew`, `Osgoode`, `St Patrick`, `Museum`, `St George`, `Spadina`, `Dupont`, `Glencairn`, `Yorkdale`, `Wilson`, `Downsview`, `Kipling`, `Islington`, `Royal York`, `Old Mill`, `Jane`, `Runnymede`, `High Park`, `Keele`, `Lansdowne`, `Dufferin`, `Ossington`, `Christie`, `Bathurst`, `Bay`, `Sherbourne`, `Castle Frank`, `Broadview`, `Chester`, `Pape`, `Donlands`, `Greenwood`, `Coxwell`, `Woodbine`, `Main Street`, `Victoria Park`, `Warden`, `Kennedy`, `Ellesmere`, `Midland`, `STC`, `Bayview`, `Bessarion`, `Leslie`, `Don Mills`, `McCowan`,

`Skydome`, `Blue Jays`, `Rogers center`, `Joe Carter`, `Roberto Alomar`, `Jose Bautista`, `Carlos Delgado`, `Roy Halladay`, `ACC`, `Vince Carter`, `Curtis Joseph` ,`DeMar DeRozan`, `Kyle Lowry`, `Kawhi Leonard`, `Maple Leaf Gardens`, `Mats Sundin`, `Darryl Sittler`, `Doug Gilmour`, `Borje Salming`, `Wendel Clark`, `Penny Oleksiak`, `Rosie Maclennan`, `Michelle Williams`, `Silken Laumann`, `Heather Moyse`, `Phylicia George`,

`CN tower`, `Steamwhistle brewery`, `Queens quay`, `Wonderland`, `Ontario place`, `CNE`,

`Cabbagetown`, `Corktown`, `Leslieville`, `The beaches`, `Sunnyside`, `Junction`, `Annex`, `Koreatown`, `North York`, `Etobicoke`, `Scarborough`, `East York`, `Toronto`, `Ward's Island`, `Center Island`, `Centerville`, `Olympic Island`, `Riverdale`, `Kensington Market`, `Chinatown`, `Guildwood`, `Harbourfront`, `Queensway`, `Richview`, `Ledbury Park`, `Graydon Hall`, `Riverside`, `Woodbridge`, `Christie pits`, `Allan Gardens`, `Casa Loma`, `Baldwin village`, `Bloorcourt`, `Leaside`, `Bloordale`, `Brockton`, `Church Wellsely Village`, `Cityplace`, `Little Italy`, `Little Portugal`, `Greektown`, `Danforth`, `Davenport`, `Distillery District`, `Dovercourt`, `East Chinatown`, `Forest Hill`, `Harbord Village`, `Keelesdale`, `King East`, `King West`, `Liberty Village`, `Little India`, `Little Tokyo`, `Markham`, `Mississauga`, `Moss Park`, `Mount Pleasant`, `Oakwood Village`, `Port Lands`, `Regent Park`, `Richmond Hill`, `Roncesvalles`, `St James Town`, `St Lawrence Market`, `Stockyards`, `Thorncliffe park`, `Thornhill`, `Vaughn`, `Weston`, `Woodbridge`, `Yorkville`, `Yonge`,

`U of T`, `Ryerson`, `York`, `Humber`, `Centennial`, `George Brown`, `Seneca`,

`Trash panda`, `wasteman`, `bless`, `amped`, `ahlie`, `come thru`, `cyattie`, `deafaz`, `differently`, `fam`, `fom`, `greezy`, `merked`, `lowe`, `lowkey`, `nice`, `regulate`, `snake`, `styll`, `blem`, `beat`, `cheesed`, `extra`, `gassed`, `lit`, `sus`, `ting`, `sweetersman`, `preeing`, `tun up`, `top left`, `szeen`, `sav`,`marved`, `mossin`, `gheez`, `bout it`, `arms`, `waste yute`, `make moves`, `nize it`, `yutes`, `the 6ix`, `905`, `416`, `flex`, `cop`, `scoop`, `sauga`,
`Drake`, `Massey Hall`, `Roy Thompson Hall`, `The Weeknd`];

//function to only capitalize first string in argument
const makeCapitalized = function(ourString){
    return ourString.charAt(0).toUpperCase() + ourString.slice(1).toLowerCase();
};



//Document ready check
$(function(){
    
    const paragraphSizeSlider = $(`#paragraph-size`);
    $(`.slider-value`).text(paragraphSizeSlider.val());

    //event listener for when slide input changes
    $(`#paragraph-size`).change( function(){
        // console.log($(this).val());
        $(`.slider-value`).text($(this).val());
    });


    //When user presses 'generate' button
    $(`button`).on(`click`, function(event){
        //disable default behviour
        event.preventDefault();
        
        //capture number of sentences user wants from paragraphSize slider
        const numOfSentences = $(`#paragraph-size`).val();
        
        //create string we want to concatenate onto
        let generatedString = `<p>`;
        
        //random number to pick a random word in array, store as variable to prevent same word being chosen twice in a row
        let randomIndex = Math.floor(Math.random() * wordLibrary.length);

        //for the number of sentences
        for(let i = 0; i < numOfSentences; i++) {
            //generate 5 random words and concatenate them to make a sentence
            for(let i = 0; i < 5; i++) {
                //pick a random number
                let newRandomNum = Math.floor(Math.random() * wordLibrary.length);

                //while new random number is equal to the one from previous iteration pick a new number
                while(newRandomNum === randomIndex) {
                    newRandomNum = Math.floor(Math.random() * wordLibrary.length);
                }
                randomIndex = newRandomNum;

                let newWord = wordLibrary[randomIndex].toLowerCase();
                //Capitalize word if it's first in sentence otherwise lowercase
                if(i === 0) {
                    newWord = makeCapitalized(newWord);
                }

                //concatenate new word to ongoing generated string
                generatedString = generatedString + ` ` + newWord;
                //If last word in a sentence add a period
                if(i === 4) {
                    generatedString = generatedString + `.`;
                }
            }
        }
        //close </p> tag on generated string
        generatedString = generatedString + `</p>`;

        //clear generated output section
        $(`.generated-output`).empty();
        $(`.generated-output`).append(`<h2>Here's your text eh</h2>`, generatedString);
        //add generated string to output section
        // $(`.generatedOutput`).html(generatedString);
    });

});