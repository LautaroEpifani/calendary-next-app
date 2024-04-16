export class UsersService {
    static async getUsers() {
      const response = await fetch(`https://calendary-app-backend.vercel.app/users/`, {
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
  