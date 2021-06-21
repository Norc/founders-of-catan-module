import { editResourceGenForm } from './edit-resource-gen-form.js'

export const initResourceGenMatrix = async function() {
    //create the resourceLookup array as a flag for a catan game scene if it does not already exist
    //TO DO: change to be tirggered from Foundry click or scene right-click.
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

export const editResourceGenMatrix = async function(userId) {
    editResourceGenForm(userId)
};

export const resetResourceGenMatrix = async function() {
    let resourceGenMatrix = [];
    for (let i=2; i<13; i++) {
        if (i !== 7) resourceGenMatrix[i] = [0,0,0,0,0];
    }
    game.users.entries.forEach(async u => {
        await u.setFlag("catan", "resourceGenMatrix", resourceGenMatrix);
    });
};