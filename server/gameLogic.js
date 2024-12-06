let mysteryNumber = generateMysteryNumber();
const players = {}; // Stocker les scores des joueurs

function generateMysteryNumber() {
    return Math.floor(100000 + Math.random() * 900000); // Génère un nombre à 6 chiffres
}

function resetGame() {
    mysteryNumber = generateMysteryNumber();
    for (let player in players) {
        players[player] = 0; // Réinitialiser les scores
    }
}

module.exports = { mysteryNumber, players, resetGame };
