//create the resourceLookup array as a flag for a catan game scene if it does not already exist
//change to be tirggered from Foundry click or scene right-click.

export const initResourceGenMatrix = async function() {
    game.users.entries.forEach(async u => {
        //adds a 2D array to the user to track their resource generation. 
        //Index is the roll result (values less than 2 are irreleavant)
        //each remaining number is the number of resources the user gets for that roll.
        //Order is Order is brick, grain, sheep, stone, wood as always
        let resourceGenMatrix = [];
        for (let i=0; i<13; i++ ) {
            resourceGenMatrix.push([0,0,0,0,0])
        }
    await u.setFlag("catan","resourceGenMatrix",resourceGenMatrix);
    });
} 
