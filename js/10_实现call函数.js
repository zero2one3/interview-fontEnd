/*   在函数原型上封装myCall函数 , 实现和原生call函数一样的效果   */

Function.prototype.myCall = function(context) {

    // 存储要转移的目标对象
    let _this = context? Object(context) : window

    // 在转移this的对象上设定一个独一无二的属性 , 并将函数赋值给它
    let key = Symbol('key')
    _this[key] = this
    
    // 创建空数组，存储多个传入参数
    let args = []
    
    // 将所有传入的参数添加到新数组中
    for(let i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
    }

    // 将新数组拆开作为多个参数传入，并调用函数
    let res = _this[key](...args)

    // 删除
    delete _this[key]

    // 返回函数返回值
    return res
}



// 测试代码
let obj = {
    'name': '张三'
}

function showName(first, second, third) {
    console.log(first, second, third);
    console.log(this.name);
}

showName.myCall(obj, 7, 8, 9)