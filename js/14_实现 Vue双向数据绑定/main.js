import Vue from './Vue'

const vm = new Vue({
    el: '#app',
    data: {
        message: {
            name: '张三'
        }
    }
})

window.$vm = vm

