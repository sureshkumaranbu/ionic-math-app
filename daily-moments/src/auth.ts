import React, { useContext, useEffect, useState } from "react";
import {auth as firebaseAuth} from './firebase';

interface User {
    displayName: string;
    uid: string;
}
interface Auth {
    loggedIn: boolean;
    user?: User;
}

interface AuthInit {
    loading: boolean;
    auth?: Auth;
}

export function useAuth(): Auth {
    return useContext(AuthContext);
}

export const AuthContext = React.createContext<Auth>({ loggedIn: false });
export function useAuthInit(): AuthInit {
    const [authInit, setAuthInit] = useState<AuthInit>({loading: true});
    useEffect(() => {
        return firebaseAuth.onAuthStateChanged((firebaseUser) => {
            const auth = firebaseUser ? { loggedIn: true, user: firebaseUser} : { loggedIn: false};
            setAuthInit({loading: false, auth});
        });
      }, []);
    return authInit;
}