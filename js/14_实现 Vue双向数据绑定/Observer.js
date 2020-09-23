import { type } from 'os'
import Dep from './Dep'

class Observer{
    constructor(data) {
        this.data = data
        this._observerAll(data)
    }
    _observerAll(obj) {
        if(typeof obj === 'object' && typeof obj !== null) {
            Object.keys(obj).forEach(key => this._bind(obj, key, obj[key]))
        }
    }
    _bind(data, key, value) {
        let _this = this

        // 为对象内的对象添加响应式
        this._observerAll(value)

        let dep = new Dep()

        Object.defineProperty(data, key, {
            get() {
                if(Dep.target) dep.on(Dep.target)
                return value
            },
            set(newValue) {
                if(newValue === value) return;    // 值未更改
                _this._observerAll(newValue)   // 若修改整个值为对象，则将对象内的所有数据加上响应式
                value = newValue
                dep.notify()            // 值更改了，通知订阅者
            }
        })
    }
}

export default Observer
