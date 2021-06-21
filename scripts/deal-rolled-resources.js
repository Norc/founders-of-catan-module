import { dealResourceCards } from './deal-to-player.js'
import { editResourceGenForm } from './edit-resource-gen-form.js'

export const dealRolledResources = async function(userId) {

    //dealInfo is an array (should probably be an object, but I'm lazy) with an expected format of
    //a user Id followed by a semi-alphabetical list of resource types (Wool is swapped for Sheep for legibility vs. Wood)
    //this order is kept consistent throughout this module's code:

    //[0] UserId of recipient player
    //[1] Number of bricks to draw
    //[2] Number of grain to draw
    //[3] Number of sheep to draw
    //[4] Number of stone to draw
    //[5] number of wood to draw.

    //console.log("In dealPlayerForm, initial dealInfo is: ");
    //console.log(dealInfo);
    
    let rollResultDialogTemplate = `
    <div style="display:flex; flex-direction:column">
        <div style="display:flex; flex-direction:row">
            <h2 style="flex:4"> Enter Roll Result</h2>
        </div> 
        <div style="display:flex; flex-direction:row">
            <input type="number" id="numRolled" value=6 style="width:50px"/>
        </div> 
    </div>
    `;
    new Dialog({
        title: "Enter Roll Result",
        content: rollResultDialogTemplate,
        buttons: {
            deal: {
                label: "Deal",
                callback: async (html) => {
                    let contentOrig = `<p>The land of Catan produced the following resources:</p`;
                    //send initial chat message
                    ChatMessage.create({
                        speaker: ChatMessage.getSpeaker( {alias:"Narrator"} ),
                        content: contentOrig,
                        type: CONST.CHAT_MESSAGE_TYPES.OTHER
                    });
                    let roll = html.find("#numRolled")[0].value;
                    console.log("In dealPlayerForm callback. Roll: ");
                    console.log(roll);
                    game.users.entries.forEach(async u => {
                        if (u.active === true) {
                            let rGM = duplicate( u.getFlag("catan","resourceGenMatrix") );
                            console.table(rGM);
                            rGM[roll].splice(0,0,u.data._id);
                            console.log("Dealing cards to player....")
                            console.log( rGM[roll] );
                            await dealResourceCards( rGM[roll] );
                            let recipientName = u.charname || u.data.name;
                            let playerContentOrig = `<p>${recipientName} received `;
                            let playerContent = "";
                            if (rGM[roll][1] > 0) playerContent += `${rGM[roll][1]} brick `;
                            if (rGM[roll][2] > 0) playerContent += `${rGM[roll][2]} grain `;
                            if (rGM[roll][3] > 0) playerContent += `${rGM[roll][3]} sheep `;
                            if (rGM[roll][4] > 0) playerContent += `${rGM[roll][4]} stone `;
                            if (rGM[roll][5] > 0) playerContent += `${rGM[roll][5]} wood `;
                            if (playerContent !=="") {
                                playerContent = `${playerContentOrig} ${playerContent}</p>`;
                                console.log(playerContent);
                                ChatMessage.create({
                                    speaker: ChatMessage.getSpeaker({alias:"Narrator"}),
                                    content: playerContent,
                                    type: CONST.CHAT_MESSAGE_TYPES.OTHER
                                });
                            }
                        }
                    });
                }
            }
        }
    }).render(true);
}