// for each element with pager-container class
Array.from(document.getElementsByClassName("pager-container")).forEach(
    function (container){
        Array.from(container.children).forEach( 
            function (button){
                // attach listener to each selector
                button.addEventListener("click", function(){
                    // get all elements with the prefix
                    var all_pages = document.querySelectorAll(`[id^="${button.parentNode.id}:"]`);
                    
                    // hide all but the selected page
                    [].forEach.call(all_pages, function(page) {
                        const target_id = `${button.parentNode.id}:${button.id}`
                        if (page.id == target_id){
                            page.hidden = false;
                        } else {
                            page.hidden = true;
                        }
                    });
                    
                    // activate the correct item
                    var all_buttons = get_siblings(button)
                    for(var i in all_buttons){
                        all_buttons[i].classList.remove("active");
                    }
                    button.classList.add("active");
                });
            }
        )
    }
);

let get_siblings = function (e) {
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