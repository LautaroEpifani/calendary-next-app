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
          throw new Error(`Errores de validación: ${responseData.message[0]}`);
        } else {
          throw new Error("Error en la solicitud:", responseData);
        }
      } else {
        return response.json();
      }
  }

  static async getCards() {
    const response = await fetch(`http://localhost:3001/cards/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener las tarjetas: ${response.statusText}`);
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
      throw new Error(`Error al actualizar la tarjeta: ${response.statusText}`);
    }

    return response.json();
  }
}
