import Vue from './Vue'

const vm = new Vue({
    el: '#app',
    data: {
        message: '我是双向绑定数据message'
    }
})

window.$vm = vm