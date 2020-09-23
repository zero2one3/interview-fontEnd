class Dep{
    constructor() {
        this.Observers = []
    }
    on(observer) {
        this.Observers.push(observer)
    }
    notify() {
        this.Observers.forEach(o => o.update())
    }
}

Dep.prototype.target = null

export default Dep
