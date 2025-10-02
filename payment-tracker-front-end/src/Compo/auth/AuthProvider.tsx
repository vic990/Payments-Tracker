import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthResponse, User } from "../../types";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({
  isAuthenticated: false,
  saveUser: (userData: AuthResponse) => {},
  getRefreshToken: () => {},
  getUser: () => ({} as User | undefined),
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hidratar desde localStorage al montar
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
      setIsAuthenticated(true);
    }
    setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  function saveUser(userData: AuthResponse) {
    console.log(userData);
    saveSession(
      userData.body.user,
      userData.body.accessToken,
      userData.body.refreshToken
    );
  }

  function getUser() {
    return user;
  }

  function saveSession(
    userInfo: User,
    accessToken: string,
    refreshToken: string
  ) {
    // setAccessToken(accessToken)
    localStorage.setItem("token", JSON.stringify(refreshToken));
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
    setIsAuthenticated(true);
  }

  function getRefreshToken() {}

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        saveUser,
        getRefreshToken,
        getUser,
      }}
    >
      {isLoading ? <div>loading...</div> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
