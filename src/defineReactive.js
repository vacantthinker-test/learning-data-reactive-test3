/**
 * 响应式处理, 即 在 一个对象被响应式处理之后, 访问其中的属性或者更新属性的值, 触发setter getter 方法
 * @param target
 * @param key
 * @param val
 */
import observe from "./observe";

export default function defineReactive(target, key, val) {
  const ob = target.__ob__; // 获取observer 实例
  
  // 如果当前只有两个参数, val没有.
  if (arguments.length === 2) {
    val = target[key]; // 从target中根据key获取
  }
  
  // val 可能是 数值 字符串 也可能是数组 对象, 这里需要observe
  observe(val)
  
  // Object.defineProperty(target, key, attr)
  // 该方法的get set 可以拦截 属性, 并加一些额外的东西.
  // 响应式处理, 是在原有方法基础上, 新增加一些东西. 原有功能是不能丢的.
  Object.defineProperty(target, key, {
    get() { // 访问值 收集依赖
      console.log('响应式 get 触发了.')
      console.log(key)
      console.log(val)
      console.log('--- get ---')
      
      ob.dep.depend();
      
      return val;
    },
    set(newValue) { // 更新值 通知依赖, 触发更新
      console.log('响应式 set 触发了.')
      console.log(key)
      console.log(newValue)
      console.log('--- set ---')
      val = newValue
      observe(val)
      ob.dep.notify();
    }
  })
}