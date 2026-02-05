// src/hooks/useCards.js

import { useState, useEffect } from "react";

const MAX_DECK_SIZE = 20;

export default function useCards() {
  const [allCards, setAllCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  // ===== Chargement au démarrage =====
  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch('http://localhost:3001/cards');
        const data = await response.json();
        setAllCards(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur:', error);
        setError("Erreur de chargement. Vérifiez que l'API est lancée.");
        setLoading(false);
      }
    }

    fetchCards();
  }, []);

  // ===== Ajouter au deck =====
  function addToDeck(card) {
    if (deck.length >= MAX_DECK_SIZE) {
      alert('Le deck est plein ! (20 cartes maximum)');
      return;
    }
    setDeck([...deck, card]);
  }

  // ===== Retirer du deck =====
  function removeFromDeck(card) {
    setDeck(deck.filter(c => c.id !== card.id));
  }

  // ===== Valider le deck =====
  function validateDeck() {
    if (deck.length === MAX_DECK_SIZE) {
      setValidated(true);
    }
  }

  // ===== Cartes disponibles =====
  const availableCards = allCards.filter(card => !deck.find(d => d.id === card.id));

  return {
    availableCards,
    deck,
    loading,
    error,
    validated,
    addToDeck,
    removeFromDeck,
    validateDeck,
    MAX_DECK_SIZE
  };
}