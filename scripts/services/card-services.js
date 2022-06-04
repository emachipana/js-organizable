import apiFetch from "./api-fetch.js";

export async function createCard(listId, newCard = { cardName }) {
    const cardCreated = await apiFetch(`lists/${listId}/cards`, { body: newCard });

    return cardCreated; // retorna listId tambien
} 

export async function deleteCard(listId, cardId) {
    await apiFetch(`lists/${listId}/cards/${cardId}`, { method: "DELETE" });
}

export async function updateCardOrder(listId, data = { ids }) {
    await apiFetch(`lists/${listId}/cards/sort`, { body: data });
}