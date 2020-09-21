/*   简单实现一下发布订阅者模式   */

class Subect {
    constructor(name) {
        this.name = name                // 被观察者的名字
        this.message = '今天是晴天'      // 存放一个值
        this.observers = []             // 存放所有观察者
    }
    on(observer) {
        this.observers.push(observer)
    }
    triggle(data) {
        this.message = data
        this.observers.forEach(o => o.update(data))
    }
}

class Observer{
    constructor(name) {
        this.name = name
    }
    update(newDate) {
        console.log(`我是观察者${this.name}：${newDate}`);
    }
}

// 测试代码
let subject = new Subect('message')

let o1 = new Observer('小红')
let o2 = new Observer('小明')

subject.on(o1)
subject.on(o2)

subject.triggle('明天会下雨')
