/*  用ES5中的方法实现对象的继承   */

function A() {
    this.name1 = 'A'
    
    A.prototype.show1 = function () {
        console.log('我是A中的show方法');
    }
}

function B() {
    A.apply(this)

    this.name2 = 'B'

    B.prototype.show2 = function() {
        console.log('我是B中的show方法');
    }
}


B.prototype = Object.create(A.prototype)
B.prototype.constructor = B


// 验证继承结果

let ret = new B()

ret.show1()
ret.show2()
console.log(ret.name1, ret.name2);
