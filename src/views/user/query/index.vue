<template>
    <div class="">
        <div class="tree-container">
            <h2>组织架构</h2>
            <el-tree ref="tree" :data="tree" :props="defaultProps" :filter-node-method="filterNode" :highlight-current=true accordion :expand-on-click-node=false class="filter-tree" @node-click="onTreeClick"  />
        </div>
        <div class="form">
            <el-form :inline="true" :model="search" :rules="rules" ref="search">

                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="姓名" v-model="search.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age1" class="age-form1">
                    <el-input placeholder="例:30" class="age" name="age" v-model="search.age1" clearable></el-input>
                    <span class="line">-</span>

                </el-form-item>
                <el-form-item prop="age2" class="age-form2">
                    <el-input placeholder="例:50" class="age" v-model="search.age2" clearable></el-input>
                </el-form-item>
                <el-form-item label="职务级别" prop="levels">
                    <el-select v-model="search.levels" no-data-text="无" clearable placeholder="职务级别" class="levels">
                        <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份证号" prop="id_card">
                    <el-input placeholder="身份证号" class="id_card" v-model="search.id_card" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(search)">查询</el-button>
                    <el-button @click="resetForm('search')">重置</el-button>
                </el-form-item>
            </el-form>
          
            <searchTable ref="searchTable"/>
        </div>
    </div>

</template>

<script>
import searchTable from "./searchTable";

export default {
    name: "search",
    components: {
        searchTable
    },
    data() {
        return {
            search: {
                name: "",
                age1: "",
                age2: "",
                id_card: "",
                levels: ""
            },
            options: [
                { name: "职务级别1" },
                { name: "职务级别2" },
                { name: "职务级别3" }
            ],
            rules: {
                name: [
                    {
                        validator: (rule, value, callback) => {
                            if (value === "") {
                                console.log("为空");
                                // callback(new Error('请再次输入密码'));
                            }
                        }
                    }
                ],
                trigger: "blur"
            },
            tree: [{
                id: 1, label: "Level one 1",
                children: [{
                    id: 4, label: "Level two 1-1",
                    children: [{
                        id: 9, label: "Level three 1-1-1"
                    }, { id: 10, label: "Level three 1-1-2" }]
                }]
            }, {
                id: 2,
                label: "Level one 2",
                children: [{
                    id: 5,
                    label: "Level two 2-1"
                }, {
                    id: 6,
                    label: "Level two 2-2"
                }]
            }, {
                id: 3,
                label: "Level one 3",
                children: [
                    {
                        id: 7,
                        label: "Level two 3-1"
                    },
                    {
                        id: 8,
                        label: "Level two 3-2"
                    }
                ]
            }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    },
    watch: {
        filterText(val) {
            this.$refs.tree2.filter(val);
        }
    },

    methods: {
        onSubmit(data) {
            // console.log(data);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        onTreeClick(node) {
            console.log(node.id);
            this.$refs.searchTable.getList()
        }
    }
};
</script>

<style  scoped  rel="stylesheet/scss" lang="scss">
.content {
  /* background: rgb(242, 242, 242); */
}
.tree-container {
  position: absolute;
  top: 0;
  width: 180px;
  height: 100%;
  margin: 10px;
}
.tree-container > h2 {
  padding: 0;
  font-size: 16px;
  color: #545454;
  padding-left: 10px;
  line-height: 48px;
}
.form {
  width: 100%;
  padding-left: 210px;
}
.el-form {
  text-align: center;
  margin: 50px auto 0;
}
// @media (max-width: 1297px){
//     .el-form {
//     text-align: left;
// }

.el-form-item {
  padding: 0 20px;
}
.age-form1 {
  padding-right: 0;
}
.age-form2 {
  padding-left: 0;
}
.line {
  text-align: center;
}
.age {
  width: 80px;
}
.id_card {
  width: 300px;
}
.levels {
  width: 150px;
}

</style>
<style>

.el-tree-node__content>.el-tree-node__expand-icon{
    font-size: 1.3rem ;
    color: #6886ab;
}
.el-tree-node__content>.el-tree-node__expand-icon.is-leaf{
    color: #6886ab00;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background: #cfd9e4;
}
</style>

