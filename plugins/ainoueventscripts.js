/*:
 * @plugindesc Ainou 剧本插件
 * @author oott123
 *
 * @help 插件指令：「剧本 片段名」读取并显示指定剧本
 */

(function () {
  if (!window.AinouCore || !AinouCore.utils) {
    alert('Ainou Core 插件未找到或版本不正确');
    return;
  }
  var _ = AinouCore.utils;
  var scripts = {};
  var commandRemove = '_ainou_event_scripts_remove_command_' + Math.random();
  var flagRemovePrefix = '_ainou_event_scripts_remove_flag_';
  var scriptsLoaded = false;
  // 加载 EventScripts.json
  _.callAfter(DataManager, 'loadDatabase', function (rv) {
    _.loadJs('js/libs/yaml.min.js', function () {
      YAML.load('data/EventScripts.yaml', function (result) {
        if (!result || !result.scripts || !(result.scripts instanceof Array)) {
          throw new TypeError('剧本加载失败');
        }
        result = result.scripts;
        for (var i = result.length - 1; i >= 0; i--) {
          var line = result[i];
          if (line.name) {
            scripts[line.name] = line;
          } else {
            scripts[i] = line;
          }
        }
        scriptsLoaded = true;
      });
    });
    return rv;
  });
  // 检查是否读取完成
  _.callAfter(DataManager, 'isDatabaseLoaded', function (rv) {
    return rv && scriptsLoaded;
  });
  // 注册插件指令
  _.callAfter(Game_Interpreter.prototype, 'pluginCommand', function (rv, command, args) {
    console.log(this._list);
    if (command === '剧本') {
      var config = scripts[args[0]];
      var event = this;
      var append = function (list) {
        list.unshift(event._index, 1);
        _.apply(Array.prototype.splice, event._list, list);
      }
      console.log('c', config);
      if (config.list instanceof Array) {
        // 有 list，作为列表传入
        var appendList = [];
        for (var i = 0; i < config.list.length; i++) {
          var a = generateCmdList(event, config.list[i]);
          console.log('a', a);
          appendList = appendList.concat(a);
        }
        console.log('alist', appendList);
        append(appendList);
      } else {
        // 否则作为单行文本传入
        append(generateCmdList(event, config));
      }
      // 回退一步，开始执行剧本
      console.log(this._list);
      this._index--;
    }
    return rv;
  });

  function generateCmdList(event, config) {
    var appendList = [];
    var prepend = config.prepend || '';
    var append = config.hasOwnProperty('append') ? config.append : '<br>';
    config.lines.forEach(function (line) {
      appendList.push({
        code: 101,
        indent: event._indent,
        parameters: [
          config.faceName || '',
          config.faceId || 0,
          config.background || 0, 
          config.positionType || 2
        ]
      });
      appendList = appendList.concat(line.split('\n').map(function (line) {
        return {
          code: 401,
          intent: event._indent,
          parameters: [prepend + line + append]
        };
      }));
    });
    return appendList;
  }

  AinouCore.plugins.eventScripts = {
    commandRemove: commandRemove,
    flagRemovePrefix: flagRemovePrefix,
    scripts: scripts
  };
})();
