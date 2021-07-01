// for each element with pager-container class
Array.from(document.getElementsByClassName("pager-container")).forEach(
    function (container){
        Array.from(container.children).forEach( 
            function (button){
                // attach listener to each selector
                button.addEventListener("click", function(){
                    // get the name of the pager without any trailing digits
                    var pager_name = button.id.replace(/^.*:/, "").replace(/\d+$/, "");
                    var page_name = button.id.replace(/:.*$/, "");
    
                    // find all elements(pages) with an id starting with pager name + :
                    var all_pages = document.querySelectorAll(`[id^="${pager_name}:"]`);
                    var all_pagers = document.querySelectorAll(`[id*=":${pager_name}"]`);
                
                    // hide all but the selected page
                    const target_page = `${pager_name}:${page_name}`;
                    [].forEach.call(all_pages, function(page) {
                        if (page.id == target_page){
                            page.hidden = false;
                        } else {
                            page.hidden = true;
                        }
                    });
                    
                    // activate(highlight) the correct pager
                    const target_pager = `${page_name}:${pager_name}`;
                    [].forEach.call(all_pagers, function(pager) {
                        pager.id.replace(/\d+$/, "");
                        if (pager.id.replace(/\d+$/, "") == target_pager){
                            pager.classList.add("active");
                        } else {
                            pager.classList.remove("active");
                        }
                    });
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