/*  封装函数debounce, 实现防抖   */

function debounce(func, delay=500) {
    let timer = null

    return function(...arg) {
        if(timer) clearTimeout(timer);

        timer = setTimeout(() => {
            func.apply(this, arg)
        }, delay)
    }
}