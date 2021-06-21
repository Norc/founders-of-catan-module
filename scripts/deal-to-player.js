import { initDeck } from './init-deck.js'

export const dealResourceCards = async function(dealInfo) {
    //console.log("In dealResourceCards, dealInfo is: ");
    //console.log(dealInfo);

    //initialize decks
    let brickDeck = initDeck("Brick");
    let grainDeck = initDeck("Grain");
    let sheepDeck = initDeck("Sheep");
    let stoneDeck = initDeck("Stone");
    let woodDeck = initDeck("Wood");

    //shuffle in discards before beginning
    let discardedIds = duplicate(brickDeck._discard);
    brickDeck.addToDeckState(discardedIds);
    brickDeck.removeFromDiscard(discardedIds);

    discardedIds = duplicate(grainDeck._discard);
    grainDeck.addToDeckState(discardedIds);
    grainDeck.removeFromDiscard(discardedIds);

    discardedIds = duplicate(sheepDeck._discard);
    sheepDeck.addToDeckState(discardedIds);
    sheepDeck.removeFromDiscard(discardedIds);

    discardedIds = duplicate(stoneDeck._discard);
    stoneDeck.addToDeckState(discardedIds);
    stoneDeck.removeFromDiscard(discardedIds);

    discardedIds = duplicate(woodDeck._discard);
    woodDeck.addToDeckState(discardedIds);
    woodDeck.removeFromDiscard(discardedIds);

    //is a timeout needed here?

    //dealInfo is an array (should probably be an object, but I'm lazy) with an expected format of
    //a user Id followed by a semi-alphabetical list of resource types (Wool is swapped for Sheep for legibility vs. Wood)
    //this order is kept consistent throughout this module's code:

    //[0] UserId of recipient player
    //[1] Number of bricks to draw
    //[2] Number of grain to draw
    //[3] Number of sheep to draw
    //[4] Number of stone to draw
    //[5] number of wood to draw.
 
    //parse dealInfo into useful variables
    //should be better error checking here but there isn't
    let drawPlayerID = dealInfo[0]; 
    let drawBrickNum = dealInfo[1];
    let drawGrainNum = dealInfo[2];
    let drawSheepNum = dealInfo[3];
    let drawStoneNum = dealInfo[4];
    let drawWoodNum = dealInfo[5];

    //Use the user data provided in dealInfo to determine who to draw two and what cards to draw.
    //using kludgy await.
    if (drawBrickNum > 0) {
        await brickDeck.dealToPlayer(drawPlayerID,drawBrickNum);
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    if (drawGrainNum > 0) {
        await grainDeck.dealToPlayer(drawPlayerID,drawGrainNum);
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    if (drawSheepNum > 0) {
        await sheepDeck.dealToPlayer(drawPlayerID,drawSheepNum);
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    if (drawStoneNum > 0) {
        await stoneDeck.dealToPlayer(drawPlayerID,drawStoneNum);
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    if (drawWoodNum > 0) await woodDeck.dealToPlayer(drawPlayerID,drawWoodNum);

    //add some sort of hook or something to prevent this from being attempted again before it finished?
}