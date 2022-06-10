<template>
  <div class="filereader-container" ref="mainContainer">
    <el-row>
      <el-col :span="6">
        读取方式：<el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-upload
          action
          class="upload-demo"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :http-request="docUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div> -->
        </el-upload>
      </el-col>
    </el-row>
    <div style="margin: 20px 0"></div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 20 }"
      placeholder="请输入内容"
      v-model="textarea"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'fileReader',
  data() {
    return {
      fileList: [],
      value: 1,
      textarea: '',
      options: [
        {
          label: 'ArrayBuffer',
          value: 1,
        },
        {
          label: 'Base64',
          value: 2,
        },
        {
          label: '字符串',
          value: 3,
        },
      ],
    }
  },
  created(){
    setTimeout(()=>{
      console.log(this.$refs)
    },5000)
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    docUpload(raw) {
      this.readFile(raw.file).then((res) => {
        this.$message({
          message: '上传成功',
          type: 'success',
        })
        this.textarea = res
      })
    },
    readFile(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        switch (this.value) {
          case 1:
            reader.readAsArrayBuffer(file) //开始读取指定的file中的内容, 一旦完成, result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象.
            break
          case 2:
            reader.readAsDataURL(file) //开始读取指定的file中的内容。一旦完成，result属性中将包含一个data: URL格式的Base64字符串以表示所读取文件的内容。
            break
          case 3:
            reader.readAsText(file) //开始读取指定的file中的内容。一旦完成，result属性中将包含一个字符串以表示所读取的文件内容。
            break
        }
        reader.onload = function (evt) {
          let rawData = evt.target.result
          console.log(evt.target)
          resolve(rawData)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.filereader-container {
  padding: 15px;
}
</style>