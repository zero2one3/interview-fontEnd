/*  封装函数isInstanceOf, 实现instanceof操作符的效果   */

function isInstanceOf(left, right) {

    let prototype = right.prototype
    let _proto = left.__proto__
    
    while(_proto) {
        if(_proto === prototype) return true;
        _proto = _proto.__proto__
    }

    return false
}
