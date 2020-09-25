/*  返回对象obj中第level层次的所有键值  */

let obj = {
    name: {
        a: 1,
        b: 2,
        c: {
            o: 9,
            p: 10,
            q: 11
        }
    },
    age: {
        m: 3,
        n: 4
    }

}


function key(o, level) {
    let arr = []
    function from(ob, l) {
        Object.keys(ob).forEach(key => {
            // 将key值添加到 arr 中存储
            if(arr[l]) arr[l].push(key);
            else {
                arr[l] = [key]
            }

            if(l !== level - 1) {
                from(ob[key], l + 1)
            }
        })     
    }
    from(o, 0)
    return arr[level - 1]
    
}

// 测试代码

// 第一层：['name', 'age']
// 第二层：['a', 'b', 'c', 'm', 'n']
// 第三层：['o', 'p', 'q']
console.log(key(obj, 1));
console.log(key(obj, 2));
console.log(key(obj, 3));
