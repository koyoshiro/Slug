define(['slug'], function (slug) {

    return function () {

        //判断是否为Json数据格式
        window.$s.method("judgeJson", function (obj, fn) {
            this.judgeJsonResult = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
            if (arguments.length > 1) {
                fn.call(this, obj);
            }
            return this;
        })
            //String2Json
            .method("convertJson", function (jsonStr) {

                this.judgeJson(jsonStr, function (str) {
                    if (!this.judgeJsonResult)
                        this.convertJsonResult = eval('(' + str + ')');

                });
                return this;

            })
            //运行方法
            .method("doHandler", function (handler, params) {
                if (handler && typeof (handler) == 'function') {
                    if (params != null) {
                        handler(params);
                    }
                    else {
                        handler();
                    }
                }
                return this;
            })
            //动态插入JS引用
            .method("insertScript", function (srcUrl, isAsync) {
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.async = isAsync;
                s.src = url;
                var h = document.getElementsByTagName("head")[0];
                h.appendChild(s);
                return this;
            })
            //获取URL参数
            .method("getURLParameter", function (searchKey) {
                var sPageURL = window.location.search.substring(1);
                if (sPageURL == "")
                    return sPageURL;

                var sURLVariables = sPageURL.split('&');
                for (var i = 0; i < sURLVariables.length; i++) {
                    var sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0] == searchKey) {
                        this.searchKeyResult = sParameterName[1];
                        break;
                    }
                }
                return this;
            })
            .method("getURLPath", function () {
                var path = window.location.pathname;
                if (path != undefined && path != "") {
                    var ltName = path.split('/');
                    if (ltName != undefined && ltName != "")
                        this.pageName = ltName[ltName.length - 1].split('.')[0];
                }
                return this;
            })
            .method("hello", function () {
                alert("hello world");
                return this
            });

    }
});