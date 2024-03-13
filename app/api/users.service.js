export class UsersService {
    static async getUsers() {
      const response = await fetch(`http://localhost:3001/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error obtaining users: ${response.statusText}`);
      }
  
      return response.json();
    }
  }
  