///// User Authentication /////

const auth = firebase.auth();

const logout = document.getElementById('logout-button');
const login = document.getElementById('login-button');

const provider = new firebase.auth.GoogleAuthProvider();

/// Sign in event handlers

login.onclick = () => auth.signInWithPopup(provider);

logout.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if (user) {
       console.log(`logged in as: ${user.displayName}. User ID: ${user.uid}`);
       login.hidden = true;
       logout.hidden = false;
    } else {
        console.log(`logged out`)
        login.hidden = false;
        logout.hidden = true;
    }
});