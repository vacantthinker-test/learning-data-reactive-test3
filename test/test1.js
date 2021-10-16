const target = {
  a: 11,
  b: 22,
  c: 33,
  d: 44
}
Object.defineProperty(target, 'c',{
  enumerable: false
})
// 那么这个key是不可见的.
for (let key in target) { // 遍历每一个key, 如果其中一个key设置了enumerable=false, 那么key
  let value = target[key]
  console.log(`${key}, value=${value}`) // c 不见了. 这就是enumerable=false的作用.
}