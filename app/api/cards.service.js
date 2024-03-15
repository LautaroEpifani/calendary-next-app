export class CardService {
  static async createCard(card) {
    const response = await fetch(`http://localhost:3001/cards/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });

    if (!response.ok) {
      const responseData = await response.json();
      if (response.status === 400) {
        throw new Error(`Validation errors: ${responseData.message[0]}`);
      } else {
        throw new Error("Error in the application:", responseData.message[0]);
      }
    } else {
      return response.json();
    }
  }

  static async getCards() {
    const response = await fetch(`http://localhost:3001/cards/cardsWithUsernames`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error when obtaining cards: ${response.statusText}`);
    }

    return response.json();
  }

  static async updateCard(id, card) {
    const response = await fetch(`http://localhost:3001/cards/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    });

    if (!response.ok) {
      throw new Error(`Error updating the card: ${response.statusText}`);
    }

    return response.json();
  }

  static async deleteCard(id) {
    const response = await fetch(`http://localhost:3001/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting card: ${response.statusText}`);
    }

    return response.json();
  }
}
