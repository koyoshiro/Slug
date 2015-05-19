define(['slug', 'jQuery'], function (slug, jQuery) {

    return function () {


        slug.method("each", function (fn) {
            for (var i = 0, l = this.elements.length; i < l; i++) {
                fn.call(this, this.elements[i]);
            }
            return this;
        }).method("setStyle", function (prop, value) {
            this.each(function (el) {
                el.style[prop] = value;
            });
            return this;
        }).method("show", function () {
            if (this.tagName != "table")
                this.setStyle("display", "block");
            else
                this.setStyle("display", "table");
            return this;
        }).method("hide", function () {
            this.setStyle("display", "none");
            return this;
        }).method("setSpanText", function (value) {
            this.text = value;
            return this;
        }).method("on", function (eventName, eventTarget, eventFn) {

            this.each(function (el) {

                event.preventDefault();

                if (eventTarget)
                    jQuery(el).off().on(eventName, eventTarget, eventFn);
                else
                    jQuery(el).off().on(eventName, eventFn);
            });
            return this;
        });
    }
});