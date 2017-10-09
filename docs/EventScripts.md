## 剧本插件

本插件可以帮助你在 RM 编辑器外部编写和管理大段的剧情对话。在剧情较多的大型游戏或 R 剧中能帮助你减少维护剧情的工作量。

### 特色

* 使用 yaml 管理剧情文本
* 可「套用模板」，统一管理所有剧情的脸图、位置、显示名字框等

### 安装说明

建议与 YEP 的 MessageCore 一同安装。

本插件需要将以下文件复制到对应目录：

* `libs/yaml.min.js` 复制到 `游戏项目/js/libs/yaml.min.js`
* `plugins/ainoucore.js` 复制到 `游戏项目/js/plugins/ainoucore.js`
* `plugins/ainoueventscripts.js` 复制到 `游戏项目/js/plugins/ainoueventscripts.js`
* `examples/EventScripts.yaml` 复制到 `游戏项目/data/EventScripts.yaml`

同时，你需要在 RM 中设置插件，**按顺序**加载「Ainou 核心插件」和「Ainou 剧本插件」。

### 使用说明

#### 编辑剧本

请学习 yaml 语法，并修改 EventScripts.yaml 即可。

#### 插件指令

`剧本 剧本名`

