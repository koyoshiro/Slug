define(['sDom', 'sMethod', 'sExtend', 'sCopy', 'sInterface', 'sAjax', 'sExpansion'], function (sDom, sMethod, sExtend, sCopy, sInterface, sAjax, sExpansion) {

    return function () {

        sDom();

        sMethod();

        sExtend();

        sCopy();

        sInterface();

        sAjax();

        sExpansion();

    }();
});