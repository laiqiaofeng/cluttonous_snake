/**
 * 
 * 常用工具
 */
const tools = {
    //原型上继承(寄生组合模式, 圣杯模式)
    // _inhert: (function () {
    //     let F = function () {};
    //     return function (Target, Origin) {
    //         F.prototype = Origin.prototype;
    //         Target.prototype = new F();
    //         Target.prototype.constructor = Target;
    //         Target.prototype.uber = Origin.prototype;
    //     } 
    // })(),
    // 利用Object.create, 创建新对象,因为更改对象的prototype是非常慢的
    // 由于现代 JavaScript 引擎优化属性访问所带来的特性的关系，
    // 更改对象的 [[Prototype]]在各个浏览器和 JavaScript 引擎上都是一个很慢的操作。
    // 其在更改继承的性能上的影响是微妙而又广泛的，
    // 这不仅仅限于 obj.__proto__ = ... 语句上的时间花费，
    // 而且可能会延伸到任何代码，那些可以访问任何[[Prototype]]已被更改的对象的代码。
    // 如果你关心性能，你应该避免设置一个对象的 [[Prototype]]。
    // 相反，你应该使用 Object.create()来创建带有你想要的[[Prototype]]的新对象
    _inhert (target, origin) {
        target.prototype = Object.create(origin.prototype, {
            constructor : {
                enumerable: false,
                configurable: true,
                writable: true,
                value: origin.prototype
            }
        })
        //把origin设置为target的原型, 因为function也是对象
        // 可以继承静态属性和静态方法
        Object.setPrototypeOf(target, origin);
    },
    //原型和静态方法和静态属性一起继承
    _extend (origin) {
        const result = function () {
            // 当实例化该构造函数时, this指向构造的对象
            //寄生模式, 缺点, 调用了两次父构造函数
            origin.apply(this, arguments);
        };
        // Object.setPrototypeOf(result, origin);
        this._inhert(result, origin);
        return result;
    },
    //生成一个单例函数
    _single (origin) {
        const result = (function () {
            let instance;
            return function () {
                if(typeof instance !== "object") {
                    instance = this;
                    // Object.setPrototypeOf(reslut, origin);
                    origin && origin.apply(this, arguments);
                }
                return instance;
            } 
        })();
        origin && this._inhert(result, origin);
        return result;
    },
    //节流
    _throttle: (
        // 传入需节流的函数
        func,
        //节流时间
        time = 17,

        // 传入一个参数集合, leading表示是否用定时器, 如果不用定时器就用系统时间判定
        // trailing表示用最后一种节流方法
        options = {
            // 主要的, 是否在函数触发后立即执行
            leading: true,
            // 后续, 是否在函数执行后额外再触发一次
            trailing: false,
            //上下文
            context: null
        }
    ) => {
        //获取开始时间
        let previous_time = new Date(0).getTime();
        let timer = null;
        //返回一个真正的节流函数
        const throttle = function (...arg) {
            //获取函数开始执行的时间
            let now_time = new Date().getTime();
            // 方法触发后开始进行计时
            //如果立即执行,不会进入该语句
            if(!options.leading) {
                //如果有定时器, 直接返回
                if(timer) return;
                //否则就定义一个定时器
                timer = setTimeout( () => {
                    //把定时器重新释放
                    timer = null;
                    //执行方法函数
                    func.apply(options.context, arg);
                }, time);
                //如果执行时间离开始时间大于时间间隔, 直接执行函数, 重置开始时间为函数执行时间
            } else if(now_time - previous_time > time) {
                func.apply(options.context, arg);
                previous_time = now_time;
                //如果trailing为true, 额外触发一次
            } else if(options.trailing) {
                //清除定时器
                clearTimeout(timer);
                //重新定义定时器
                timer = setTimeout( () => {
                    //执行函数
                    func.apply(options.context, arg);
                }, time);
            }
        }
        //定义一个撤销节流的函数
        throttle.cancel = () => {
            previous_time = 0;
            clearTimeout(timer);
            timer = null;
        }
        return throttle;
    },
    // 防抖
    _debounce : (
        func,
        time = 17,
        options = {
            leading: true,
            trailing: true,
            context: null
        }
    ) => {
        let timer = null;
        //不能用箭头函数, 不然this指向无法改变
        const debounce = function (...arg) {
            if(timer) {
                clearTimeout(timer);
            }
            if(options.leading && !timer) {
                timer = setTimeou( null, time)
                func.apply(options.context, arg);
            } else if(options.trailing) {
                timer = setTimeout( () => {
                    timer = null;
                    func.apply(options.context, arg);
                } ,time)
            }
        } 

        debounce.cancel = () => {
            clearTimeout(timer);
            timer = null;
        }
        return debounce;
    }

}



