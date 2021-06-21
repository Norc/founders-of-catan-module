import { addCardCount } from './scripts/playerlist.js'
import { initResourceGenMatrix } from './scripts/resource-gen.js'

Hooks.once('ready', () => {
  console.log("Ready to settle?");
  //create resourceLookup array if it does not exist already
  if ( game.scenes.active.name === "Catan" || game.scenes.active.name === "Catan 5-6" ) {
    //only run this on new game
    //initResourceGenMatrix();
  }
});

Hooks.on('renderPlayerList', (app, html, data) => {
  //add card count and click handler to Players List
	console.log("renderPlayerList called");
	addCardCount();
})