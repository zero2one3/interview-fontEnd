import Observer from './Observer'
import Compiler from './Compiler'

class Vue{
    constructor(options) {
        this.$options = options
        this._data = this.$options.data
        this.$el = this.$options.el
        Object.keys(this._data).forEach(key => this._proxy(key))

        new Observer(this._data)
        new Compiler(this.$el, this)
    }
    _proxy(key) {
        let _this = this
        Object.defineProperty(this, key, {
            get() {
                return _this._data[key]
            },
            set(value) {
                return _this._data[key] = value
            }
        })
    }
}

export default Vue
