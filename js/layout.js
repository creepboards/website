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
        let k = new Switch();
        k.loadFromKleCursor(c, name)
        c.state['x'] += c.state['w']
        c.state['w'] = 1
        c.state['h'] = 1
        return k
    }
}

// layout class
class KeyboardLayout{
    
    load_kle(data){
        const c = new kleCursor()
        this.components = [];
        for(const row in data){
            for(const el in data[row]){
                if (typeof data[row][el] == "string"){
                    this.components.push(c.getKey(c, data[row][el]))
                } else {
                    c.update(c, data[row][el])
                }
            }
            c.newRow(c)
        }
    }

    load_creep(){

    }

    export_creep(){

    }

    render_html(){
        var html = ''
        for(const c in this.components){
            html += this.components[c].render_html()
        }
        Array.from(document.getElementsByClassName("layout-preview")).forEach(
            function (element){
                element.innerHTML = html;
            }
        )
    }
}

// component class children:(switch, led, hole, encoder, cpu, usb-port)

class Component{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.w = 1;
        this.h = 1;
        this.name = "";
    }

    move_relative(){

    }

    move_absolute(){

    }

    render_html(){
        console.log("no render function for this component");
        return ("no render function for this component");
    }
}

class Switch extends Component{

    render_html(){
        var u = 50;
        var html = `
            <div class="switch"> 
                <div style="left: ${u*this.rx+.5}px; top: ${u*this.ry+.5}px; width: ${u*this.w-1}px; height: ${u*this.h-1}px;transform-origin: top left; transform: rotate(${this.r}deg) translate(${u*this.x}px,${u*this.y}px);" class="switch-body">
                    <div style="left: 4px; top: 4px; width: ${u*this.w-10}px; height: ${u*this.h-15}px;" class="switch-surface">
                        <div class="switch-name">  
                            ${this.name}
                        </div> 
                    </div> 
                </div>    
            </div>
        `
        return (html)
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

}

class Led extends Component{
    
}

class Hole extends Component{
    
}

class Encoder extends Component{
    
}

class Cpu extends Component{
    
}

class Usb extends Component{
    
}

// define main layout object
let kb = new KeyboardLayout();

// load and parse default layout
fetch('default_layout.json')
    .then(response => response.text())
    .then(text => kb.load_kle(JSON.parse(text)))
    .then(e => kb.render_html())
