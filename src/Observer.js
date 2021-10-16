/**
 * 根据 value 的类型 是数组还是对象, 分别进行处理
 *    数组, 重新定义7个方法, 并且每一项都是响应式的
 *    对象, 每一项都是响应式的
 */
import def from "./utils";
import defineReactive from "./defineReactive";
import observe from "./observe";
import defineArray from "./defineArray";
import Dep from "./Dep";

export default class Observer{
    constructor(value){
        this.dep = new Dep(); // 每一个Observer都有一个Dep
        // 定义__ob__ 属性, 并且不可枚举
        def(value, '__ob__', this, false);
        
        // 判断value的类型, 分别处理
        if(Array.isArray(value)) { // 分之一 数组
            // 针对数组的处理
            defineArray(value);
            this.walkArray(value);
        } else { // 分之二 对象
            // 针对对象的处理
            this.walk(value);
        }
        
    }
    
    walk(obj) {
        for (let key in obj) {
            defineReactive(obj, key) // 每一项 key val 都进行 Object.defineProperty() set get
        }
    }
    
    walkArray(arr) {
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i]
            observe(item) // observe 方法 对value 进行 响应式处理.
            // 如果 数组中的 子项 有的是对象 [不是数值, 不是字符串], 那么进行处理.
        }
    }
}










