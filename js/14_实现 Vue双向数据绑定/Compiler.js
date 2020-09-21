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
    _complie(node) {
        let _this = this
        if(node.nodeType === 1) {
            let attr = node.attributes
            if(attr.hasOwnProperty('v-model')) {
                let name = attr['v-model'].value
                node.oninput = function(e) {
                    _this.vm[name] = e.target.value
                }
                node.value = this.vm[name]
            }
            
        } else if(node.nodeType === 3) {
            let ret = node.nodeValue.match(REG)
            if(ret) {
                let name = ret[1]
                name = name.trim()
                new Watcher(node, name, this.vm)
            }
        }
    }
}

export default Compiler
