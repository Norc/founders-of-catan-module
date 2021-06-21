export const initDecks = async function() {

    //This script assumes that the active scene is where the game will be setup.
    let activeScene = game.scenes.active;

    //Check to see if this scene is a catan game
    if (activeScene.name === "Catan" || activeScene.name === "Catan 5-6") {

        //names of the decks and the 5-6 player suffix added to 5-6 player versions of the decks
        let brickDeckName = "Brick";
        let grainDeckName = "Grain";
        let sheepDeckName = "Sheep";
        let stoneDeckName = "Stone";
        let woodDeckName = "Wood";
        let devDeckName = "Development";
        let fiveSixStrSuff = "_5-6"

        //If a 5-6 player game (automatically detected by the ), add a suffix to the deck name to grab the right deck
        let fiveSixBool = true;
        if (fiveSixBool === true) {
            brickDeckName += fiveSixStrSuff;
            grainDeckName += fiveSixStrSuff;
            sheepDeckName += fiveSixStrSuff;
            stoneDeckName += fiveSixStrSuff;
            woodDeckName += fiveSixStrSuff;
            devDeckName += fiveSixStrSuff;
        }

        let brickDeck = {};
        let grainDeck = {};
        let sheepDeck = {};
        let stoneDeck = {};
        let woodDeck = {};
        let devDeck = {};

        //identify and initialize the resource decks
        for (const d in game.decks.decks ) { 
            //console.log(game.decks.decks[d]);
            if ( filterObj(game.decks.decks[d], brickDeckName).length > 0 ) {
                brickDeck = game.decks.decks[d];
        //        console.log("Brick deck is: ");
        //        console.log(brickDeck);
            }
            if ( filterObj(game.decks.decks[d], grainDeckName).length > 0 ) {
                grainDeck = game.decks.decks[d];
        //        console.log("Grain deck is: ");
        //        console.log(grainDeck);
            }
            if ( filterObj(game.decks.decks[d], sheepDeckName).length > 0 ) {
                sheepDeck = game.decks.decks[d];
        //       console.log("Sheep deck is: ");
        //       console.log(sheepDeck);
            }
            if ( filterObj(game.decks.decks[d], stoneDeckName).length > 0 ) {
                stoneDeck = game.decks.decks[d];
        //       console.log("Stone deck is: ");
        //       console.log(stoneDeck);
            }
            if ( filterObj(game.decks.decks[d], woodDeckName).length > 0 ) {
                woodDeck = game.decks.decks[d];
        //       console.log("Wood deck is: ");
        //       console.log(woodDeck);
            }
            if ( filterObj(game.decks.decks[d], devDeckName).length > 0 ) {
                devDeck = game.decks.decks[d];
        //        console.log("Dev deck is: ");
        //        console.log(devDeck);
            }    
        }

        //store decks as flags on scene
        await activeScene.setFlag("catan","brickDeck",brickDeck);
        await activeScene.setFlag("catan","grainDeck",grainDeck);
        await activeScene.setFlag("catan","sheepDeck",sheepDeck);
        await activeScene.setFlag("catan","stoneDeck",stoneDeck);
        await activeScene.setFlag("catan","woodDeck",woodDeck);
        await activeScene.setFlag("catan","devDeck",devDeck);

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
    } else {
        console.log("Catan Decks not initialized because scene name does not match a valid Catan game.");
    }

}