/**
 * 定义 target 的 key , 对应的 val. 是否可枚举, 可配置, 可重写[设置新值]
 * @param target 目标对象
 * @param key 属性名
 * @param val 属性值
 * @param enumerable 是否可枚举
 */
export default function def(target, key, val, enumerable) {
  
  Object.defineProperty(target, key, {
    value: val,
    enumerable: enumerable, // 是否可枚举, false=不可枚举
    configurable: true, // 可配置
    writable: true // 可重写 [设置新值]
  })
}