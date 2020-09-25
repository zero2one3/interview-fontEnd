/*  封装函数deepCopy, 实现深拷贝, 支持的类型有：基本数据类型、对象、数组、日期、正则   */

function deepCopy(obj, cache = new WeakMap()) {
    // 判断是否为引用类型
    if(!obj instanceof Object) return obj;

    // 避免循环引用
    if(cache.get(obj)) return cache.get(obj)

    // 支持函数
    if(obj instanceof Function) {
        return function() {
            obj.call(this, ...arguments)
        }
    }

    // 支持日期
    if(obj instanceof Date) return new Date(obj)

    // 支持正则
    if(obj instanceof RegExp) return new RegExp(obj.source, obj.flags)

    /*
        还可以继续添加其他支持的数据类型
    */

    // 支持数组和对象
    const res = Array.isArray(obj)? [] : {}

    // 缓存遍历过的对象
    cache.set(obj, res)

    // 遍历对象或数组
    Object.keys(obj).forEach(key => {
        if(obj[key] instanceof Object) {
            res[key] = deepCopy(obj[key], cache)
        } else {
            res[key] = obj[key]
        }
    })

    // 返回最终结果
    return res
}


// 测试代码

let a = {
    number: 1,
    string: '嘿嘿',
    regexp: new RegExp("\\d{3}", 'g'),
    date: new Date('1997-10-10'),
    arr: [1,2,3],
    obj: {
        name1: '3',
        name2: {
            inner: 3
        }
    }
}

let c = deepCopy(a);

console.log(a);
console.log(c);
