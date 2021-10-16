export default class Dep {
  static target;
  
  constructor() {
    this.subs = new Set(); // 存储watcher 实例
  }
  
  /**
   * 收集依赖
   */
  depend() {
    if (Dep.target) {
      this.subs.add(Dep.target)
    }
  }
  
  /**
   * 通知依赖, 进行更新
   */
  notify() {
    const newSubs = new Set(this.subs);
    newSubs.forEach(sub =>
      sub.update()
    )
  }
}