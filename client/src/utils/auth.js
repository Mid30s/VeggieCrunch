import decode from "jwt-decode";

class AuthService {
  getProfile() {
    const token = this.getToken(); // replace with how you get the token
    if (token) {
      try {
        const decodedToken = decode(token);
        if (
          decodedToken.data &&
          (decodedToken.data.role || decodedToken.data.username)
        ) {
          return decodedToken.data;
        }
      } catch (error) {
        console.error("Invalid or expired token", error);
        // handle the error, e.g. by logging out the user or showing an error message
      }
    }
    // If the token does not contain a 'role' or 'username', return a default object
    return { role: "User", username: "User" };
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  signup(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/profile");
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

// eslint-disable-next-line
export default new AuthService();
