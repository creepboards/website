export const buttons = { //1st entry defines click through; others define "active" pages and can be RE
    'top-nav-router.home':'/',
    'top-nav-router.design':'/design/open',
    'top-nav-router.about':'/about',
    'top-nav-router.documentation':'/documentation',
    
    'side-nav-router.home':'/',
    'side-nav-router.design':'/design/open',
    'side-nav-router.about':'/about',
    'side-nav-router.documentation':'/documentation',

    'button.start-your-design':'/design/open',

    'design-router.open':'/design/open',
    'design-router.edit':'/design/edit/settings',
    'design-router.assembly':'/design/assembly',
    'design-router.accessories':'/design/accessories',
    'design-router.checkout':'/design/checkout',

    'edit-router.settings':'/design/edit/settings',
    'edit-router.switches':'/design/edit/switches',
    'edit-router.case':'/design/edit/case',
    'edit-router.leds':'/design/edit/leds',
    'edit-router.encoders':'/design/edit/encoders'
};

export const paths = {
    '/':{
        'd':['home'],
        'a':['top-nav-router.home', 'side-nav-router.home'],
        't':'Home'
    },
    '/design/open':{
        'd':['design', 'design.open'],
        'a':['top-nav-router.design', 'side-nav-router.design', 'design-router.open'],
        't':'Design - Open A Design'
    },
    '/design/edit/settings':{
        'd':['design', 'design.edit', 'design.edit.settings'],
        'a':['top-nav-router.design', 'side-nav-router.design', 'design-router.edit', 'edit-router.settings'],
        't':'Design - Edit'
    },
    '/design/edit/case':{
        'd':['design', 'design.edit', 'design.edit.case'],
        'a':['top-nav-router.design', 'side-nav-router.design', 'design-router.edit', 'edit-router.case'],
        't':'Design - Edit'
    },
    '/design/edit/switches':{
        'd':['design', 'design.edit', 'design.edit.switches'],
        'a':['top-nav-router.design', 'side-nav-router.design', 'design-router.edit', 'edit-router.switches'],
        't':'Design - Edit'
    },
    '/design/edit/leds':{
        'd':['design', 'design.edit', 'design.edit.leds'],
        'a':['top-nav-router.design', 'side-nav-router.design', 'design-router.edit', 'edit-router.leds'],
        't':'Design - Edit'
    },
    '/design/edit/encoders':{
        'd':['design', 'design.edit', 'design.edit.encoders'],
        'a':['top-nav-router.design', 'side-nav-router.design', 'design-router.edit', 'edit-router.encoders'],
        't':'Design - Edit'
    },
    '/design/assembly':{
        'd':['design', 'design.assembly'],
        'a':['top-nav-router.design', 'side-nav-router.design', 'design-router.assembly'],
        't':'Design - Assembly'
    },
    '/design/accessories':{
        'd':['design', 'design.accessories'],
        'a':['top-nav-router.design', 'side-nav-router.design', 'design-router.accessories'],
        't':'Design - Accessories'
    },
    '/design/checkout':{
        'd':['design', 'design.checkout'],
        'a':['top-nav-router.design', 'side-nav-router.design', 'design-router.checkout'],
        't':'Design - Checkout'
    },
    '/about':{
        'd':['about'],
        'a':['top-nav-router.about', 'side-nav-router.about'],
        't':'About'
    },
    '/documentation':{
        'd':['documentation'],
        'a':['top-nav-router.documentation', 'side-nav-router.documentation'],
        't':'Documentation'
    },
};

export function render_state(path){
    // "activate" buttons
    document.querySelectorAll(".route").forEach(
        item => item.classList.remove('active')
    );
    if(path in paths){
        paths[path]['a'].forEach(
            function(id){
                try {
                    document.getElementById(id).classList.add('active')
                } catch(e){
                    console.error('failed to add active class to: '+id);
                }
            }
        );
    } else {
        console.error(path + ' is not in defined paths');
    }

    // hide/show pages
    document.querySelectorAll(".page").forEach(
        item => item.hidden = true
    );
    paths[path]['d'].forEach(
        id => document.getElementById(id).hidden = false
    );

    // set title of page
    document.title = paths[path]['t'];
};

export function navigate_to(path) {
    render_state(path);
    window.history.pushState({path},path,path + hash);
}

window.onload = event => {
    // Add history push() event when boxes are clicked
    Object.keys(buttons).forEach( 
        function(id){
            try{
                document.getElementById(id).addEventListener('click', e => navigate_to(buttons[id]))
            } catch(e){
                console.error('failed to add listener to: '+id);
            }
        }
    );
    navigate_to(window.location.pathname);
}
// Listen for PopStateEvent
// (Back or Forward buttons are clicked)
window.addEventListener("popstate", event => {
    try{
        render_state(event.state.path);
    } catch (error){}

});