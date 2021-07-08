const db = firebase.firestore();

let design_templates = db.collection('design-templates');

// design_templates.get().then(
//     (querySnapshot) => {
//         let templates_collection = document.getElementById('templates-collection')
//         querySnapshot.forEach((doc) => {
//             console.log(doc.id, " => ", doc.data());
//             templates_collection.innerHTML += `<a class="collection-item">${doc.data().name}<i class="right material-icons">edit</i></a>`
//         });
//     });


function get_design_templates(){
    let designs = db.collection('design-templates');
    designs.get().then(
        (querySnapshot) => {
            querySnapshot.forEach( (doc) =>
                render_design_button(doc.data(), 'templates-collection')
            );
        }
    );
}

function get_user_designs(user){
    // no designs saved yet msg?
    console.log(`getting user designs for uid:${user.uid}`);
    let designs = db.collection(user.uid);
    designs.get().then(
        (querySnapshot) => {
            querySnapshot.forEach( (doc) =>
                render_design_button(doc.data(), 'user-designs-collection')
            );
        }
    );
}


function render_design_button(design){
    console.log(design);
    let html = `<a class="collection-item">${design.name}<i class="right material-icons">edit</i></a>`;
    document.getElementById('templates-collection').innerHTML += html;
}


get_design_templates();

const auth = firebase.auth();
auth.onAuthStateChanged(user => {
    if (user) {
        get_user_designs(user);
    }
});