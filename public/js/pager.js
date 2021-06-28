// for each element with pager-container class
Array.from(document.getElementsByClassName("pager-container")).forEach(
    function (container){
        Array.from(container.children).forEach(
            function (button){
                // attach listener
                button.addEventListener("click", function(){
                    select_button(button);
                    hide_all_pages(container);
                    display_page(container, button.value);
                    console.log('listening to:', button);
                });
            }
        )
    }
);

let getSiblings = function (e) {
    // for collecting siblings
    let siblings = []; 
    // if no parent, return no sibling
    if(!e.parentNode) {
        return siblings;
    }
    // first child of the parent node
    let sibling  = e.parentNode.firstChild;
    
    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

function select_button(button){
    var siblings = getSiblings(button);
    for(var i in siblings){
        siblings[i].classList.remove("primary-button");
        siblings[i].classList.add("secondary-button");
    }
    button.classList.remove("secondary-button");
    button.classList.add("primary-button");
}

function hide_all_pages(container) {
    var siblings = getSiblings(container);
    for(var i in siblings){
        siblings[i].hidden = true;
    }
}

function display_page(container, id){
    var siblings = getSiblings(container);
    for(var i in siblings){
        if (siblings[i].id == id){
            siblings[i].hidden = false;
        }
    }
}