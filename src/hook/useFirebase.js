
import initialization from '../firebase/firebase.init';
import { signInWithPopup, signOut, onAuthStateChanged, getIdToken, GoogleAuthProvider, getAuth } from "firebase/auth";
import { useState, useEffect } from 'react';

initialization()

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    const GoogleProvider = new GoogleAuthProvider();

    const auth = getAuth();

    // Google Sign in operation ..............
    const googleSignIn = () => {
        setIsLoading(true)
        return signInWithPopup(auth, GoogleProvider)

    }
    // Sign Out logical section..................
    const logout = () => {
        setIsLoading(true)
        signOut(auth)
            .then(() => {
                setUser({})
            })
            .finally(() => setIsLoading(false))
    }

    // firebase observer onAuthStateChanged...................

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                getIdToken(user)
                    .then(idToken => localStorage.setItem("idToken", idToken))
                setUser(user)
            }
            else {
                setUser({})
            }
            setIsLoading(false)
        })
    }, [])

    return {
        user,
        googleSignIn,
        logout,
        setIsLoading,
        isLoading
    }

}
export default useFirebase;