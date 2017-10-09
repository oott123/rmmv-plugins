/*:
 * @plugindesc Ainou 核心插件
 * @author oott123
 *
 * @help 请在所有 Ainou 系列插件之前加载我
 */

(function () {
  // 工具函数
  function callAfter(source, key, after) {
    var old = source[key];
    source[key] = function () {
      var returnValue = apply(old, this, arguments);
      var args = Array.prototype.slice.call(arguments, 0)
      args.unshift(returnValue);
      return apply(after, this, args);
    };
  }
  function callBefore(source, key, before) {
    var old = source[key];
    source[key] = function () {
      apply(before, this, arguments);
      return apply(old, this, arguments);
    };
  }
  function apply(func, context, args) {
    switch (args.length) {
      case 1: return func.call(context, args[0]);
      case 2: return func.call(context, args[0], args[1]);
      case 3: return func.call(context, args[0], args[1], args[2]);
      case 4: return func.call(context, args[0], args[1], args[2], args[3]);
      case 5: return func.call(context, args[0], args[1], args[2], args[3], args[4]);
      default: return func.apply(context, args);
    }
  }
  function loadJs(url, callback) {
    var script = document.createElement('script');
    script.onload = function () {
      (typeof callback === 'function') && callback();
    };
    script.src = url;
    document.body.appendChild(script);
  }
  window.AinouCore = window.AinouCore || {};
  window.AinouCore.plugins = {};
  window.AinouCore.utils = {
    callAfter: callAfter,
    callBefore: callBefore,
    apply: apply,
    loadJs: loadJs
  }
})();