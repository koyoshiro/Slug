define(['slug', 'sCopy'], function (slug, sCopy) {

    var createXHR = function () {
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined") {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp"],
                    i, len;

                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {
                        //skip
                        continue;
                    }
                }
            }

            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error("No XHR object available.");
        }
    }

    var xhr = createXHR();

    var ajaxArgs = {

        method: undefined,
        url: undefined,
        params: null,
        async: true,
        successFn: null,
        errorFn: null,
        abortFn: null,
        timeout: 30000

    };

    var checkArgsFn = function () {

        if (ajaxArgs.method == null || ajaxArgs.method == undefined) {
            console.log("Error:[checkArgsFn] ajaxArgs.method is undefined");
            return false;
        }
        else if (ajaxArgs.url == null || ajaxArgs.url == undefined) {
            console.log("Error:[checkArgsFn] ajaxArgs.url is undefined");
            return  false;
        }
        else if (ajaxArgs.errorFn == null || ajaxArgs.errorFn == undefined) {
            console.log("Error:[checkArgsFn] callbackFn.errorFn is undefined");
            return  false;
        }
        else if (ajaxArgs.abortFn == null || ajaxArgs.abortFn == undefined) {
            console.log("Error:[checkArgsFn] callbackFn.abortFn is undefined");
            return  false;
        }
        else if (ajaxArgs.successFn == null || ajaxArgs.successFn == undefined) {
            console.log("Error:[checkArgsFn] callbackFn.successFn is undefined");
            return  false;
        }
        else {
            return true;
        }
    };


    xhr.onReadyStateChange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {

                ajaxArgs.successFn(xhr.responseText);

            } else {

                ajaxArgs.errorFn(xhr.status, xhr.responseText);
            }
        }
    };


    xhr.getAjax = function () {

        if (ajaxArgs.params && ajaxArgs.params.length > 0) {
            ajaxArgs.url += "?"
            for (var i = 0; i < ajaxArgs.params.length; i++) {
                ajaxArgs.url += ajaxArgs.params[i].key + "=" + ajaxArgs.params[i].value + "&";
            }
            ajaxArgs.url.substring(0, ajaxArgs.url.length - 1);
        }

        xhr.open("get", ajaxArgs.url, ajaxArgs.async);
        xhr.send(null);
    };

    xhr.postAjax = function () {

        xhr.open("POST", ajaxArgs.url, ajaxArgs.sync);

        // 使用post提交时必须加上下面这行代码
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        var sendStr = "";
        if (ajaxArgs.params && ajaxArgs.params.length > 0) {

            for (var i = 0; i < ajaxArgs.params.length; i++) {
                sendStr += ajaxArgs.params[i].key + "=" + ajaxArgs.params[i].value + "&";
            }
            sendStr.substring(0, sendStr.length - 1);
        }

        // 向服务器发出一个请求
        xhr.send(sendStr);

    };

    return function() {
        window.$s.method("ajax", function (inputAjaxArgs) {

            if ($s.fn.deepCopy == undefined || $s.fn.deepCopy == null)
                sCopy();

            $s.fn.deepCopy(ajaxArgs, inputAjaxArgs);

            if (!checkArgsFn())
                return;

            switch (ajaxArgs.method) {
                case "get":
                    xhr.getAjax();
                    break;
                case "post":
                    xhr.postAjax();
                    break;
                default:
                    break;

            }

            setTimeout(function () {
                if (xhr.readyState !== 4) {
                    xhr.abort();
                    ajaxArgs.abortFn();
                }
            }, ajaxArgs.timeout);
        });
    }
});