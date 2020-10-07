/*  函数柯里化：将一个接收多个参数的函数变为接收任意参数返回一个函数的形式，便于之后继续调用，直到最后一次调用，才返回结果值  
    例子：有一个add函数，用于返回所有参数的和，add(1, 2, 3, 4, 5) 返回的是15
          现在要将其变为类似 add(1)(2)(3)(4)(5) 或者 add(1)(2, 3, 4)(5) 的形式，并且功能相同
*/

// 普通的 add() 函数
function add() {
    let sum = 0
    let args = [...arguments]
    for(let i in args) {
        sum += args[i]
    }
    return sum
}

/* 第一种add()函数柯里化方式
   缺点：最后返回的结果是函数类型，但会被隐式转化为字符串，调用toString方法
*/
function add1() {
    // 创建数组，用于存放之后接收的所有参数
    let args = [...arguments]
    
    function getArgs() {
        args.push(...arguments)
        return getArgs
    }

    getArgs.toString = function() {
        return args.reduce((a, b) => {
            return a + b
        })
    }

    return getArgs
}


/* 第二种add()函数柯里化方式
   缺点：需要在最后再自调用一次，即不传参调用表示已没有参数了
*/
function add2() {
    let args = [...arguments]

    return function() {
        if(arguments.length == 0) {
            return args.reduce((a, b) => {
                return a + b
            })
        } else {
            let _args = [...arguments]
            for(let i = 0; i < _args.length; i++) {
                args.push(_args[i])
            }
            return arguments.callee
        }
    }
}

/* 第三种add()函数柯里化方式
   缺点：在刚开始传参之前，设定总共需要传入参数的个数
*/
function curry(length) {

    let args = [...arguments].slice(1)

    return function() {
        args = args.concat([...arguments])
        if(arguments.length < length) {
            return curry.apply(this, [length - arguments.length].concat(args))
        } else {
            return args.reduce((a, b) => a + b)
        }
    }
}

// 测试代码
let res = add(1, 2, 3, 4, 5)
let res1 = add1(1)(2)(3)(4)(5)
let res2 = add2(1)(2, 3, 4)(5)()
let res3 = curry(5)

console.log(res);
console.log(res1);
console.log(res2);
console.log(res3(1)(2, 3)(4)(5));