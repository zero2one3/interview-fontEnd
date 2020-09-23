import Watcher from './Watcher'
const REG = /\{\{(.*)\}\}/

class Compiler{
    constructor(el, vm) {
        this.el = document.querySelector(el)
        this.vm = vm

        this.frag = this._createFragment()

        this.el.appendChild(this.frag)
    }
    _createFragment() {
        let frag = document.createDocumentFragment()
        let child
        while (child = this.el.firstChild) {
            this._complie(child)
            frag.appendChild(child)
        }

        return frag
    }
    _getAllNames(value) {
        
        let string = value.replace(/\./g, ',')

        while(string.match(/\[/) && string.match(/\]/)) {
            string = string.replace(/\[/, ',')
            string = string.replace(/\]/, '')
        }

        let ret = string.match(/'|"/)

        while(ret) {
            string = string.replace(/'|"/, '')

            ret = string.match(/'|"/)
        }

        let res = string.split(',')

        return res

    } 
    _complie(node) {
        let _this = this
        if(node.nodeType === 1) {
            let attr = node.attributes
            if(attr.hasOwnProperty('v-model')) {
                let name = attr['v-model'].value
                let string = '_this.vm'
                let arr = [...this._getAllNames(name)]
                for(let i in arr) {
                    string += `['${arr[i]}']`
                }
                node.oninput = function(e) {
                    eval(`${string} = e.target.value`)
                }
                console.log(string);
                node.value = eval(string)
            }
            
        } else if(node.nodeType === 3) {
            let ret_totale = node.nodeValue.match(REG)
            if(!ret_totale) return;

            let string = ret_totale[1]
            string = string.trim()  
            
            let obj = {
                each: []
            }
            
            let allNames = this._getAllNames(string)
            obj.each = [...allNames]
            
            new Watcher(node, obj, this.vm)
            
            
            
        }
    }
}

export default Compiler
