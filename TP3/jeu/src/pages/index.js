// src/pages/index.js

import Head from "next/head";
import useCards from "@/hooks/useCards";

export default function Home() {
  const {
    availableCards,
    deck,
    loading,
    error,
    validated,
    addToDeck,
    removeFromDeck,
    validateDeck,
    MAX_DECK_SIZE
  } = useCards();

  // Si deck validé
  if (validated) {
    return (
      <>
        <Head>
          <title>League of Stones - Deck Validé !</title>
        </Head>
        <header>
          <h1>League of Stones</h1>
        </header>
        <main>
          <div className="success-message">
            <h2>🎉 Le deck a été validé ! 🎉</h2>
            <p>Votre deck de {MAX_DECK_SIZE} cartes est prêt pour le combat !</p>
          </div>
        </main>
        <footer>
          <p>Copyright © Web2 L3 UT2J</p>
        </footer>
      </>
    );
  }

  // Affichage principal
  return (
    <>
      <Head>
        <title>League of Stones - Deck Builder</title>
      </Head>

      <header>
        <h1>League of Stones</h1>
      </header>

      <main>
        {/* Champions disponibles */}
        <section className="champions-section">
          <h2>Champions disponibles</h2>
          <div className="cards-grid">
            {loading && <p className="loading">Chargement des champions...</p>}
            {error && <p className="loading">{error}</p>}
            
            {!loading && !error && availableCards.map(card => (
              <div key={card.id} className="card" onClick={() => addToDeck(card)}>
                <img 
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${card.key}_0.jpg`}
                  alt={card.name} 
                />
                <div className="card-info">
                  <h3>{card.name}</h3>
                  <div className="card-stats">
                    <p>⚔️ Attaque: {card.info.attack}</p>
                    <p>🛡️ Défense: {card.info.defense}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mon deck */}
        <section className="deck-section">
          <h2>Mon Deck (<span>{deck.length}</span>/20)</h2>
          <div className="cards-grid">
            {deck.length === 0 && (
              <p className="empty-deck">Cliquez sur une carte pour l ajouter au deck</p>
            )}
            
            {deck.map(card => (
              <div key={card.id} className="card" onClick={() => removeFromDeck(card)}>
                <img 
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${card.key}_0.jpg`}
                  alt={card.name} 
                />
                <div className="card-info">
                  <h3>{card.name}</h3>
                  <div className="card-stats">
                    <p>⚔️ Attaque: {card.info.attack}</p>
                    <p>🛡️ Défense: {card.info.defense}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="btn-validate" 
            disabled={deck.length !== MAX_DECK_SIZE}
            onClick={validateDeck}
          >
            Valider le deck
          </button>
        </section>
      </main>

      <footer>
        <p>Copyright © Web2 L3 UT2J</p>
      </footer>
    </>
  );
}