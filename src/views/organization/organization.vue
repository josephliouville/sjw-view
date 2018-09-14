<template>
    <div class="app-container">
        <div class="buttons">
            <el-button type="primary" @click="dialogVisible = true;newNode='';parentNode=[]">新增</el-button>
        </div>
        <tree-table   v-loading="listLoading" :data="data" :columns="columns" border @tableUpdate="tableUpdate"/>
        <el-dialog title="新增" :visible.sync="dialogVisible" width="300px">
            <el-input clearable placeholder="新增机构名称" v-model="newNode" />
            <el-cascader placeholder="请选择父机构名称" expand-trigger="hover" :options="options" :props="props" v-model="parentNode">
            </el-cascader>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '@/components/TreeTable'

export default {
    name: 'TreeTableDemo',
    components: { treeTable },
    data() {
        return {
            //新增
            dialogVisible: false,
            listLoading:true,
            newNode: "",
            parentNode: [],
            props: {
                value: "id",
                label: "text"
            },
            options: [{
                id: "aa",
                text: "aaa",
                children: [{
                    id: "bb", text: "bbb"                }, {
                    id: 3, text: "3"                }, {
                    id: 4, text: "4"                }, {
                    id: 5, text: "5"                }]
            }, {
                id: "11",
                text: "11",
                children: [{
                    id: 2, text: "12"                }, {
                    id: 3, text: "13"                }, {
                    id: 4, text: "14"                }, {
                    id: 5, text: "15"                }]
            }],
            // 树形表格
            columns: [{ text: '事件', value: 'event' }, { text: '时间', value: 'timeLine' },],
            data: []
        }
    },
    methods: {
        getData() {
            setTimeout(() => {
                console.log("getData")
                this.listLoading=false;
                this.data = [
                    {
                        id: 0,
                        event: '事件1',
                        timeLine: 50,
                        comment: '无'
                    },
                    {
                        id: 1,
                        event: '事件1',
                        timeLine: 100,
                        comment: '无',
                        children: [
                            {
                                id: 2,
                                event: '事件2',
                                timeLine: 10,
                                comment: '无'
                            },
                            {
                                id: 3,
                                event: '事件3',
                                timeLine: 90,
                                comment: '无',
                                children: [
                                    {
                                        id: 4,
                                        event: '事件4',
                                        timeLine: 5,
                                        comment: '无'
                                    },
                                    {
                                        id: 5,
                                        event: '事件5',
                                        timeLine: 10,
                                        comment: '无'
                                    },
                                    {
                                        id: 6,
                                        event: '事件6',
                                        timeLine: 75,
                                        comment: '无',
                                        children: [
                                            {
                                                id: 7,
                                                event: '事件7',
                                                timeLine: 50,
                                                comment: '无',
                                                children: [
                                                    {
                                                        id: 71,
                                                        event: '事件71',
                                                        timeLine: 25,
                                                        comment: 'xx'
                                                    },
                                                    {
                                                        id: 72,
                                                        event: '事件72',
                                                        timeLine: 5,
                                                        comment: 'xx'
                                                    },
                                                    {
                                                        id: 73,
                                                        event: '事件73',
                                                        timeLine: 20,
                                                        comment: 'xx'
                                                    }
                                                ]
                                            },
                                            {
                                                id: 8,
                                                event: '事件8',
                                                timeLine: 25,
                                                comment: '无'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ];
            }, 1000)

        },
        onSubmit() {
            console.log({
                newNode: this.newNode,
                parentNode: this.parentNode
            })
            this.$message({
                type: 'success',
                message: '添加成功'
            });
            this.dialogVisible = false;
            this.getData();
        },
        tableUpdate(value){
            console.log('收到了'+value);
            this.getData();
        }

    },
    created() {
        this.getData();

    }
}
</script>

<style scoped>
.buttons {
  margin-bottom: 15px;
}
.el-cascader {
  width: 100%;
  margin-top: 20px;
}
</style>
