<template>
  <div class="codemirror-container">
    <aside>vue-codemirror SQL编辑器</aside>
    <div class="editor-container">
      <sql-editor ref="sqlEditor" class="sql" />
      <div class="btn">
        <el-button class="el-bu-w" type="primary" @click="sqlFormat"
          >一键美化</el-button
        >
        <el-button class="el-bu-w marr" type="primary" @click="getSelectValue"
          >选中的内容</el-button
        >
        <el-button class="el-bu-w marr" type="primary" @click="insert"
          >光标处插入</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import SqlEditor from '@/components/SqlEditor'
export default {
  name: 'Codemirror',
  components: { SqlEditor },
  methods: {
    sqlFormat() {
      this.$refs.sqlEditor.sqlFormat()
    },
    getSelectValue() {
      this.$alert(this.$refs.sqlEditor.selecValue ? this.$refs.sqlEditor.selecValue: '未选中', '当前选中的SQL', {
        confirmButtonText: '确定',
        callback: (action) => {},
      })
      //   alert(this.$refs.sqlEditor.selecValue)
      //   console.log(this.$refs.sqlEditor.selecValue)
    },
    insert(){
        this.$refs.sqlEditor.replaceSelection('table1')
    }
  },
}
</script>

<style lang="scss" scoped>
.el-bu-w {
  min-width: 120px;
}
.marr {
  margin-top: 15px;
  margin-left: 0;
}
.codemirror-container {
  padding: 15px 30px;
  width: 100%;
  aside {
    background: #eef1f6;
    padding: 8px 24px;
    margin-bottom: 20px;
    border-radius: 2px;
    display: block;
    line-height: 32px;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    color: #2c3e50;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .editor-container {
    display: flex;
    width: 100%;
    height: 800px;
  }
  .sql {
    flex: 1;
  }
  .btn {
    width: 150px;
    display: flex;
    flex-flow: column;
    align-items: center;
  }
}
</style>