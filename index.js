const globals = require("globals");
const pluginJs = require("@eslint/js");
const pluginVue = require("eslint-plugin-vue");

module.exports = [
    {
        languageOptions: {
            globals: globals.browser,
        }
    },
    pluginJs.configs.recommended,
    ...pluginVue.configs["flat/essential"], // 防止错误或意外行为的规则
    ...pluginVue.configs["flat/recommended"], // 加上强制执行主观社区默认值的规则，以确保一致性。
    ...pluginVue.configs["flat/strongly-recommended"], // 可以大大提高代码的可读性和/或开发体验。
    {
        rules: { // @eslint/js
            "indent": [2, 4, { // 特定缩进
                "SwitchCase": 1
            }],
            "no-unused-vars": 0, // 禁止未使用的变量
        },
    },
    { // eslint-plugin-vue
        rules: {
            "vue/script-indent": [ // 强制使用一致的缩进<script>
                "error",
                4,
                {
                    baseIndent: 0,
                    switchCase: 0,
                    ignores: [],
                },
            ],
            "vue/html-indent": [ // 强制使用一致的缩进<template>
                "error",
                4,
                {
                    attribute: 1,
                    baseIndent: 1,
                    closeBracket: 0,
                    alignAttributesVertically: true,
                    ignores: [],
                },
            ],
            "vue/require-default-prop": 0, // 需要 props 的默认值
            "vue/no-unused-vars": 0, // 禁止未使用的 v-for 指令或范围属性的变量定义
            "vue/max-attributes-per-line": [ // 限制每行属性/特性的最大数量以提高可读性。
                "error",
                {
                    singleline: 8,
                    multiline: 1,
                },
            ],
            "vue/html-closing-bracket-newline": 0, // 强制在自动关闭的标签前换行
            "vue/multi-word-component-names": [0, { // 要求组件名称始终由多个单词组成
                "ignores": ["template"]
            }],
            "vue/singleline-html-element-content-newline": 0, // 要求单行元素内容前后换行
            // 在单行元素的内容之前和之后需要换行符
            "vue/v-on-event-hyphenation": ["error", "never", { // 在模板中的自定义组件上强制执行 v-on 事件命名样式
                "autofix": true,
                "ignore": []
            }],
            "vue/no-mutating-props": [0], // 禁止组件 props 的变异
            "vue/no-lone-template": ["error", { // 禁止不必要的<template>
                "ignoreAccessible": true // 如果true，则忽略可访问<template>元素
            }]
        },
    },
]