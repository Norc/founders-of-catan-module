canvas.tiles.controlled.forEach((element) => {
    let mod_scope = "world";
    // Add Card to Discard for the Deck
    let deckId = game.journal.get(element.data.flags[mod_scope].cardID).data['folder'];
    game.decks.get(deckId).discardCard(element.data.flags[mod_scope].cardID);
    
    // Delete Tile
    element.delete();
});