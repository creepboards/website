///// User Authentication /////

const auth = firebase.auth();

const logout = document.getElementById('logout-button');
const login = document.getElementById('login-button');
const logout2 = document.getElementById('logout-button2');
const login2 = document.getElementById('login-button2');

const provider = new firebase.auth.GoogleAuthProvider();

/// Sign in event handlers

login.onclick = () => auth.signInWithPopup(provider);

logout.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if (user) {
       console.log(`logged in as: ${user.displayName}. User ID: ${user.uid}`);
       login.hidden = true;
       logout.hidden = false;
       login2.hidden = true;
       logout2.hidden = false;
    } else {
        console.log(`logged out`)
        login.hidden = false;
        logout.hidden = true;
        login2.hidden = false;
        logout2.hidden = true;
    }
});