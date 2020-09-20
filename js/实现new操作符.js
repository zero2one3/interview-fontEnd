/*  封装函数MyNew, 实现new操作符的效果   */

function MyNew() {
    let obj = {}

    let Constructor = [].shift.call(arguments)

    obj.__proto__ = Constructor.prototype

    let result = Constructor.call(obj, arguments)

    return typeof result === 'object'? result : obj
}
