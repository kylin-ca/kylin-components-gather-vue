<template>
  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" >
    <span
      slot-scope="{ node }"
      draggable="true"
      @dragstart="drag"
      :id="node.label"
      nodeName="my-draggable-node"
    >
      <span>{{ node.label }}</span>
    </span>
  </el-tree>
</template>

<script>
var mousePosition = {
  left: -1,
  top: -1,
}
export default {
  data() {
    return {
      data: [
        {
          label: '流程A',
          id: '1',
          children: [
            {
              label: '流程A-1',
              id: '2',
              children: [
                {
                  label: '流程A 1-1-1',
                  id: '3',
                },
              ],
            },
          ],
        },
        {
          label: '流程B',
          id: '4',
          children: [
            {
              label: '流程B 2-1',
              id: '5',
              children: [
                {
                  label: '流程B 2-1-1',
                  id: '6',
                },
              ],
            },
            {
              label: '流程B 2-2',
              id: '7',
              children: [
                {
                  label: '流程B 2-2-1',
                  id: '8',
                },
              ],
            },
          ],
        },
        {
          label: '流程C 3',
          id: '9',
          children: [
            {
              label: '流程C 3-1',
              id: '10',
              children: [
                {
                  label: '流程C 3-1-1',
                  id: '11',
                },
              ],
            },
            {
              label: '流程C 3-2',
              id: '12',
              children: [
                {
                  label: '流程C 3-2-1',
                  id: '13',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  //   components: { draggable },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    allowDrop() {
      return true
    },
    allowDrag() {
      return true
    },
    drag(ev) {
      // console.log()
      const nodeName = ev.target.getAttribute('nodeName')
      const { id } = ev.target
      // document.getElementById("hot")
      // console.log(document.getElementById(id))
      let param = JSON.stringify({
        nodeData: id,
        nodeName,
      })
      ev.dataTransfer.setData('Text', param)
    },
    // 拖拽开始时触发
    move(node, evt) {
      // console.log(evt,'------------')
      this.nodeMenu = JSON.stringify(node.data)
    },
    // 拖拽结束时触发
    end(node, a, b, evt) {
      this.$emit('addNode', evt, this.nodeMenu, mousePosition)
    },
  },
}
</script>