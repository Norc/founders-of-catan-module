import { dealPlayerForm } from './deal-to-player-form.js'
import { dealRolledResources } from './deal-rolled-resources.js'

export const addCardCount = function() {
//code "inspired" by tenuki#5050 and their Response Times module
    let players = document.getElementById("player-list");
    players.addEventListener("click", function() { 
        dealRolledResources();
    });

    //console.log("Settling in...");
    //console.log(players);
    game.users.entries.forEach(element => {
        if(game.user.active === true) {
            let uId = element.data._id
            //console.log("Processing user: ");
            //console.log(uId);
            let cardSpan = document.createElement("span");
            
            //add actual card count logic here
            let cardCount = 0 
            if ( element.getFlag("cardsupport", "chbMacroMap") ) {
                cardCount = element.getFlag("cardsupport", "chbMacroMap").length -1 
            }        
            if (cardCount < 0) cardCount = 0;

            cardSpan.innerHTML = `<i id="cardCount_${uId}">${cardCount}</i>`;
            cardSpan.title = "Cards in Hand";
            cardSpan.className = "card-num";

            cardSpan.addEventListener("click", e => {
                e.stopPropagation();
                dealPlayerForm(uId);
            });
            
            let playerList = document.querySelector('li[data-user-id="' + uId + '"]');
            console.log(playerList);
            if (playerList) {
                playerList = playerList.querySelector(".player-name");
                playerList.insertAdjacentElement("afterend", cardSpan);
                //bonus: possibly add this icon to the Players header as a column to explain the number
                //<i class="fas fa-hand-paper">
            }
        }
    })
}