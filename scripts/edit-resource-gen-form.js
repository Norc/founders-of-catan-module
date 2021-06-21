//import { initDeck } from './init-deck.js'
//import { dealResourceCards } from './deal-to-player.js'

export const editResourceGenForm = async function(userId) {
    //As usual, the order of the resources are brick, grain, sheep, stone, and wood.
    //This is a semi-alphabetical list of resource types (Wool is swapped for Sheep for legibility vs. Wood)
    //This order is kept consistent throughout this module's code:

    //console.log("In dealPlayerForm, initial dealInfo is: ");
    //console.log(dealInfo);

    let resourcePlayerName = game.users.get(userId).charname || game.users.get(userId).data.name;
    let u = game.users.get(userId);
    let origMatrix = duplicate( u.getFlag("catan", "resourceGenMatrix") );

    let editResGenDialogTemplate = `
    <div style="display:flex; flex-direction:column">
        <div style="display:flex; flex-direction:row">
            <h2 style="flex:4"> Resource Generation for ${resourcePlayerName}</h2>
        </div> 
        <div style="display:flex; flex-direction:row">
            <h3 style="flex:4">Roll</h3><h3 style="flex:4">Resources Generated</h3>
        </div> 

        <div style="display:flex; flex-direction:row">
            <p><b>2</b>&nbsp;&nbsp;&nbsp;</p>
            <p>Bricks &nbsp;</p><input type="number" id="2numBrickCards" value=${origMatrix[2][0]} style="width:25px"/>
            <p> &nbsp; Grain &nbsp;</p><input type="number" id="2numGrainCards" value=${origMatrix[2][1]} style="width:25px"/>
            <p> &nbsp; Sheep &nbsp;</p><input type="number" id="2numSheepCards" value=${origMatrix[2][2]} style="width:25px"/>
            <p> &nbsp; Stone &nbsp;</p><input type="number" id="2numStoneCards" value=${origMatrix[2][3]} style="width:25px"/>
            <p> &nbsp; Wood &nbsp;</p><input type="number" id="2numWoodCards" value=${origMatrix[2][4]} style="width:25px"/>
        </div> 
        <div style="display:flex; flex-direction:row">
            <p><b>3</b>&nbsp;&nbsp;&nbsp;</p>
            <p>Bricks &nbsp;</p><input type="number" id="3numBrickCards" value=${origMatrix[3][0]}  style="width:25px"/>
            <p> &nbsp; Grain &nbsp;</p><input type="number" id="3numGrainCards" value=${origMatrix[3][1]} style="width:25px"/>
            <p> &nbsp; Sheep &nbsp;</p><input type="number" id="3numSheepCards" value=${origMatrix[3][2]} style="width:25px"/>
            <p> &nbsp; Stone &nbsp;</p><input type="number" id="3numStoneCards" value=${origMatrix[3][3]} style="width:25px"/>
            <p> &nbsp; Wood &nbsp;</p><input type="number" id="3numWoodCards" value=${origMatrix[3][4]} style="width:25px"/>
        </div> 
        <div style="display:flex; flex-direction:row">
            <p><b>4</b>&nbsp;&nbsp;&nbsp;</p>
            <p> Bricks &nbsp;</p><input type="number" id="4numBrickCards" value=${origMatrix[4][0]} style="width:25px"/>
            <p> &nbsp; Grain &nbsp;</p><input type="number" id="4numGrainCards" value=${origMatrix[4][1]} style="width:25px"/>
            <p> &nbsp; Sheep &nbsp;</p><input type="number" id="4numSheepCards" value=${origMatrix[4][2]} style="width:25px"/>
            <p> &nbsp; Stone &nbsp;</p><input type="number" id="4numStoneCards" value=${origMatrix[4][3]} style="width:25px"/>
            <p> &nbsp; Wood &nbsp;</p><input type="number" id="4numWoodCards" value=${origMatrix[4][4]} style="width:25px"/>
        </div>

        <div style="display:flex; flex-direction:row">
            <p><b>5</b>&nbsp;&nbsp;&nbsp;</p>
            <p> Bricks &nbsp;</p><input type="number" id="5numBrickCards" value=${origMatrix[5][0]} style="width:25px"/>
            <p> &nbsp; Grain &nbsp;</p><input type="number" id="5numGrainCards" value=${origMatrix[5][1]} style="width:25px"/>
            <p> &nbsp; Sheep &nbsp;</p><input type="number" id="5numSheepCards" value=${origMatrix[5][2]} style="width:25px"/>
            <p> &nbsp; Stone &nbsp;</p><input type="number" id="5numStoneCards" value=${origMatrix[5][3]} style="width:25px"/>
            <p> &nbsp; Wood &nbsp;</p><input type="number" id="5numWoodCards" value=${origMatrix[5][4]} style="width:25px"/>
        </div>
        <div style="display:flex; flex-direction:row">
            <p><b>6</b>&nbsp;&nbsp;&nbsp;</p>
            <p> Bricks &nbsp;</p><input type="number" id="6numBrickCards" value=${origMatrix[6][0]} style="width:25px"/>
            <p> &nbsp; Grain &nbsp;</p><input type="number" id="6numGrainCards" value=${origMatrix[6][1]} style="width:25px"/>
            <p> &nbsp; Sheep &nbsp;</p><input type="number" id="6numSheepCards" value=${origMatrix[6][2]} style="width:25px"/>
            <p> &nbsp; Stone &nbsp;</p><input type="number" id="6numStoneCards" value=${origMatrix[6][3]} style="width:25px"/>
            <p> &nbsp; Wood &nbsp;</p><input type="number" id="6numWoodCards" value=${origMatrix[6][4]} style="width:25px"/>
        </div>
        <div style="display:flex; flex-direction:row">
            <p><b>8</b>&nbsp;&nbsp;&nbsp;</p>
            <p> Bricks &nbsp;</p><input type="number" id="8numBrickCards" value=${origMatrix[8][0]} style="width:25px"/>
            <p> &nbsp; Grain &nbsp;</p><input type="number" id="8numGrainCards" value=${origMatrix[8][1]} style="width:25px"/>
            <p> &nbsp; Sheep &nbsp;</p><input type="number" id="8numSheepCards" value=${origMatrix[8][2]} style="width:25px"/>
            <p> &nbsp; Stone &nbsp;</p><input type="number" id="8numStoneCards" value=${origMatrix[8][3]} style="width:25px"/>
            <p> &nbsp; Wood &nbsp;</p><input type="number" id="8numWoodCards" value=${origMatrix[8][4]} style="width:25px"/>
        </div>

        <div style="display:flex; flex-direction:row">
            <p><b>9</b>&nbsp;&nbsp;&nbsp;</p>
            <p> Bricks &nbsp;</p><input type="number" id="9numBrickCards" value=${origMatrix[9][0]} style="width:25px"/>
            <p> &nbsp; Grain &nbsp;</p><input type="number" id="9numGrainCards" value=${origMatrix[9][1]} style="width:25px"/>
            <p> &nbsp; Sheep &nbsp;</p><input type="number" id="9numSheepCards" value=${origMatrix[9][2]} style="width:25px"/>
            <p> &nbsp; Stone &nbsp;</p><input type="number" id="9numStoneCards" value=${origMatrix[9][3]} style="width:25px"/>
            <p> &nbsp; Wood &nbsp;</p><input type="number" id="9numWoodCards" value=${origMatrix[9][4]} style="width:25px"/>
        </div>
        <div style="display:flex; flex-direction:row">
            <p><b>10</b>&nbsp;&nbsp;</p>
            <p> Bricks &nbsp;</p><input type="number" id="10numBrickCards" value=${origMatrix[10][0]} style="width:25px"/>
            <p> &nbsp; Grain &nbsp;</p><input type="number" id="10numGrainCards" value=${origMatrix[10][1]} style="width:25px"/>
            <p> &nbsp; Sheep &nbsp;</p><input type="number" id="10numSheepCards" value=${origMatrix[10][2]} style="width:25px"/>
            <p> &nbsp; Stone &nbsp;</p><input type="number" id="10numStoneCards" value=${origMatrix[10][3]} style="width:25px"/>
            <p> &nbsp; Wood &nbsp;</p><input type="number" id="10numWoodCards" value=${origMatrix[10][4]} style="width:25px"/>
        </div>
        <div style="display:flex; flex-direction:row">
            <p><b>11</b>&nbsp;&nbsp;</p>
            <p>Bricks &nbsp;</p><input type="number" id="11numBrickCards" value=${origMatrix[11][0]} style="width:25px"/>
            <p> &nbsp; Grain &nbsp;</p><input type="number" id="11numGrainCards" value=${origMatrix[11][1]} style="width:25px"/>
            <p> &nbsp; Sheep &nbsp;</p><input type="number" id="11numSheepCards" value=${origMatrix[11][2]} style="width:25px"/>
            <p> &nbsp; Stone &nbsp;</p><input type="number" id="11numStoneCards" value=${origMatrix[11][3]} style="width:25px"/>
            <p> &nbsp; Wood &nbsp;</p><input type="number" id="11numWoodCards" value=${origMatrix[11][4]} style="width:25px"/>
        </div> 

        <div style="display:flex; flex-direction:row">
            <p><b>12</b>&nbsp;&nbsp;</p>
            <p> Bricks &nbsp;</p><input type="number" id="12numBrickCards" value=${origMatrix[12][0]} style="width:25px"/>
            <p> &nbsp; Grain &nbsp;</p><input type="number" id="12numGrainCards" value=${origMatrix[12][1]} style="width:25px"/>
            <p> &nbsp; Sheep &nbsp;</p><input type="number" id="12numSheepCards" value=${origMatrix[12][2]} style="width:25px"/>
            <p> &nbsp; Stone &nbsp;</p><input type="number" id="12numStoneCards" value=${origMatrix[12][3]} style="width:25px"/>
            <p> &nbsp; Wood &nbsp;</p><input type="number" id="12numWoodCards" value=${origMatrix[12][4]} style="width:25px"/>
        </div>

    </div>
    `;
    new Dialog({
        title: "Edit Player Resource Generation",
        content: editResGenDialogTemplate,
        buttons: {
            set: {
                label: "Set",
                callback: async (html) => {
                    let resourceGenMatrix = [];
                    resourceGenMatrix[2] = 
                        [html.find("#2numBrickCards")[0].value, html.find("#2numGrainCards")[0].value ,html.find("#2numSheepCards")[0].value
                        , html.find("#2numStoneCards")[0].value, html.find("#2numWoodCards")[0].value];
                    resourceGenMatrix[3] = 
                        [html.find("#3numBrickCards")[0].value, html.find("#3numGrainCards")[0].value ,html.find("#3numSheepCards")[0].value
                        , html.find("#3numStoneCards")[0].value, html.find("#3numWoodCards")[0].value];
                    resourceGenMatrix[4] = 
                        [html.find("#4numBrickCards")[0].value, html.find("#4numGrainCards")[0].value ,html.find("#4numSheepCards")[0].value
                        , html.find("#4numStoneCards")[0].value, html.find("#4numWoodCards")[0].value];

                    resourceGenMatrix[5] = 
                        [html.find("#5numBrickCards")[0].value, html.find("#5numGrainCards")[0].value ,html.find("#5numSheepCards")[0].value
                        , html.find("#5numStoneCards")[0].value, html.find("#5numWoodCards")[0].value];
                    resourceGenMatrix[6] = 
                        [html.find("#6numBrickCards")[0].value, html.find("#6numGrainCards")[0].value ,html.find("#6numSheepCards")[0].value
                        , html.find("#6numStoneCards")[0].value, html.find("#6numWoodCards")[0].value];
                    resourceGenMatrix[8] = 
                        [html.find("#8numBrickCards")[0].value, html.find("#8numGrainCards")[0].value ,html.find("#8numSheepCards")[0].value
                        , html.find("#8numStoneCards")[0].value, html.find("#8numWoodCards")[0].value];

                    resourceGenMatrix[9] = 
                        [html.find("#9numBrickCards")[0].value, html.find("#9numGrainCards")[0].value ,html.find("#9numSheepCards")[0].value
                        , html.find("#9numStoneCards")[0].value, html.find("#9numWoodCards")[0].value];
                    resourceGenMatrix[10] = 
                        [html.find("#10numBrickCards")[0].value, html.find("#10numGrainCards")[0].value ,html.find("#10numSheepCards")[0].value
                        , html.find("#10numStoneCards")[0].value, html.find("#10numWoodCards")[0].value];
                    resourceGenMatrix[11] = 
                        [html.find("#11numBrickCards")[0].value, html.find("#11numGrainCards")[0].value ,html.find("#11numSheepCards")[0].value
                        , html.find("#11numStoneCards")[0].value, html.find("#11numWoodCards")[0].value];

                    resourceGenMatrix[12] = 
                        [html.find("#12numBrickCards")[0].value, html.find("#12numGrainCards")[0].value ,html.find("#12numSheepCards")[0].value
                        , html.find("#12numStoneCards")[0].value, html.find("#12numWoodCards")[0].value];
                        
                    await u.setFlag("catan","resourceGenMatrix",resourceGenMatrix);
                    //console.log("In dealPlayerForm callback, final dealInfo is: ");
                    //console.log(dealInfo);
                }
            }
        }
    }).render(true);
}