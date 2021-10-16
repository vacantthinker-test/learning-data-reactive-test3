import Dep from "./Dep";

/**
 * 根据 expression 在obj 找到 对应的属性值, 然后返回obj
 * @param expression
 * @returns {function(*): *}
 */
function parsePath(expression) { // 高阶函数, 方法内的返回值是一个方法
  let segments = expression.split('.');
  
  return (obj) => { // 从data中, 根据dinner.rice, 找它的值.
    for (let i = 0; i < segments.length; i++) {
      let segment = segments[i]
      obj = obj[segment]
    }
    return obj;
  };
}

export default class Watcher {
  constructor(target, expression, callback) {
    this.target = target; // data
    this.getter = parsePath(expression) // expression dinner.rice
    this.callback = callback; // 要触发的方法
    this.originalValue = this.get();
  }
  
  update() {
    console.log('Watcher update callback')
    let newValue = this.get();
    let oldValue = this.originalValue;
    console.log(`newValue: ${newValue}`)
    console.log(`oldValue: ${oldValue}`)
    
    if (newValue !== oldValue) { // 如果新值不等于旧值
      this.originalValue = newValue;
      this.callback.call(this.target, newValue, oldValue);
    }
    
    
    console.log('------------------')
  }
  
  /**
   * 获取当前属性的值
   * @returns {undefined}
   */
  get() {
    Dep.target = this;
    const obj = this.target;
    let value;
    try {
      value = this.getter(obj)
    } catch (e) {
      console.log(e)
    } finally {
      Dep.target = null
    }
    
    return value;
  }
}