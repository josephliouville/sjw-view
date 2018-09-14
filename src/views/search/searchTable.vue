<template>
    <div class="app-container">
        <div class="toolbar">
            <!-- <el-input placeholder="请输入筛选条件" v-model="listQuery.title" style="width: 200px;" class="filter" @keyup.enter.native="handleFilter" /> -->
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
            <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
            <el-button class="tableHeadSetting" icon="el-icon-setting" @click="tableHeadSetting">自定义表头</el-button>
        </div>

        <div class="filter-container" v-if="tableHeadSettingShow">
            <el-checkbox-group v-model="checkboxVal">
                <el-checkbox label="name">姓名</el-checkbox>
                <el-checkbox label="sex">性别</el-checkbox>
                <el-checkbox label="age">年龄</el-checkbox>
                <el-checkbox label="nation">民族</el-checkbox>
                <el-checkbox label="job">工作单位</el-checkbox>
                <el-checkbox label="department">所在部门</el-checkbox>
                <el-checkbox label="inWork">职务</el-checkbox>
                <el-checkbox label="certificateNum">身份证号</el-checkbox>
                <el-checkbox label="political">政治面貌</el-checkbox>
                <el-checkbox label="isnotDisciplinary">是否纪检监察干部</el-checkbox>
            </el-checkbox-group>
        </div>
        <el-table v-loading="listLoading" :key="key" :data="list" border fit stripe highlight-current-row style="width: 100%;">
            <!--复选框 -->
            <el-table-column type="selection" align="center"></el-table-column>
            <!-- <el-table-column label="姓名" prop="q" align="center" width="65"></el-table-column> -->
            <!-- <el-table-column label="性别" prop="w" align="center" width="65"></el-table-column>
      <el-table-column label="年龄" prop="z" align="center" width="65"></el-table-column>
      <el-table-column label="民族" prop="e" align="center" width="65"></el-table-column>
      <el-table-column label="工作单位" prop="r" align="center"></el-table-column>
      <el-table-column label="所在部门" prop="a" align="center"></el-table-column>
      <el-table-column label="职务" prop="s" align="center"></el-table-column>
      <el-table-column label="身份证号" prop="d" min-width="150px" align="center"> </el-table-column>
      <el-table-column label="政治面貌" prop="f" align="center"> </el-table-column>
      <el-table-column label="是否纪检监察干部" prop="g" align="center"> </el-table-column> -->
            <el-table-column v-for="item in tableHead" :key="item" :label="keyValue[item]" align="center" :min-width="thWidth[item]">
                <template slot-scope="scope">
                    {{ scope.row[item] }}
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="150px" align="center">
                <template slot-scope="scope">
                    <el-button class="mini" size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                    <el-button class="mini" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button class="mini" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script>
import { getTableList } from "@/api/searchService"
import axios from 'axios';

export default {
    name: "ComplexTable",
    // directives: {
    //   waves
    // },
    filters: {},
    data() {
        return {
            keyValue: {
                "name": "姓名",
                "sex": "性别",
                "age": "年龄",
                "nation": "民族",
                "job": "工作单位",
                "department": "所在部门",
                "inWork": "职务",
                "certificateNum": "身份证号",
                "political": "政治面貌",
                "isnotDisciplinary": "是否纪检监察干部"
            },
            thWidth: {
                certificateNum: "150px"
            },
            key: 1,
            tableHead: [],
            checkboxVal: [],
            tableHeadSettingShow: false, // 自定义表头 默认不显示
            list: null,
            total: null,
            listLoading: true,
            listQuery: {
                page: 1,
                size: 10,
            },

            rules: {
            },
            downloadLoading: false
        };
    },
    created() {
        // 获取表格数据
        this.getList();
        this.getTableHead()

    },
    watch: {
        checkboxVal(valArr) {
            let defaultTableHead = [];
            for (let i in this.keyValue) {
                defaultTableHead.push(i)
            }
            this.tableHead = defaultTableHead.filter(i => valArr.indexOf(i) >= 0);
            localStorage.tableHead = this.tableHead
            this.key = this.key + 1// 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
        }
    },
    methods: {
        // 获取数据
        getList() {
            this.listLoading = true;
            getTableList(this.listQuery).then((res) => {
                if (res.data.data) {
                    let data = res.data
                    this.list = data.data;
                    this.total = data.count;
                }
            })

            setTimeout(() => {
                this.listLoading = false;
            }, 1.5 * 1000);
        },

        // 自定义表头开关
        tableHeadSetting() {
            this.tableHeadSettingShow = !this.tableHeadSettingShow;
        },
        // 从localstorage中获取表头
        getTableHead() {
            let defaultTableHead = [];
            for (let i in this.keyValue) {
                defaultTableHead.push(i)
            }
            this.tableHead = localStorage["tableHead"] ? localStorage["tableHead"].split(",") : defaultTableHead;
            this.checkboxVal = this.tableHead;
        },
        // 详情
        handleDetail(index, row) {
            console.log("详情");

        },
        // 编辑表格
        handleEdit(index, row) {
            console.log("编辑");
        },
        // 删除表格
        handleDelete(row) {

            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                const index = this.list.indexOf(row);
                this.list.splice(index, 1);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });

            });

            // 
            // this.$notify({
            //     title: "成功",
            //     message: "删除成功",
            //     type: "success",
            //     duration: 2000
            // });

        },
        // 筛选
        handleFilter() {
            this.listQuery.page = 1;
            this.getList();
        },
        // 更改每页显示条数
        handleSizeChange(val) {
            this.listQuery.size = val;
            this.getList();
        },
        // 跳转至某一页
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        },


        // 添加
        handleCreate() {
            console.log("添加")
            // this.$nextTick(() => {
            //     this.$refs["dataForm"].clearValidate();
            // });
        },
        // 导出Excel
        handleDownload() {
            this.downloadLoading = true;
            import("@/vendor/Export2Excel").then(excel => {
                const tHeader = [
                    "timestamp",
                    "title",
                    "type",
                    "importance",
                    "status"
                ];
                const filterVal = [
                    "timestamp",
                    "title",
                    "type",
                    "importance",
                    "status"
                ];
                const data = this.formatJson(filterVal, this.list);
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "table-list"
                });
                this.downloadLoading = false;
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === "timestamp") {
                        return parseTime(v[j]);
                    } else {
                        return v[j];
                    }
                })
            );
        }
    }
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 20px;
}
.pagination-container {
  margin-top: 20px;
}
.filter {
  position: absolute;
  right: 20px;
}
.el-checkbox {
  margin-bottom: 8px;
}
.tableHeadSetting {
  position: absolute;
  right: 20px;
}
.el-button.mini {
  margin-bottom: 5px;
}
</style>
