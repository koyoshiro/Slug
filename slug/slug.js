define(function () {

    Function.prototype.method = function (name, fn) {
        this.prototype[name] = fn;
        return this;
    };


    var ele = function () {
        this.elements = [];
        var element;
        if (typeof arguments[0] == "string") {
            element = arguments[0];
            if (element.slice(0, 1) == '#') {
                element = document.getElementById(element.slice(1));
                this.elements.push(element);
            } else if (element.slice(0, 1) == '.') {
                element = element.slice(1);
                var es = document.body.getElementsByTagName('*');
                for (var i = 0, j = es.length; i < j; i++) {
                    if ((es[i].className != "" && es[i].className != undefined && es[i].className != null) && element.indexOf(es[i].className) != -1) {
                        //alert(111);
                        this.elements.push(es[i]);
                    }
                }
            } else {
                this.elements = document.getElementsByTagName(element);
                //alert(elements[0].id);
            }
        } else {
            element = this;
            this.elements.push(element);
        }
    };


    if (!window.$s) {

        window.slug = window.$s = function () {
            if (arguments.length > 0) {
                return new ele(arguments[0]);
            }
            else {

                return window.$s.prototype.init();
            }
        };
    };


    window.$s.method("init", function () {
        return this;
    });

    window.$s.prototype.init.prototype = window.$s.prototype;

    window.slug.fn = window.$s.fn = $s();

    return ele;
});


// $('.action-box').on('click', '.btn-delete', print)
//                 .on('click', '.btn-edit',   print);
//                 
//                 		
//                 				
//                 						
// 		// ele.method("each", function(fn) {
// 	for (var i = 0, l = this.elements.length; i < l; i++) {
// 		fn.call(this, this.elements[i]);
// 	}
// 	return this;
// }).method("setStyle", function(prop, value) {
// 	this.each(function(el) {
// 		el.style[prop] = value;
// 	});
// 	return this;
// }).method("show",function(){
// 		this.setStyle("display","block");
// 		return this;
// });

// window.$g = function() {
// 	return new ele(arguments[0]);
// };