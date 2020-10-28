/*   在函数原型上封装myBind函数 , 实现和原生bind函数一样的效果   */

Function.prototype.myBind = function(context) {

    // 存储要转移的目标对象
    let _this = context? Object(context) : window

    // 在转移this的对象上设定一个独一无二的属性 , 并将函数赋值给它
    let key = Symbol('key')
    _this[key] = this

    let args = arguments.length > 1 ? [...arguments].slice(1) : []

    // 创建函数闭包
    return function() {

        // 将所有参数先拆分开，再添加到新数组中，以此来支持多参数传入以及数组参数传入的需求
        args = args.concat([...arguments])

        // 调用函数
        let res = _this[key](...args)

        // 删除
        delete _this[key]

        // 返回函数返回值
        return res
    }
}


// 测试代码
let obj = {
    'name': '张三'
}

function showName(first, second, third) {
    console.log(first, second, third);
    console.log(this.name);
}

showName.myBind(obj, 7)(8, 9)