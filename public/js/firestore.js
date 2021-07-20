export const db = firebase.firestore();

// export function load_design(doc){
//     let design_json = doc.data();
//     design_json['id'] = doc.id;
//     localStorage.setItem("design-json", JSON.stringify(design_json));
//     document.getElementById('design-router.layout').click();
// }

export function create_design(){
    // todo
}

export function save_design(){
    // todo
}

export function delete_design(){
    // todo
}

export function render_design_button(doc, kb){
    let design = doc.data();
    console.log(design);
    let button = document.createElement('a');
    button.classList.add("collection-item");
    button.innerHTML = `${design.name}<i class="right material-icons">edit</i>`;
    button.addEventListener('click', 
        function(){
            console.log({design});
            kb.load_from_string(design.layout);
            document.getElementById('design-name').value = design.name;
            console.log(doc.id);
            location.hash = ''+doc.id;
            document.getElementById('design-router.edit').click();
        }  
    );
    return button
}

export function get_design_templates(kb){
    let designs = db.collection('design-templates');
    designs.get().then(
        (querySnapshot) => {
            querySnapshot.forEach( 
                function(doc){
                    let button = render_design_button(doc, kb);
                    document.getElementById('templates-collection').appendChild(button);
                }  
            );
        }
    );
}

export function get_user_designs(user, kb){
    // no designs saved yet msg?
    console.log(`getting user designs for uid:${user.uid}`);
    let designs = db.collection('user-designs').where("owner", "==", user.uid);
    designs.get().then(
        (querySnapshot) => {
            querySnapshot.forEach( 
                function(doc){
                    let button = render_design_button(doc, kb);
                    document.getElementById('user-designs-collection').appendChild(button);
                }
            );
        }
    );
}


// get_design_templates();

// const auth = firebase.auth();
// auth.onAuthStateChanged(user => {
//     document.getElementById('user-designs-collection').innerHTML = '';
//     if (user) {
//         get_user_designs(user);
//     }
// });