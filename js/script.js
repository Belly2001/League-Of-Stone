// Variables globales
let allCards = [];      // Toutes les cartes de l'API
let deck = [];          // Les cartes dans le deck du joueur
const MAX_DECK_SIZE = 20;

// Éléments du DOM
const championsList = document.getElementById('champions-list');
const deckList = document.getElementById('deck-list');
const deckCount = document.getElementById('deck-count');
const validateBtn = document.getElementById('validate-btn');

// Au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    fetchCards();
    validateBtn.addEventListener('click', validateDeck);
});

// Récupérer les cartes depuis l'API
async function fetchCards() {
    try {
        const response = await fetch('http://localhost:3001/cards');
        allCards = await response.json();
        displayChampions();
    } catch (error) {
        console.error('Erreur lors du chargement des cartes:', error);
        championsList.innerHTML = '<p class="loading">Erreur de chargement. Vérifiez que l\'API est lancée.</p>';
    }
}

// Afficher les champions disponibles
function displayChampions() {
    championsList.innerHTML = '';

    // Filtrer les cartes qui ne sont pas dans le deck
    const availableCards = allCards.filter(card => !deck.find(d => d.id === card.id));

    if (availableCards.length === 0) {
        championsList.innerHTML = '<p class="loading">Aucun champion disponible</p>';
        return;
    }

    availableCards.forEach(card => {
        const cardElement = createCardElement(card, 'champion');
        championsList.appendChild(cardElement);
    });
}

// Afficher le deck
function displayDeck() {
    deckList.innerHTML = '';

    if (deck.length === 0) {
        deckList.innerHTML = '<p class="empty-deck">Cliquez sur une carte pour l\'ajouter au deck</p>';
    } else {
        deck.forEach(card => {
            const cardElement = createCardElement(card, 'deck');
            deckList.appendChild(cardElement);
        });
    }

    // Mettre à jour le compteur
    deckCount.textContent = deck.length;

    // Activer/désactiver le bouton valider
    validateBtn.disabled = deck.length !== MAX_DECK_SIZE;
}

// Créer un élément carte
function createCardElement(card, type) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${card.key}_0.jpg" alt="${card.name}">
        <div class="card-info">
            <h3>${card.name}</h3>
            <div class="card-stats">
                <p>⚔️ Attaque: ${card.info.attack}</p>
                <p>🛡️ Défense: ${card.info.defense}</p>
            </div>
        </div>
    `;

    // Ajouter l'événement clic
    if (type === 'champion') {
        div.addEventListener('click', () => addToDeck(card));
    } else {
        div.addEventListener('click', () => removeFromDeck(card));
    }

    return div;
}

// Ajouter une carte au deck
function addToDeck(card) {
    if (deck.length >= MAX_DECK_SIZE) {
        alert('Le deck est plein ! (20 cartes maximum)');
        return;
    }

    deck.push(card);
    displayChampions();
    displayDeck();
}

// Supprimer une carte du deck (BONUS)
function removeFromDeck(card) {
    deck = deck.filter(c => c.id !== card.id);
    displayChampions();
    displayDeck();
}

// Valider le deck
function validateDeck() {
    if (deck.length === MAX_DECK_SIZE) {
        // Afficher message de succès
        const main = document.querySelector('main');
        main.innerHTML = `
            <div class="success-message">
                <h2>🎉 Le deck a été validé ! 🎉</h2>
                <p>Votre deck de ${MAX_DECK_SIZE} cartes est prêt pour le combat !</p>
            </div>
        `;
    }
}
