/**
 *
 * @param value 要处理的对象
 */
import Observer from "./Observer";

export default function observe(value){
    if(typeof value !== 'object') { // 如果 "要处理的对象" 类型 不是 object, 那么直接 return
      return;
    }
    let ob;
    if(value.__ob__ === undefined) {
        ob = new Observer(value)
    } else {
        ob = value.__ob__;
    }
    return ob;
}