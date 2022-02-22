<template>
  <div class="selectTree-container">
    <Aside>selectTree</Aside>
    <!-- 多选树 :multiple="true" -->
    <h3>多选</h3>
    <Treeselect
      v-model="tree1"
      :multiple="true"
      :max-height="200"
      :options="options"
      :normalizer="normalizer"
      placeholder="请选择"
    >
    </Treeselect>
    <h3>单选</h3>
    <!-- 禁用分支节点 disable-branch-nodes
    show-count 展示子节点数量 -->
    <Treeselect
      v-model="tree2"
      :disable-branch-nodes="true"
      :show-count="true"
      :max-height="200"
      :options="options"
      :normalizer="normalizer"
      placeholder="请选择"
    >
    </Treeselect>
    <Aside style="margin-top: 20px">selectTree + element form</Aside>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="银行名称" prop="name" class="tree-select">
        <Treeselect
          v-model="ruleForm.name"
          :multiple="true"
          :max-height="200"
          :options="options"
          :normalizer="normalizer"
          placeholder="请选择"
        >
        </Treeselect>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Aside from '@/components/Aside'
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Aside, Treeselect },
  data() {
    return {
      tree1: null, //初始值必须为null 否则会报错
      tree2: null,
      ruleForm: {
        name: null,
      },
      rules: {
        name: [{ required: true, message: '请选择银行名称', trigger: 'blur' }],
      },
      options: [
        {
          id: 1,
          name: '北京总行',
          children: [
            {
              id: 11,
              name: '北京分行一',
            },
            {
              id: 12,
              name: '北京分行二',
            },
            {
              id: 13,
              name: '北京分行三',
              children: [
                {
                  id: 131,
                  name: '北京分行三子分行一',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          name: '浙江分行',
        },
        {
          id: 3,
          name: '安徽总行',
        },
      ],
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.ruleForm = {
        name: null,
      }
    },
    //树下拉框的数据处理
    normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.children,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.selectTree-container {
  padding: 15px 30px;
  width: 100%;
  font-size: 14px;
}
//下拉树和表单发生的样式问题
.tree-select {
  ::v-deep .el-form-item__content {
    line-height: 18px;
  }
}
</style>