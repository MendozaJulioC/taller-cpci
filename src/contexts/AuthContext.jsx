"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";

const AuthContext = createContext();

// Evento interno para avisar a los suscriptores cuando login/logout
// cambian localStorage en la misma pestaña (el evento "storage" nativo
// del navegador solo se dispara en OTRAS pestañas, no en la actual).
const AUTH_EVENT = "auth-changed";

function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_EVENT, callback);
  };
}

function getTokenSnapshot() {
  return localStorage.getItem("token");
}

function getUsuarioSnapshot() {
  return localStorage.getItem("usuario");
}

// Snapshot que se usa en el servidor (y en el primer render del cliente,
// antes de hidratar). Siempre null => servidor y cliente arrancan iguales.
function getServerSnapshot() {
  return null;
}

export function AuthProvider({ children }) {
  // useSyncExternalStore se encarga de:
  // 1) Devolver getServerSnapshot() durante el render en servidor y en el
  //    primer render del cliente (evita el hydration mismatch).
  // 2) Justo después de hidratar, comparar contra el valor real del cliente
  //    y, si difiere, forzar un re-render ANTES de que el navegador pinte
  //    (evita el parpadeo login -> usuario logueado).
  // 3) Re-renderizar automáticamente cuando se dispare AUTH_EVENT o "storage".
  const token = useSyncExternalStore(subscribe, getTokenSnapshot, getServerSnapshot);
  const usuarioRaw = useSyncExternalStore(subscribe, getUsuarioSnapshot, getServerSnapshot);

  let usuario = null;
  if (usuarioRaw) {
    try {
      usuario = JSON.parse(usuarioRaw);
    } catch {
      usuario = null;
    }
  }

  const login = useCallback((newToken, newUsuario) => {
    console.log('🔐 AuthContext - Login - Token:', newToken);
    console.log('🔐 AuthContext - Login - Usuario:', newUsuario);
    console.log('🔐 AuthContext - Login - Rol del usuario:', newUsuario?.rol);
    
    localStorage.setItem("token", newToken);
    localStorage.setItem("usuario", JSON.stringify(newUsuario));
    window.dispatchEvent(new Event(AUTH_EVENT));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.dispatchEvent(new Event(AUTH_EVENT));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        isAuthenticated: !!token,
        // Con useSyncExternalStore el valor real ya está resuelto antes
        // de pintar, así que no hay una fase de "cargando" que exponer.
        loading: false,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}