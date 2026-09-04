'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AdminUser } from '@/types/admin';

interface AuthContextValue {
  user: User | null;
  adminUser: AdminUser | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsDemo: () => void;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_USER_KEY = 'asthapay_admin_demo_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to check if email is admin
  const isEmailAdmin = (email: string | null | undefined): boolean => {
    if (!email) return false;
    const allowedEnv = process.env.NEXT_PUBLIC_ADMIN_ALLOWED_EMAILS || 'admin@yourdomain.com,sales@yourdomain.com,admin@asthapay.com,demo@asthapay.com';
    const allowedList = allowedEnv.split(',').map((e) => e.trim().toLowerCase());
    return allowedList.includes(email.toLowerCase());
  };

  useEffect(() => {
    // Check if there is an active demo session first
    if (typeof window !== 'undefined') {
      const demoSession = localStorage.getItem(DEMO_USER_KEY);
      if (demoSession) {
        try {
          const parsed = JSON.parse(demoSession);
          setAdminUser(parsed);
          setLoading(false);
          return;
        } catch {
          localStorage.removeItem(DEMO_USER_KEY);
        }
      }
    }

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let isAdmin = false;
        try {
          const idTokenResult = await firebaseUser.getIdTokenResult(true);
          isAdmin = idTokenResult.claims.admin === true || isEmailAdmin(firebaseUser.email);
        } catch {
          isAdmin = isEmailAdmin(firebaseUser.email);
        }

        setUser(firebaseUser);
        setAdminUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || 'admin@asthapay.com',
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Admin',
          photoURL: firebaseUser.photoURL || undefined,
          isAdmin,
        });
      } else {
        // If not in demo mode
        if (typeof window !== 'undefined' && !localStorage.getItem(DEMO_USER_KEY)) {
          setUser(null);
          setAdminUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    setError(null);
    try {
      if (!auth) throw new Error('Firebase Auth is not initialized');
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const isAllowed = isEmailAdmin(cred.user.email);
      if (!isAllowed) {
        await signOut(auth);
        throw new Error('Access denied: Your email is not authorized as an administrator.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      const cleanMsg = message.replace('Firebase: ', '').replace(/ \(auth\/.+\)\./, '');
      setError(cleanMsg);
      throw new Error(cleanMsg);
    }
  };

  const loginWithGoogle = async () => {
    setError(null);
    try {
      if (!auth) throw new Error('Firebase Auth is not initialized');
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      const isAllowed = isEmailAdmin(cred.user.email);
      if (!isAllowed) {
        await signOut(auth);
        throw new Error('Access denied: Your Google account is not authorized as an administrator.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Google login failed';
      const cleanMsg = message.replace('Firebase: ', '').replace(/ \(auth\/.+\)\./, '');
      setError(cleanMsg);
      throw new Error(cleanMsg);
    }
  };

  const loginAsDemo = () => {
    const demoAdmin: AdminUser = {
      uid: 'demo-admin-001',
      email: 'demo@asthapay.com',
      displayName: 'AsthaPay Ops Admin',
      isAdmin: true,
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoAdmin));
    }
    setAdminUser(demoAdmin);
    setError(null);
  };

  const logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DEMO_USER_KEY);
    }
    setAdminUser(null);
    setUser(null);
    if (auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.error('Sign out error:', e);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        adminUser,
        loading,
        isAdmin: adminUser?.isAdmin ?? false,
        loginWithEmail,
        loginWithGoogle,
        loginAsDemo,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
