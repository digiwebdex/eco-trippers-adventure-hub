import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const requestRef = useRef(0);

  const syncAuthState = useCallback(async (nextUser: User | null) => {
    const requestId = ++requestRef.current;

    setUser(nextUser);

    if (!nextUser) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", nextUser.id)
      .eq("role", "admin")
      .maybeSingle();

    if (requestId !== requestRef.current) return;

    setIsAdmin(!error && !!data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      void syncAuthState(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      void syncAuthState(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [syncAuthState]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, isAdmin, loading, signIn, signOut };
}
