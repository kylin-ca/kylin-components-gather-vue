<template>
  <div class="upload">
    <el-upload
      class="upload-demo"
      action
      multiple
      list-type="text"
      :show-file-list="showFileList"
      :on-preview="handlePreview"
      :on-progress="onDocUpload"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :limit="limit"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :http-request="docUpload"
    >
      <el-button
        v-if="title && !svgIcon"
        size="mini"
        type="primary"
        :icon="icon"
        >{{ title }}</el-button
      >
      <el-button
        v-if="!title && !svgIcon"
        size="mini"
        type="primary"
        :icon="icon"
      ></el-button>
      <svg-icon v-if="svgIcon" class="svg" icon-class="import" />
      <div slot="tip" v-if="tips" class="el-upload__tip">{{ tips }}</div>
      <el-progress
        :percentage="loadProgress"
        :format="format"
        v-show="showPorgess"
      ></el-progress>
    </el-upload>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'docUpload',
  props: {
    //传入图标以图标显示，不传入以按钮显示
    svgIcon: {
      type: String,
      default: '',
    },
    //按钮上的图标
    icon: {
      type: String,
      default: '',
    },
    //按钮上的文字
    title: {
      type: String,
      default: '',
    },
    //上传提示文字
    tips: {
      type: String,
      default: '',
    },
    //上传文件检查
    typeCheck: {
      type: Function,
      required: true,
      default: null,
    },
    //上传文件限制
    limit: {
      type: Number,
      default: 1,
    },
    //是否显示已上传文件列表
    showFileList: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      fileList: [],
      fd: null,
      file: '',
      loadProgress: 0,
      showPorgess: false,
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.$emit('on-remove', file, fileList)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`每次只能上传 ${this.limit} 个文件`)
    },
    docUpload(raw) {
        this.fd = new FormData()
        this.fd.append('file', raw.file) //传文件
      //   let param = JSON.stringify({
      //     uid: userid,
      //     rename: this.rename,
      //     type: this.type,
      //   })
      //   this.fd.append('param', param)
      //   let access_token = getToken() ? JSON.parse(getToken()).access_token : ''
        axios({
          method: 'post',
          url: '',
          data: this.fd,
          headers: {
            'Content-Type': 'multipart/form-data',
            AccessToken: 'access_token',
          },
        })
          .then((res) => {
            if (res.data.status != 200) {
              this.failed('Error')
            } else {
              this.succeed('Upload successfully')
              this.file = res.data.data[0].url
              this.$emit('file', this.file, raw)
            }
          })
          .catch((err) => {
            this.failed('Upload failed')
          })
    },

    handlePreview(file, fileList) {
      console.log(fileList)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Are you sure to delete ${file.name}?`)
    },
    beforeUpload(file) {
      let bool = this.typeCheck(file)
      // console.log(bool)
      return bool
    },
    onDocUpload(event) {
      this.showPorgess = true
      this.loadProgress = Math.floor(event.percent) //这就是当前上传的进度
    },
    handleChange() {
      this.showPorgess = false
    },
    format(percentage) {
      return `${percentage}%`
    },
    clearFile() {
      this.fileList = []
    },
  },
}
</script>
<style lang="scss" scoped>
.upload {
  display: inline-block;
}
.svg {
  font-size: 16px;
}
</style>