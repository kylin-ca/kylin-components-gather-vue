<template>
  <div style="height: 100%">
    <codemirror
      ref="cm"
      v-model="code"
      :options="cmOptions"
      @input="inputChange"
      @onCursorActivity="onCursorActivity"
    ></codemirror>
  </div>
</template>

<script>
// 全局引入vue-codemirror
import { codemirror } from 'vue-codemirror'
// 引入css文件
import 'codemirror/lib/codemirror.css'
// 引入主题 可以从 codemirror/theme/ 下引入多个
import 'codemirror/theme/idea.css'
import 'codemirror/theme/rubyblue.css'
// 引入语言模式 可以从 codemirror/mode/ 下引入多个
import 'codemirror/mode/sql/sql.js'

// 搜索功能
// find：Ctrl-F (PC), Cmd-F (Mac)
// findNext：Ctrl-G (PC), Cmd-G (Mac)
// findPrev：Shift-Ctrl-G (PC), Shift-Cmd-G (Mac)
// replace：Shift-Ctrl-F (PC), Cmd-Alt-F (Mac)
// replaceAll：Shift-Ctrl-R (PC), Shift-Cmd-Alt-F (Mac)
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/dialog/dialog'
import 'codemirror/addon/search/searchcursor'
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/jump-to-line'
import 'codemirror/addon/search/matchesonscrollbar'
import 'codemirror/addon/search/match-highlighter'

// 代码提示功能 具体语言可以从 codemirror/addon/hint/ 下引入多个
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/sql-hint'

// 高亮行功能
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/selection/selection-pointer'

// 调整scrollbar样式功能
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'

// 自动括号匹配功能
import 'codemirror/addon/edit/matchbrackets'

// 全屏功能 由于项目复杂，自带的全屏功能一般不好使
import 'codemirror/addon/display/fullscreen.css'
import 'codemirror/addon/display/fullscreen'

// 显示自动刷新
import 'codemirror/addon/display/autorefresh'

// 多语言支持？
import 'codemirror/addon/mode/overlay'
import 'codemirror/addon/mode/multiplex'

// 代码段折叠功能
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/foldgutter.css'

import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
import 'codemirror/addon/fold/xml-fold.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/comment-fold.js'

// merge功能
import 'codemirror/addon/merge/merge.css'
import 'codemirror/addon/merge/merge'
// google DiffMatchPatch
import DiffMatchPatch from 'diff-match-patch'
import sqlFormatter from 'sql-formatter' //sql格式化
// DiffMatchPatch config with global
window.diff_match_patch = DiffMatchPatch
window.DIFF_DELETE = -1
window.DIFF_INSERT = 1
window.DIFF_EQUAL = 0

export default {
  name: 'Show',
  components: { codemirror },
  data() {
    return {
      code: 'SELECT a FROM table1 WHERE b = 1',
      cmOptions: {
        // 语言及语法模式
        mode: 'text/x-sql',
        // 主题
        theme: 'rubyblue',
        // 显示函数
        line: true,
        lineNumbers: true,
        // 软换行
        lineWrapping: true,
        // tab宽度
        tabSize: 4,
        // 代码提示功能
        hintOptions: {
          // 避免由于提示列表只有一个提示信息时，自动填充
          completeSingle: false,
          // 不同的语言支持从配置中读取自定义配置 sql语言允许配置表和字段信息，用于代码提示
          tables: {
            a: ['c1', 'c2'],
            // table2: [ 'a', 'a']
          },
        },
        // 高亮行功能
        styleActiveLine: true,
        // 调整scrollbar样式功能
        scrollbarStyle: 'overlay',
        // 自动括号匹配功能
        matchBrackets: true,
      },
      selecValue: '',
    }
  },
  mounted() {
    // 代码提示功能 当用户有输入时，显示提示信息
    this.$refs.cm.codemirror.on('inputRead', (cm) => {
      cm.showHint()
    })
    this.$refs.cm.codemirror.on('blur', (cm) => {
      // console.log(cm)
    })

    this.$refs.cm.codemirror.on(
      'cursorActivity',
      function (instance) {
        this.selecValue = this.$refs.cm.codemirror.getSelection()
        // console.log(this.$refs.cm.codemirror.getSelection())
        //   console.log(this.CodeMirrorEditor.getSelection())
      }.bind(this)
    )
  },

//   getLine(n):获取第n行的内容
// lineCount()：获取当前行数
//lastLine() 获取最后一行的行号
//isClean():boolean类型判断编译器是否是clean的
  methods: {
    //最后插入光标
    setCur() {
      // console.log(222)
      this.$nextTick(() => {
        this.$refs.cm.codemirror.focus()
        this.$refs.cm.codemirror.setCursor(
          this.$refs.cm.codemirror.lineCount(),
          0
        )
      })
    },
    //设置输入提示 表 字段
    setTableFeildTips(tableName, feildList) {
      this.$nextTick(() => {
        this.cmOptions.hintOptions.tables[tableName] = [...feildList]
      })
    },
    //格式化sql
    sqlFormat() {
      this.code = sqlFormatter.format(this.code)
    },
    //当鼠标点击内容区、选中内容、修改内容时被触发
    onCursorActivity(instance) {
      // console.log(instance)
    },
    inputChange(content) {
      // this.$nextTick(() => {
      //   console.log('code:' + this.code)
      //   console.log('content:' + content)
      // })
    },
    replaceSelection(value) {
      //在光标位置插入
      this.$refs.cm.codemirror.replaceSelection(value)
    },
    //光标位置插入之后在最后一行聚焦
    replaceSelectionLastFocus(value){
      this.$refs.cm.codemirror.replaceSelection(value)
      this.$nextTick(() => {
          let lastLineValue = this.$refs.cm.codemirror.getLine(this.$refs.cm.codemirror.lastLine()) //最后一行的内容
          if(lastLineValue === ''){
            this.setCur()
          }else{
            this.code = this.code + '\n'
            this.$nextTick(() => {
              this.setCur()
            })
          }
      })
    }
  },
}
</script>
<style lang="scss">
.vue-codemirror {
  height: 100%;
}
.CodeMirror {
  height: 100%;
}
//sql编辑器内容靠左
.CodeMirror-wrap pre.CodeMirror-line,
.CodeMirror-wrap pre.CodeMirror-line-like {
  text-align: left;
}
</style>