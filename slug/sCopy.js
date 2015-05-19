define(['slug'], function (slug) {

    return function () {

        var isType = function (obj, type) {
            var toString = Object.prototype.toString, undefined;
            return (type === "Null" && obj === null) ||
                (type === "Undefined" && obj === undefined ) ||
                toString.call(obj).slice(8, -1) === type;
        };

        window.$s.method("deepCopy", function (result, source) {
            for (var key in source) {
                var copy = source[key];
                if (source === copy) continue;//如window.window === window，会陷入死循环，需要处理一下
                if (isType(copy, "Object")) {
                    result[key] = arguments.callee(result[key] || {}, copy);
                } else if (isType(copy, "Array")) {
                    result[key] = arguments.callee(result[key] || [], copy);
                } else {
                    result[key] = copy;
                }
            }
            return result;
        });
    }
});