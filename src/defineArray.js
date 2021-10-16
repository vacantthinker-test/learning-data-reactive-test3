// 7个方法重写
import def from "./utils";
import observe from "./observe";

const arrayPrototype = Array.prototype; // 1 获取Array 原型
const arrayPrototypeNew = Object.create(arrayPrototype); // 2 创建一份 新的 Array原型
const arrayMethods = ['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse']

// 3 重写7个方法
arrayMethods.forEach(method => {
  const originalMethod = arrayPrototype[method];
  def(arrayPrototypeNew, method, function () {
    // 这里不能使用箭头函数, this不一样
    console.log(`this`)
    console.log(this)
    console.log('--- array ---')
    
    const ob = this.__ob__;
    // arguments只是像Array, 但它不是. 缺各种方法
    const args = [...arguments]; // 转换一下
    // apply 和 call 有区别.
    let result = originalMethod.apply(this, args);
    let inserted = []
    // 其中有3个方法需要处理一下
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted.length > 0) {
      // 如果 有值, 那么需要observe 处理一下
      observe(inserted)
    }
    ob.dep.depend();
    
    return result;
  }, false)
})

export default function defineArray(arr) {
  console.log('defineArray 执行了.')
  Object.setPrototypeOf(arr, arrayPrototypeNew); // 设置新的原型方法
}