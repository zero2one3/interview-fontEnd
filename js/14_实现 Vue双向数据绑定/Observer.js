import Dep from './Dep'

class Observer{
    constructor(data) {
        this.data = data
        Object.keys(data).forEach(key => this._bind(data, key, data[key]))
    }
    _bind(data, key, value) {
        let dep = new Dep()
        
        Object.defineProperty(data, key, {
            get() {
                if(Dep.target) dep.on(Dep.target)
                return value
            },
            set(newValue) {
                if(newValue === value) return;    // 值未更改

                value = newValue
                dep.notify()            // 值更改了，通知订阅者
            }
        })
    }
}

export default Observer
