/*  封装函数throttle, 实现节流   */

function throttle(func, delay=500) {
    let timer = null
    let status = false

    return function (...args) {
        
        if(status) return;
        
        status = true

        timer = setTimeout(() => {
            func.apply(this, args)
            status = false
        }, delay)

          
    }
}