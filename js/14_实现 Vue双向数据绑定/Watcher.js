import Dep from './Dep'

class Watcher{
    constructor(node, obj ,vm) {
        this.node = node
        this.obj = obj.each
        this.vm = vm
        Dep.target = this
        this.string = 'vm._data'
        for(let i in this.obj) {
            this.string += `['${this.obj[i]}']`
        }
        let newVal = eval(this.string)
        Dep.target = null
        this.update()
    }
    update() {
        this.node.nodeValue = eval(`this.${this.string}`)
    }
}

export default Watcher