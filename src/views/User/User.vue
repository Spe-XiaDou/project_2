<template>
  <div class="user-container">
    <!-- 新增 或 编辑 等操作所弹出的对话框 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="dialogVisible"
      width="50%">
      <!-- 表单组件 -->
      <common-form
        :form="operateForm"
        :formLabel="operateFormLabel"
        :inline="true"
        ref="form"
      ></common-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 头部样式 -->
    <div class="manage-header">
      <el-button type="primary" @click="addUser">新增</el-button>
      <!-- 表单组件 -->
      <common-form
        :form="searchForm"
        :formLabel="formLabel"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from '@/components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
import { getUser } from '@/api/data.js'

export default {
  name: 'myUser',
  components: {
    CommonForm,
    CommonTable
  },
  mounted() {
    this.getList()
  },
  data() {
    /**
     * operate + : 进行添加、编辑等操作时所用到的数据
     * searchForm && formLabel : 搜索表单用的数据
     * table + : 要渲染的 表格 的数据
     * config : 表格的配置
     */
    return {
      flag: false,  // 进行 添加 或 编辑 操作时的一个节流阀
      operateType: 'add',
      dialogVisible: false,
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          // value: 0,
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ],
      searchForm: {
        keyword: ''
      },
      tableData: [
      ],
      tableLabel: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "age",
          label: "年龄"
        },
        {
          prop: "sexLabel",
          label: "性别"
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200
        },
        {
          prop: "addr",
          label: "地址",
          width: 320
        },
      ],
      config: {
        page: 1,
        total: 30,
        loading: Boolean
      }
    }
  },
  methods: {
    // 确认 || 取消：确认或取消操作
    confirm() {
      // 编辑数据的情况
      // 节流阀
      if (this.flag) {
        console.log("您的操作过快，请不要连续点击。");
        return
      }
      if (this.operateType === 'edit') {
        this.flag = true
        this.$http.post('/user/edit', this.operateForm).then(res => {
          console.log(res);
          this.dialogVisible = false
          this.getList()
        })
        setTimeout(() => this.flag = false, 1000)
      } else {
        this.flag = true
        this.$http.post('/user/add', this.operateForm).then(res => {
          console.log(res);
          this.dialogVisible = false
          this.getList()
        })
        setTimeout(() => 
        {
          this.flag = false
          // 清空 id
          this.operateForm.id = ''}, 1000)
      }
    },
    // 新增：用于获取用户填写的数据
    addUser() {
      this.operateType = 'add'
      this.dialogVisible = true

      /* 该操作会导致 operateForm 对象的内存改变。子组件数据无法同步。
       * 方案 1：让 子组件将数据清空 把数据发给 父组件。
       * 方案 2：直接修改对象中的值，而不修改对象。
       */
      // this.operateForm = {
      //   name: '',
      //   addr: '',
      //   age: '',
      //   birth: '',
      //   sex: ''
      // }

      this.operateForm.name = ''
      this.operateForm.addr = ''
      this.operateForm.age = ''
      this.operateForm.birth = ''
      this.operateForm.sex = ''
    },
    // 渲染页面
    getList(name = '') {
      // 节流阀 loading
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      getUser({
        page: this.config.page,
        name
      }).then(({data: res}) => {
        res.list.map(item => {
          item.sexLabel = item.sex === 0 ? "女" : "男"
          return item
        })
        this.config.total = res.count
        this.config.loading = false
        this.tableData = res.list
      })
    },
    editUser(row) {
      this.operateType = 'edit'
      this.dialogVisible = true
      // this.operateForm = row
      this.operateForm.name = row.name
      this.operateForm.addr = row.addr
      this.operateForm.age = row.age
      this.operateForm.birth = row.birth
      this.operateForm.sex = row.sex
      // id 是唯一标识，很关键，必须要传，不然方法无效。
      this.operateForm.id = row.id
    },
    delUser(row) {
      // 用到了 element-UI 的 Notice 类型的组件，包括MessageBox和Message
      // this.$confirm 语法 依赖于 Element-UI 的 MessageBox 弹框 组件
      // 参数：内容、标题、相关配置，可接受对象
      this.$confirm("此操作将永久删除该组件，是否继续？", "提示", {
        confirmButtonText: "确认",  // 确认按钮的文本
        cancelButtonText: "取消",   // 取消按钮的文本
        type: "warning"             // type字段表明消息类型，用于显示图标
      }).then(() => {
        const id = row.id
        this.$http.get("/user/del", {
          params: { id }
        }).then(res => {
          console.log(res);
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // 完成"删除操作"后，重新渲染页面
          this.getList()
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>