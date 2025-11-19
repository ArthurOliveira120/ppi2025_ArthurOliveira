import { createContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export const SessionContext = createContext({
  //Context to manage user session
  session: null,
  sessionLoading: false,
  sessionMessage: null,
  sessionError: null,
  handleSignUp: () => {},
  handleSignIn: () => {},
  handleSignOut: () => {},
});

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [sessionMessage, setSessionMessage] = useState(null);
  const [sessionError, setSessionError] = useState(null);

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session || null);
      setSessionLoading(false);
    }

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignUp(email, password, username) {
    setSessionLoading(true);
    setSessionMessage(null);
    setSessionError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
            admin: false,
          },
        },
        emailRedirectTo: `${window.location.origin}/singin`,
      });

      if (error) throw error;

      if (data.user) {
        setSessionMessage("Registration successful, please check your email.");
        window.location.href = "/signin";
      }
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  async function handleSignIn(email, password) {
    setSessionLoading(true);
    setSessionMessage(null);
    setSessionError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        setSession(data.session);
        setSessionMessage("Sign in successful.");
      }
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  async function handleSignOut() {
    setSessionLoading(true);
    setSessionMessage(null);
    setSessionError(null);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
      setSession(null);
      window.location.href = "/";
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  const context = {
    session: session,
    sessionLoading: sessionLoading,
    sessionMessage: sessionMessage,
    sessionError: sessionError,
    handleSignUp: handleSignUp,
    handleSignIn: handleSignIn,
    handleSignOut: handleSignOut,
  }
  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
}