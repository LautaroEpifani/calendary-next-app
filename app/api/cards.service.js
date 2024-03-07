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
      throw new Error(`Error al actualizar la tarjeta: ${response.statusText}`);
    }

    return response.json();
  }
}
