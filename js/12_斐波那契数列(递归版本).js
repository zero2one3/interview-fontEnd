/*   递归实现斐波那契数列   */

function fibonacci1(n) {
    if(n === 1 | n === 2) return 1;

    return fibonacci1(n - 1) + fibonacci1(n - 2)
}

/*   高效地实现斐波那契数列   */
function fibonacci2(n) {
    let arr = [1, 1]

    for(let i = 2; i < n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2]
    }

    return arr[n - 1]
    
}


// 测试两种函数的效率

let start1 = Date.now()
console.log(fibonacci1(40))
let end1 = Date.now()

let start2 = Date.now()
console.log(fibonacci2(40));
let end2 = Date.now()

console.log(`
低效率所用时间：${end1 - start1} ms
高效率所用时间：${end2 - start2} ms
`);
