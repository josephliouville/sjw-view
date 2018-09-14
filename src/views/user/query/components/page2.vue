<template>
  <div class="yl-validation">
    <el-table :data="tableData" style="width: 100%" :cell-class-name="cellClassName">
      <el-table-column label="学校">
        <template slot-scope="scope">
          <template v-if="!scope.row.appended">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
          <validation-item v-else :errorMsg="scope.row.errorMsg.date">
            <el-input v-model="scope.row.date" @change="handleChange(scope.row)"></el-input>
          </validation-item>
        </template>
      </el-table-column>
      <el-table-column label="入学时间">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" v-if="!scope.row.appended">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
          <validation-item v-else :errorMsg="scope.row.errorMsg.name">
            <el-date-picker v-model="scope.row.name" type="date" placeholder="选择日期" @change="handleChange(scope.row)">
            </el-date-picker>
          </validation-item>
        </template>
      </el-table-column>
      <el-table-column label="毕业时间">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" v-if="!scope.row.appended">
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>

          <validation-item v-else :errorMsg="scope.row.errorMsg.address">
            <el-date-picker v-model="scope.row.address" type="date" placeholder="选择日期" @change="handleChange(scope.row)" :picker-options="{
                disabledDate(time) {
                  if (!scope.row.name) {
                      return false
                  }
                  return time.getTime() < scope.row.name.getTime();
                },
            }">
            </el-date-picker>
          </validation-item>
        </template>
      </el-table-column>
      <el-table-column label="操作" class="xxx">
        <template slot-scope="scope">
          <el-button v-if="scope.row.appended" :class="{'is-appended': scope.row.appended}" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="handleCreate">新增</el-button>
    <el-button @click="handleSubmit">提交</el-button>
  </div>
</template>

<script>
import SimpleValidator from '@/lib/SimpleValidator'
// 添加验证规则测试
// SimpleValidator.addRule('isNumber', function(value, errorMsg) {
//   if (+value < 0) {
//     return errorMsg
//   }
// })
export default {
  props: {
    submit: Function
  },
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      addData: []
    }
  },
  components: {
    ValidationItem: {
      props: {
        errorMsg: {
          type: Array,
          default() {
            return []
          }
        }
      },
      render() {
        const { errorMsg } = this
        return (
          <div
            class={['yl-validation-item', { 'is-error': errorMsg.length > 0 }]}
          >
            <div class="yl-validation-item__content">{this.$slots.default}</div>
            <div class="yl-validation-item__error">
              {errorMsg.length > 0 ? <span>{errorMsg[0]}</span> : null}
            </div>
          </div>
        )
      }
    }
  },
  methods: {
    cellClassName({ row, column, rowIndex, columnIndex }) {
      if (row.validator && columnIndex === 3) {
        return 'yl-validator-item__btn'
      } else if (row.validator) {
        return 'yl-validator-item__td'
      }
    },
    handleChange(row) {
      row.validator && row.validator()
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      this.tableData = this.tableData.filter((item, idx) => index !== idx)
    },
    handleSubmit() {
      let error
      this.tableData.forEach((element, index) => {
        error = element.validator && element.validator()
      })
      let hasError = false
      error = error || {}
      Object.keys(error).forEach(key => {
        if (error[key].length > 0) {
          hasError = true
        }
      })
      if (hasError) {
        this.$alert('有错误')
      } else {
        this.submit(true)
      }
    },
    handleCreate() {
      this.tableData.push({
        date: '',
        name: '',
        address: '',
        appended: true,
        validator: function() {
          this.errorMsg = new SimpleValidator()
            .add(this.date, 'date', 'isNonEmpty', '请填写毕业学校')
            .add(this.name, 'name', 'isNonEmpty', '请选择入学时间')
            .add(this.address, 'address', 'isNonEmpty', '请选择毕业时间')
            .validate()
          return this.errorMsg
        },
        errorMsg: []
      })
    }
  },
  watch: {}
}
</script>
<style>
.yl-validation-item {
  margin-bottom: 20px;
  position: relative;
}
.yl-validation-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
}
.yl-validation-item.is-error .el-input__inner,
.yl-validation-item.is-error .el-input__inner:focus,
.yl-validation-item.is-error .el-textarea__inner,
.yl-validation-item.is-error .el-textarea__inner:focus {
  border-color: #f56c6c;
}
.yl-validator-item__btn .cell {
  position: relative;
  top: -10px;
}
.yl-validator-item__td {
  padding-bottom: 0 !important;
}
</style>
