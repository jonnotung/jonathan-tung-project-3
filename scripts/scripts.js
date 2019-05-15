const wordLibrary = ["Finch", "North York Center", "Sheppard", "York Mills", "Lawrence", "Eglinton", "Davisville", "St Clair", "Summerhill", "Rosedale", "Bloor", "Wellesley", "College", "Dundas", "Queen", "King", "Union", "St Andrew", "Osgoode", "St Patrick", "Museum", "St George", "Spadina", "Dupont", "Glencairn", "Yorkdale", "Wilson", "Downsview", "Kipling", "Islington", "Royal York", "Old Mill", "Jane", "Runnymede", "High Park", "Keele", "Lansdowne", "Dufferin", "Ossington", "Christie", "Bathurst", "Bay", "Sherbourne", "Castle Frank", "Broadview", "Chester", "Pape", "Donlands", "Greenwood", "Coxwell", "Woodbine", "Main Street", "Victoria Park", "Warden", "Kennedy", "Ellesmere", "Midland", "STC", "Bayview", "Bessarion", "Leslie", "Don Mills", "McCowan",

"Skydome", "Blue Jays", "Rogers center", "Joe Carter", "Roberto Alomar", "Roger Clemens", "Lloyd Moseby", "Jose Bautista", "Carlos Delgado", "Roy Halladay", "ACC", "Vince Carter", "Curtis Joseph" ,"DeMar DeRozan", "Kyle Lowry", "Tracy McGrady", "Kawhi Leonard", "Chris Boch", "Damon Stoudamire", "Maple Leaf Gardens", "Mats Sundin", "Dave Keon", "Darryl Sittler", "Doug Gilmour", "Johnny Bower", "Borje Salming", "Tim Horton", "Wendel  Clark",

"CN tower", "Steamwhistle brewery", "Queens quay", "Ripley's aquarium", "Wonderland", "Ontario place", "CNE",

"Cabbagetown", "Corktown", "Leslieville", "The beaches", "Sunnyside", "Junction", "Annex", "Koreatown", "North York", "Etobicoke", "Scarborough", "East York", "Toronto", "Ward's Island", "Center Island", "Centerville", "Olympic Island", "Riverdale", "Kensington Market", "Chinatown", "Guildwood", "Harbourfront", "Queensway", "Richview", "Ledbury Park", "Graydon Hall", "Riverside", "Woodbridge", "Christie pits", "Allan Gardens", "Casa Loma", "Baldwin village", "Bloorcourt", "Leaside", "Bloordale", "Brockton", "Church Wellsely Village", "Cityplace", "Little Italy", "Little Portugal", "Greektown", "Danforth", "Davenport", "Distillery District", "Dovercourt", "East Chinatown", "Forest Hill", "Harbord Village", "Keelesdale", "King East", "King West", "Liberty Village", "Little India", "Little Tokyo", "Markham", "Mississauga", "Moss Park", "Mount Pleasant", "Oakwood Village", "Port Lands", "Regent Park", "Richmond Hill", "Roncesvalles", "St James Town", "St Lawrence Market", "Stockyards", "Thorncliffe park", "Thornhill", "Vaughn", "Weston", "Woodbridge", "Yorkville", "Yonge",

"U of T", "Ryerson", "York", "Humber", "Centennial", "George Brown", "Seneca"];

//function to only capitalize first string in argument
const makeCapitalized = function(ourString){
    return ourString.charAt(0).toUpperCase() + ourString.slice(1).toLowerCase();
};


//Document ready check
$(function(){

    //When user presses 'generate' button
    $(`button`).on(`click`, function(event){
        //disable default behviour
        event.preventDefault();
        
        //capture number of sentences user wants from paragraphSize slider
        const numOfSentences = $(`#paragraphSize`).val();
        
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
        $(`.generatedOutput`).empty();
        $(`.generatedOutput`).append(`<h2>Here's your text eh</h2>`, generatedString);
        //add generated string to output section
        // $(`.generatedOutput`).html(generatedString);
    });

});