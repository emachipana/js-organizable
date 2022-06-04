import apiFetch from "./api-fetch.js";

export function getCards(list) {
    return list.cards;
}

export async function createCard(listId, newCard = { cardName }) {
    const cardCreated = await apiFetch(`lists/${listId}/cards`, { body: newCard });

    return cardCreated;
} 