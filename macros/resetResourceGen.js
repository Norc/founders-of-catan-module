//resets the resources earned per tern to 0, such as for a new game.
let resourceGenMatrix = [];
for (let i=2; i<13; i++) {
    if (i !== 7) resourceGenMatrix[i] = [0,0,0,0,0];
}
game.users.entries.forEach(async u => {
    u.setFlag("catan", "resourceGenMatrix", resourceGenMatrix);
});