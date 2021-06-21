import { initDeck } from './init-deck.js'
import { dealResourceCards } from './deal-to-player.js'
import { editResourceGenForm } from './edit-resource-gen-form.js'

export const dealPlayerForm = async function(userId) {

    let brickDeck = initDeck("Brick");
    let grainDeck = initDeck("Grain");
    let sheepDeck = initDeck("Sheep");
    let stoneDeck = initDeck("Stone");
    let woodDeck = initDeck("Wood");

    //dealInfo is an array (should probably be an object, but I'm lazy) with an expected format of
    //a user Id followed by a semi-alphabetical list of resource types (Wool is swapped for Sheep for legibility vs. Wood)
    //this order is kept consistent throughout this module's code:

    //[0] UserId of recipient player
    //[1] Number of bricks to draw
    //[2] Number of grain to draw
    //[3] Number of sheep to draw
    //[4] Number of stone to draw
    //[5] number of wood to draw.

    let dealInfo = [];
    dealInfo.push(userId);
    //console.log("In dealPlayerForm, initial dealInfo is: ");
    //console.log(dealInfo);

    let recipientPlayerName = game.users.get(userId).charname || game.users.get(userId).data.name;
    
    let takeDialogTemplate = `
    <div style="display:flex; flex-direction:column">
        <div style="display:flex; flex-direction:row">
            <h2 style="flex:4"> Dealing to ${recipientPlayerName}...</h2>
        </div> 
        <div style="display:flex; flex-direction:row">
            <h3 style="flex:4"> How many bricks? </h3>
            <input type="number" id="numBrickCards" value=0 style="width:50px"/>
            <input style="display:none" id="brickDeckID" value=${brickDeck.deckID} />
        </div> 
        <div style="display:flex; flex-direction:row">
            <h3 style="flex:4"> How much grain? </h3>
            <input type="number" id="numGrainCards" value=0 style="width:50px"/>
            <input style="display:none" id="grainDeckID" value=${grainDeck.deckID} />
        </div>
        <div style="display:flex; flex-direction:row">
            <h3 style="flex:4"> How many sheep? </h3>
            <input type="number" id="numSheepCards" value=0 style="width:50px"/>
            <input style="display:none" id="sheepDeckID" value=${sheepDeck.deckID} />
        </div>
        <div style="display:flex; flex-direction:row">
            <h3 style="flex:4"> How many stone? </h3>
            <input type="number" id="numStoneCards" value=0 style="width:50px"/>
            <input style="display:none" id="stoneDeckID" value=${stoneDeck.deckID} />
        </div>
        <div style="display:flex; flex-direction:row">
            <h3 style="flex:4"> How many wood? </h3>
            <input type="number" id="numWoodCards" value=0 style="width:50px"/>
            <input style="display:none" id="woodDeckID" value=${woodDeck.deckID} />
        </div>
    </div>
    `;
    new Dialog({
        title: "Draw Cards",
        content: takeDialogTemplate,
        buttons: {
            editRes:{
                label: "Edit Resource Gen",
                callback: () => {
                    editResourceGenForm(userId);
                }
            },
            draw: {
                label: "Deal",
                callback: (html) => {
                    dealInfo.push( html.find("#numBrickCards")[0].value);
                    dealInfo.push( html.find("#numGrainCards")[0].value);
                    dealInfo.push( html.find("#numSheepCards")[0].value);
                    dealInfo.push( html.find("#numStoneCards")[0].value);
                    dealInfo.push( html.find("#numWoodCards")[0].value);
                    dealResourceCards(dealInfo);
                    let recipientName = game.users.get(userId).charname || game.users.get(userId).data.name;
                    let playerContentOrig = `<p>The banker gave ${recipientName} `;
                    let playerContent = "";
                    if (dealInfo[1] > 0) playerContent += `${dealInfo[1]} brick `;
                    if (dealInfo[2] > 0) playerContent += `${dealInfo[2]} grain `;
                    if (dealInfo[3] > 0) playerContent += `${dealInfo[3]} sheep `;
                    if (dealInfo[4] > 0) playerContent += `${dealInfo[4]} stone `;
                    if (dealInfo[5] > 0) playerContent += `${dealInfo[5]} wood `;
                    if (playerContent !=="") {
                        playerContent = `${playerContentOrig} ${playerContent}</p>`;
                        console.log(playerContent);
                    }
                    ChatMessage.create({
                        speaker: ChatMessage.getSpeaker({alias:"Narrator"}),
                        content: playerContent,
                        type: CONST.CHAT_MESSAGE_TYPES.OTHER
                    });
                    //console.log("In dealPlayerForm callback, final dealInfo is: ");
                    //console.log(dealInfo);
                }
            }
        }
    }).render(true);


}