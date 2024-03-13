export class AuthService {
    static async login(user) {
      const response = await fetch(`http://localhost:3001/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error(`Error authenticating user: ${response.statusText}`);
      }
  
      return response.json();
    }
  }
  