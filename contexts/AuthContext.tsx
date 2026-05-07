import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    type User,
} from "firebase/auth";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { auth } from "../_firebaseConfig"; // Provjeri putanju do svoje firebase konfiguracije

// Definiramo što će sve naš Context sadržavati
type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  authReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  // useEffect prati promjenu stanja prijave u stvarnom vremenu
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true); // Firebase je provjerio sesiju, aplikacija je spremna
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  // useMemo optimizira performanse kako se podaci ne bi nepotrebno osvježavali
  const value = useMemo(
    () => ({
      user,
      isLoggedIn: !!user,
      authReady,
      login,
      logout,
    }),
    [user, authReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Pomoćni hook koji ćemo koristiti u ekranima (npr. u auth.tsx)
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
}