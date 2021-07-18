export class kleCursor{
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
export class KeyboardLayout{
    
    download(data, filename, type) {
        var file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }

    load_from_string(string){
        console.log({string});
        let parsed_json = JSON.parse(string);
        console.log({parsed_json});
        this.load_from_json(parsed_json);
    }

    load_from_json(layout){
        const c = new kleCursor()
        this.components = [];
        for(const row in layout){
            for(const el in layout[row]){
                if (typeof layout[row][el] == "string"){
                    this.components.push(c.getKey(c, layout[row][el]))
                } else {
                    c.update(c, layout[row][el])
                }
            }
            c.newRow(c)
        }
        this.render_html();
    }

    export_to_json(){
        console.log('trying to export creep boards file');
        // call function from download.js
        var data = 'test data';
        var filename = 'test_filename.json';
        var type = 'text/plain';
        var file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }

    render_html(){
        if(this.components === undefined){
            return;
        }
        const extremes = this.components.map(c => c.extremes());
        const min_x = Math.min( ...extremes.map(e => e.min_x));
        const max_x = Math.max( ...extremes.map(e => e.max_x));
        //const min_y = Math.min( ...extremes.map(e => e.min_y));
        const max_y = Math.max( ...extremes.map(e => e.max_y));
        
        var layout_element = document.getElementById("layout-preview");

        const win_w = layout_element.offsetWidth;
        const scale = win_w / max_x - min_x;

        var html = ''
        for(const c in this.components){
            html += this.components[c].render_html(scale)
        }
        
        layout_element.innerHTML = html;
        layout_element.style.height = `${max_y * scale}px`;
        console.log(max_y);
    }

}

// component class children:(switch, led, hole, encoder, cpu, usb-port)

export class Component{
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

    render_html(scale){
        console.log("no render function for this component");
        return ("no render function for this component");
    }
}

export class Switch extends Component{

    render_html(scale){
        const border_w = 1;
        const taper = .20;
        var u = scale;
        var body_w = this.w * u - 2*border_w;
        var body_h = this.h * u - 2*border_w;
        var surface_w = (this.w - taper)* u + border_w;
        var surface_h = (this.h - taper)* u+ border_w;
        var surface_off = (body_w - surface_w)/2;
        
        var font_size = surface_h / 4;

        var html = `
            <div class="switch-body" style="left: ${u*this.rx}px; top: ${u*this.ry}px; width: ${u*(this.w-.008)}px; height: ${u*(this.h-.008)}px;transform-origin: top left; transform: rotate(${this.r}deg) translate(${u*this.x}px,${u*this.y}px);">
                <div style="left: ${surface_off}px; top: ${surface_off/2}px; width: ${surface_w}px; height: ${surface_h}px;" class="switch-surface">
                    <div class="switch-name" style="font-size:${font_size}px; margin:${font_size/2}px;">  
                        ${this.name}
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

    corner_locations(){
        var corners = [
            [this.x,this.y], //top left
            [this.x+this.w,this.y], //top right
            [this.x+this.w,this.y+this.h], // bottom right
            [this.x,this.y+this.h], // bottom left
        ];

        if (this.r != 0){
            for(var i in corners){
                var x = corners[i][0];
                var y = corners[i][1];
                var r = this.r * Math.PI/180;
                corners[i][0]=x * Math.cos(r) - y * Math.sin(r);
                corners[i][1]=y * Math.cos(r) + x * Math.sin(r);
                corners[i][0]+= this.rx;
                corners[i][1]+= this.ry;
            }
        }
        return corners
    }

    extremes(){
        const c = this.corner_locations()
        const extreems = {
            'max_x':Math.max(c[0][0], c[1][0],c[2][0],c[3][0]),
            'min_x':Math.min(c[0][0], c[1][0],c[2][0],c[3][0]),
            'max_y':Math.max(c[0][1], c[1][1],c[2][1],c[3][1]),
            // 'min_y':Math.min(c[0][1], c[1][1],c[2][1],c[3][1])
        }
        return extreems;
    }
}

export class Led extends Component{
    
}

export class Hole extends Component{
    
}

export class Encoder extends Component{
    
}

export class Cpu extends Component{
    
}

export class Usb extends Component{
    
}

export function process_layout_file() {
    var file = document.getElementById("layout-file-upload").files[0];
    console.log(file);
    file_to_json_object(file)
}

// take json file and parse into a json object which goes into layout
export function file_to_json_object(file){
    var fr = new FileReader()
    fr.onload = function(){
        kb.load_from_json(JSON.parse(fr.result))
    }
    fr.readAsText(file);
}