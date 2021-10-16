// vue2 响应式 更新数据
import observe from "./observe";
import Watcher from "./Watcher";

const data = {
  dinner: {
    rice: 4,
    meat: 20,
    juice: 4
  },
  total: 0
}
// 目的, 更新dinner.rice 触发total自动更新.

observe(data) // 响应式处理data
window.data = data;

const render = `
  <span>米饭</span><span id="riceSpan">${data.dinner.rice}</span>
  <br>
  <span>肉类</span><span>${data.dinner.meat}</span>
  <br>
  <span>果汁</span><span>${data.dinner.juice}</span>
  <br>
  <span>总计</span><span id="totalSpan">${data.total}</span>
  <br>
`
document.getElementById('app').innerHTML = render;

new Watcher(data, 'dinner.rice', value => { // 监听一个属性, 触发一个方法
  console.log('============= new Watcher============')
  console.log(value)
  data.total = data.dinner.rice + data.dinner.meat + data.dinner.juice;
  console.log(data.total)
  document.getElementById('riceSpan').innerText = data.dinner.rice;
  document.getElementById('totalSpan').innerText = data.total;
  
  console.log('============ end of Watcher============')
})
// data.dinner.rice -> 4 // 旧值
// data.dinner.rice = 5; // 5 新值

console.log(data)

