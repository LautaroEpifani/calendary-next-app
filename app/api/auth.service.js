export class AuthService {
    static async login(user) {
      const response = await fetch(`https://calendary-app-backend.vercel.app/auth/login`, {
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
  