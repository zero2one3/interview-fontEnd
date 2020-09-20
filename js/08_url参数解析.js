/*   封装函数parseQueryString , 将URL地址的参数解析为对象   */

function parseQueryString(url) {
    let obj = {}

    if(url.indexOf('?') === -1) return obj;
    
    let first_res = url.split('?')[1]
    let second_res = first_res.split('&')
    
    for(let i in second_res) {
        third = second_res[i].split('=')
        obj[third[0]] = third[1]
    }

    return obj

}


// 测试代码

let URL = 'https://www.sogou.com/web?ie=UTF-8&query=搜索内容&_em=3'
console.log(parseQueryString(URL));
