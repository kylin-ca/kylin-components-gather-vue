export const nodeList = [{
        id: 'nodeA',
        name: '流程C-节点A',
        type: 'task',
        left: '200px',
        top: '15px',
        ico: 'el-icon-user-solid'
    },
    {
        id: 'nodeB',
        name: '流程C-节点B',
        type: 'task',
        left: '500px',
        top: '200px',
        ico: 'el-icon-goods'
    },
    {
        id: 'nodeC',
        name: '流程C-节点C',
        type: 'task',
        left: '200px',
        top: '378px',
        ico: 'el-icon-present'
    },
    {
        id: 'nodeD',
        name: '流程d-节D',
        type: 'task',
        left: '50px',
        top: '200px',
        ico: 'el-icon-present',
        state: 'success'
    }
]
export const lineList = [{
        from: 'nodeA',
        to: 'nodeB',
        label: '描述a'
    },
    {
        from: 'nodeB',
        to: 'nodeC',
        label: '描述b'
    },
    {
        from: 'nodeD',
        to: 'nodeC'
    },
    {
        from: 'nodeD',
        to: 'nodeA',
        label: '描述c'
    }
]