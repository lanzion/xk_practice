<template>
  <div class="tree_select">
    <div class="tree_select_left">
      <div class="tree_select_left_class">
        <div class="tree_title">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        </div>
        <el-tree
          :props="defaultProps"
          node-key="gradeId"
          ref="tree"
          :data="signalList"
          :load="loadNode"
          lazy
          show-checkbox
          @check="check"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span class="label">{{ node.label }} （{{data.studentNums}}人）</span>
            <span v-show="data.showStu" class="select_stu">
              <el-button type="text" size="mini" @click="() => selectStu(data)">></el-button>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="tree_select_left_stu">
        <div class="tree_title">点击左边班级 > 可展开选择本班学生</div>
        <div class="stu_box" v-if="stuData.length">
          <div class="stu_box_title">{{stuTitle.ShowGradeName+stuTitle.gradeName}}</div>
          <div class="stu_list">
            <el-checkbox v-model="stukAll" @change="stuCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="stuList" @change="stuListChange">
              <el-checkbox
                style="display:block;"
                v-for="city in stuData"
                :label="city"
                :key="city.studentId"
              >{{city.studentName}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <div class="tree_select_right">
      <el-tag
        v-for="tag in tags"
        :key="tag.gradeId"
        @close="handleClose(tag)"
        closable
        type="info"
      >{{tag.ShowGradeName?tag.ShowGradeName:''}}{{tag.gradeName}}({{tag.studentNums}}人)</el-tag>
      <el-tag
        v-for="tag in stuTags"
        :key="tag.studentId"
        @close="CloseStu(tag)"
        closable
        type="info"
      >{{tag.ShowGradeName+tag.gradeName+tag.studentName}}</el-tag>
    </div>
  </div>
</template>

<script>
import { log } from "util";
import { gradeList, classList, studentList } from "@/api/newApi.js";
export default {
  data() {
    return {
      checkAll: false,
      stukAll: false,
      stuTitle: {},
      stuData: [],
      stuList: [],
      signalList: [],
      tags: [],
      stuTags: [],
      defaultProps: {
        children: "children",
        label: "gradeName",
        studentNums: "studentNums"
      }
    };
  },
  watch: {
    tags(n, o) {
      let stuData = {
        gradeList:n,
        stuIdList:this.stuTags
      }
      this.$store.commit('changeastu_id_list', stuData)
      sessionStorage.setItem("stu_id_list", JSON.stringify(stuData));
    },
    stuTags(n,o){
      let stuData = {
        gradeList:this.tags,
        stuIdList:n
      }
      sessionStorage.setItem("stu_id_list", JSON.stringify(stuData));
      this.$store.commit('changeastu_id_list', stuData)
    }
  },
  created() {
    this.getGradeList();
  },
  methods: {
    // 获取年级列表
    getGradeList() {
      gradeList().then(res => {
        try {
          let data = res.data;
          if (data.code == 200) {
            this.signalList = data.appendInfo.grades;
          }
        } catch (err) {
          console.log(err);
        }
      });
    },
    stuListChange(value) {
      if (value.length == this.stuData.length) {
        this.stukAll = true;
        this.stuCheckAllChange(true);
        return;
      }
      this.stukAll = false;
      let arr = [];
      this.stuData.forEach(v => {
        arr = this.stuTags.filter(item => {
          return item.studentId != v.studentId;
        });
        this.stuTags = arr;
      });
      value.forEach(v => {
        this.stuTags.push(v);
        this.handleClose({ gradeId: v.gradeId });
      });
      var obj = {};
      this.stuTags = this.stuTags.reduce(function(item, next) {
        obj[next.studentId]
          ? ""
          : (obj[next.studentId] = true && item.push(next));
        return item;
      }, []);
    },
    stuCheckAllChange(val) {
      this.stuList = val ? this.stuData : [];
      this.stuTags = [];
      if (val) {
        let flag = false;
        this.tags.forEach(v => {
          if (v.gradeId == this.stuTitle.gradeId) {
            flag = true;
          }
        });
        if (!flag) {
          this.tags.push({
            gradeId: this.stuTitle.gradeId,
            gradeName: this.stuTitle.gradeName,
            showStu: this.stuTitle.showStu,
            studentNums: this.stuTitle.studentNums
          });
          this.$refs.tree.setCheckedNodes(this.tags);
        }
      } else {
        this.handleClose(this.stuTitle);
      }
    },
    handleClose(tag) {
      this.filterTags({ key: tag.gradeId });
      this.$refs.tree.setCheckedNodes(this.tags);
    },
    filterTags(data) {
      let arr = this.tags.filter(item => {
        return item.gradeId != data.key;
      });
      this.tags = arr;
    },
    filterStuTags(id){
      let arr = this.stuList.filter(item => {
        return item.gradeId != id;
      });
      this.stuList = arr;
      this.stuTags = this.stuList
    },
    check(data, node) {
      this.tags = node.checkedNodes;
      node.checkedNodes.forEach(v => {
        if (!v.showStu) {
          let _node = this.$refs.tree.getNode(v.gradeId);
          if (_node.level == 1 && _node.checked) {
            _node.childNodes.forEach(v => this.filterTags(v));
          }
        }
        this.filterStuTags(v.gradeId)
      });
    },
    handleCheckAllChange(val) {
      let list = val ? this.signalList : [];
      this.$refs.tree.setCheckedNodes(list);
      this.tags = list;
    },
    CloseStu(tag) {
      this.stuTags = this.stuTags.filter(item => {
        return item.studentId != tag.studentId;
      });
      this.stuList = this.stuList.filter(item => {
        return item.studentId != tag.studentId;
      });
    },
    cleanClassStu(classId) {
      this.stuTags = this.stuTags.filter(item => {
        return item.classId != classId;
      });
      this.stuList = this.stuList.filter(item => {
        return item.classId != classId;
      });
    },
    selectStu(val) {
      this.stuTitle = val;
      this.stuData = [];
      studentList({ classId: val.gradeId }).then(res => {
        try {
          let data = res.data;
          if (data.code == 200) {
            data.appendInfo.students.forEach(v => {
              v["ShowGradeName"] = val.ShowGradeName;
              v["gradeId"] = val.gradeId;
              v["gradeName"] = val.gradeName;
              this.stuData.push(v);
            });
          }
        } catch (err) {
          console.log(err);
        }
      });
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(this.signalList);
      } else if (node.level === 1) {
        // 可以换成自定义的方法，ajax请求之类的，node.data是所选节点的对象信息
        // 获取对应班级
        classList({ gradeId: node.key }).then(res => {
          try {
            let data = res.data;
            if (data.code == 200) {
              let list = data.appendInfo.classes;
              let arr = [];
              list.forEach(v => {
                arr.push({
                  gradeId: v.classId,
                  gradeName: v.className,
                  studentNums: v.studentNums,
                  showStu: true,
                  ShowGradeName: node.label
                });
              });
              return resolve(arr);
            }
          } catch (err) {
            console.log(err);
          }
        });
      } else {
        return resolve([]);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tree_select {
  .label {
    width: 160px;
    display: inline-block;
  }
  /deep/ button {
    color: #606266;
  }
  &_left {
    display: inline-block;
    width: 55%;
    height: 400px;
    border: 1px solid #ccc;
    margin-right: 20px;
    vertical-align: bottom;
    .tree_title {
      padding-top: 10px;
    }
    &_class {
      display: inline-block;
      width: 60%;
      vertical-align: top;
      height: 100%;
      overflow-y: scroll;
      .tree_title {
        padding-left: 24px;
      }
    }
    &_stu {
      display: inline-block;
      width: 38%;
      height: 100%;
      border-left: 1px solid #ccc;
      overflow-y: scroll;
      padding-left: 10px;
      box-sizing: border-box;
      .tree_title {
        font-size: 14px;
      }
      .stu_box_title {
        font-size: 14px;
        font-weight: 600;
        line-height: 42px;
      }
    }
  }
  &_right {
    display: inline-block;
    width: 40%;
    height: 400px;
    border: 1px solid #ccc;
    overflow-y: scroll;
  }
}
</style>