
class key{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.rx = 0;
        this.ry = 0;
        this.w = 1;
        this.h = 1;
        this.name = "";
    }
    
    loadFromKleCursor(c, name){
        this.x = c.state.x;
        this.y = c.state.y;
        this.r = c.state.r;
        this.rx = c.state.rx;
        this.ry = c.state.ry;
        this.w = c.state.w;
        this.h = c.state.h;
        this.name = name;
    }

    render(rb, k, u, off_x, off_y){
        var keyContainer = document.createElement("div");
        keyContainer.classList = "key-container";

        keyContainer.style = `
            left:${u*k.rx + off_x};
            top:${u*k.ry + off_y};
            transform-origin: top left;
            transform: rotate(${k.r}deg) translate(${u*k.x}px,${u*k.y}px);
            width:${u*k.w};
            height:${u*k.h};
        `;

        var key = document.createElement("div");
        key.classList = "key"
        key.innerText = k.name;

        keyContainer.appendChild(key);
        rb.appendChild(keyContainer);
    }
}

class kleCursor{
    constructor(){
        this.state = {
            'x': 0,
            'y': 0,
            'w': 1,
            'h': 1,
            'rx':0,
            'ry':0,
            'r':0
        }
    }

    update(c, d){
        if('rx' in d || 'ry' in d){
            c.state['y'] = 0
            c.state['x'] = 0
        }
        if('x' in d){
            d['x'] += c.state['x']
        }
        if('y' in d){
            d['y'] += c.state['y']
        }
        for(var key in d){
            c.state[key] = d[key]
        }
    }

    newRow(c){
        c.state['x'] = 0
        c.state['y'] += 1
    }

    getKey(c, name = ""){
        let k = new key();
        k.loadFromKleCursor(c, name)
        c.state['x'] += c.state['w']
        c.state['w'] = 1
        c.state['h'] = 1
        return k
    }
}


class layout{
    constructor(){
        this.keys = [];
    }

    load_from_KLE(data){
        const c = new kleCursor()
        this.keys = [];
        for(const row in data){
            for(const el in data[row]){
                if (typeof data[row][el] == "string"){
                    this.keys.push(c.getKey(c, data[row][el]))
                } else {
                    c.update(c, data[row][el])
                }
            }
            c.newRow(c)
        }
    }

    load_from_CREEP(data){

    }

    export_to_CREEP(){

    }

    export_to_KLE(){

    }
    
    render(l, render_box){
        const u = document.getElementById("scale").value;
        render_box.innerHTML = '';
        var mx = 0
        var my = 0
        for(var k in l.keys){
            mx = Math.max(mx, l.keys[k].rx + l.keys[k].x + l.keys[k].w)
            my = Math.max(my, l.keys[k].ry + l.keys[k].y + l.keys[k].h)
        }
        var off_x = (render_box.offsetWidth - mx*u) / 2
        var off_y = (render_box.offsetHeight  - my*u) / 2
        
        for(var k in l.keys){
            l.keys[k].render(render_box, l.keys[k], u, off_x, off_y)
        }
    }

}


let kb = new layout();

fetch('default_layout.json')
    .then(response => response.text())
    .then(text => kb.load_from_KLE(JSON.parse(text)))
    .then(e => kb.render(kb, document.getElementById("layout")))





// when file is uploaded call parseJsonFile
const KLEfileSelector = document.getElementById('KLE-input-file');
KLEfileSelector.addEventListener('change', (event) => {
    const fileList = KLEfileSelector.files;
    parseJsonFile(fileList[0])
});

// take json file and parse into a json object which goes into layout
function parseJsonFile(file){
    fr = new FileReader()
    fr.onload = function(){
        kb.load_from_KLE(JSON.parse(fr.result))
        var layout = document.getElementById("layout");
        kb.render(kb, layout)
    }
    fr.readAsText(file)
}

// When the scale slider is moved re-draw the layout with the new scale
const scale = document.getElementById('scale');
scale.addEventListener('change', (event) => {
    var layout = document.getElementById("layout");
    kb.render(kb, layout)
});

