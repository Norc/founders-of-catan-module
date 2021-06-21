//currently only resets selected decks. don't select non-deck tiles :P
canvas.tiles.controlled.forEach((element) => {
    let mod_scope = "world";
game.decks.get(element.getFlag(mod_scope,"deckID")).resetDeck();
});