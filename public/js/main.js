import * as db from './firestore.js';
import * as layout from './layout.js';

const auth = firebase.auth();

// define main keyboard object
let kb = new layout.KeyboardLayout();

db.get_design_templates(kb);

auth.onAuthStateChanged(user => {
    document.getElementById('user-designs-collection').innerHTML = '';
    if (user) {
        db.get_user_designs(user, kb);
    }
});

window.onresize = function(event) {
    kb.render_html();
}

// this is required so the keyboard will render when someone navigates to where it is visable
window.onclick = function(event) {
    kb.render_html();
}