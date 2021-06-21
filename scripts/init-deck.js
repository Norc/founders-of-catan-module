export const initDeck = function(deckName) {

    let activeScene = game.scenes.active; 
    let gameSceneName = "Catan";
    let gameSceneNameFiveSix = "Catan 5-6";

    //Check to see if this scene is a catan game
    if (activeScene.name === gameSceneName || activeScene.name === gameSceneNameFiveSix ) {

        //expected decknames for Catan: Brick, Grain, Sheep, Stone, Wood, Development
        let initDeckName = deckName;
        let initDeck = {};

        //suffix added to 5-6 player versions of the decks
        let fiveSixStrSuff = "_5-6";
 
        //auto detect game type (player number) by scene name
        let fiveSixBool = activeScene.name === gameSceneNameFiveSix;

        //If a 5-6 player game, add a suffix to the deck name to grab the right deck
        if (fiveSixBool === true) initDeckName += fiveSixStrSuff;

        //identify and initialize the resource decks
        for (const d in game.decks.decks ) { 
            //console.log(game.decks.decks[d]);
            if ( filterObj(game.decks.decks[d], initDeckName).length > 0 ) initDeck = game.decks.decks[d];
        }

        //return the correct deck
        return initDeck;
    } else {
        console.log("Catan Decks not initialized because scene name does not match a valid Catan game.");
    }
}

function filterObj(srcObj, searchKey, exactMatch = true) {
    const arr = Object.entries(srcObj);
    //console.log(arr);
    if (exactMatch) {
        //entire searchKey must match exactly
        return arr.filter( obj => Object.keys(obj).some(key => obj[key] === searchKey) );
    } else {
        //for subset matches
        return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)));
    }
}