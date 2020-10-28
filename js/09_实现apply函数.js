/*   在函数原型上封装myApply函数 , 实现和原生apply函数一样的效果   */

Function.prototype.myApply = function(context) {

    // 存储要转移的目标对象
    let _this = context? Object(context) : window

    // 在转移this的对象上设定一个独一无二的属性 , 并将函数赋值给它
    let key = Symbol('key')
    _this[key] = this

    // 将数组里存储的参数拆分开，作为参数调用函数
    let res = arguments[1]? _this[key](...arguments[1]) : _this[key]()

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

showName.myApply(obj, [7, 8, 9])
