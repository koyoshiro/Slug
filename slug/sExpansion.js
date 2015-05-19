/**
 * Created by jl.gu on 2014/12/2.
 */
define(function () {


   return function() {

       Object.prototype.add=function(field,val){
           this[field]=val;
       };

       String.prototype.format = function () {
           var args = arguments;
           return this.replace(/\{(\d+)\}/g, function (m, i, o, n) {
               return args[i];
           });
       }

       String.prototype.contains = function (str) {
           return this.indexOf(str) > -1 ? true : false;
       };

       Array.prototype.remove = function (dx) {
           if (isNaN(dx) || dx > this.length) { return false; }
           for (var i = 0, n = 0; i < this.length; i++) {
               if (this[i] != this[dx]) {
                   this[n++] = this[i]
               }
           }
           this.length -= 1
       }
   };
});