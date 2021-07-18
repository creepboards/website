const buttons = { //1st entry defines click through; others define "active" pages and can be RE
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
    'design-router.layout':'/design/layout',
    'design-router.case':'/design/case',
    'design-router.assembly':'/design/assembly',
    'design-router.accessories':'/design/accessories',
    'design-router.checkout':'/design/checkout'
};

const paths = {
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
    '/design/layout':{
        'd':['design', 'design.layout'],
        'a':['top-nav-router.design', 'side-nav-router.design', 'design-router.layout'],
        't':'Design - Layout'
    },
    '/design/case':{
        'd':['design', 'design.case'],
        'a':['top-nav-router.design', 'side-nav-router.design', 'design-router.case'],
        't':'Design - Case'
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

function render_state(path){
    // "activate" buttons
    document.querySelectorAll(".route").forEach(
        item => item.classList.remove('active')
    );
    paths[path]['a'].forEach(
        id => document.getElementById(id).classList.add('active')
    );

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

function navigate_to(path) {
    render_state(path);
    // Finally push state change to the address bar
    window.history.pushState({path},path,path + location.hash);
}
window.onload = event => {
    // Add history push() event when boxes are clicked
    Object.keys(buttons).forEach(
        id => document.getElementById(id).addEventListener('click', 
            e => navigate_to(buttons[id])
        )
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