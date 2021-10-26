
import initialization from '../firebase/firebase.init';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, getAuth } from "firebase/auth";
import { useState, useEffect } from 'react';

initialization()

const useFirebase = () => {
    const [user, setUser] = useState({});

    const GoogleProvider = new GoogleAuthProvider();

    const auth = getAuth();

    // Google Sign in operation ..............
    const googleSignIn = () => {
        return signInWithPopup(auth, GoogleProvider)

    }
    // Sign Out logical section..................
    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({})
            })
    }

    // firebase observer onAuthStateChanged...................

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
            }
        })
    }, [])

    return {
        user,
        googleSignIn,
        logout
    }

}
export default useFirebase;