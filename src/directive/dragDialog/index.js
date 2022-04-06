/*
 * @Author: your name
 * @Date: 2022-03-24 17:27:08
 * @LastEditTime: 2022-03-24 17:28:09
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \kylin-components-gather-vue\src\directive\dragDialog\index.js
 */
import dragDialog from './dragDialog'

const install = function(Vue) {
    Vue.directive('dragDialog', dragDialog)
}

if (window.Vue) {
    window.dragDialog = dragDialog
    Vue.use(install); // eslint-disable-line
}

dragDialog.install = install
export default dragDialog