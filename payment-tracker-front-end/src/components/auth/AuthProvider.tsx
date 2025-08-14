import { createContext, ReactNode, useContext, useState } from "react";
import { AuthResponse, User } from "../../types/types";
import { API_URL } from "./constants";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => "" as string,
  saveUser: (userData: AuthResponse) => {},
  getRefreshToken: () => {},
  getUser: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  async function requestNewAccessToken(refreshToken: string) {
    const response = await fetch(`${API_URL}`);
  }

  function saveSession(
    userInfo: User,
    accessToken: string,
    refreshToken: string
  ) {
    setAccessToken(accessToken);
    setUser(userInfo);
    localStorage.setItem("token", JSON.stringify(refreshToken));
    setIsAuthenticated(true);
  }

  function saveUser(userData: AuthResponse) {
    saveSession(
      userData.body.user,
      userData.body.accessToken,
      userData.body.refreshToken
    );
  }

  function getAccessToken() {
    return accessToken;
  }

  function getRefreshToken(): string | null {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const token = JSON.parse(tokenData);
      return token;
    }

    return null;
  }

  function getUser() {
    return user;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        getAccessToken,
        saveUser,
        getRefreshToken,
        getUser,
        signOut,
      }}
    ></AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
