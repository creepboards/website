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

// layout class
class KeyboardLayout{
    
    load_kle(data){
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

    load_creep(){

    }

    export_creep(){

    }

    render_html(){

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

    }
}

class Switch extends Component{

    render_html(rb, k, u, off_x, off_y){
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