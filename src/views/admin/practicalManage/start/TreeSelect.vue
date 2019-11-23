<template>
  <div class="tree_select">
    <div class="tree_select_left">
      <div class="tree_select_left_class">
        <div class="tree_title">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        </div>
        <el-tree
          :props="props"
          node-key="id"
          ref="tree"
          :data="signalList"
          :load="loadNode"
          lazy
          show-checkbox
          @check="check"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span class="label">{{ node.label }}</span>
            <span v-show="data.showStu" class="select_stu">
              <el-button type="text" size="mini" @click="() => selectStu(data)">></el-button>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="tree_select_left_stu">
        <div class="tree_title">点击左边班级 > 可展开选择本班学生</div>
        <div class="stu_box">
          <div class="stu_box_title">{{stuTitle}}</div>
          <div class="stu_list">
            <el-checkbox v-model="stukAll" @change="stuCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="stuList" @change="stuListChange">
              <el-checkbox
                style="display:block;"
                v-for="city in stuData"
                :label="city"
                :key="city.id"
              >{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <div class="tree_select_right">
      <el-tag
        v-for="tag in tags"
        :key="tag.id"
        @close="handleClose(tag)"
        closable
        type="info"
      >{{tag.name}}</el-tag>
      <el-tag
        v-for="tag in stuTags"
        :key="tag.id"
        @close="CloseStu(tag)"
        closable
        type="info"
      >{{tag.name}}</el-tag>
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  data() {
    return {
      checkAll: false,
      stukAll: false,
      stuTitle: "",
      stuData: [],
      stuList: [],
      signalList: [
        { name: "初一", id: "1" },
        { name: "初二", id: "2" },
        { name: "初三", id: "3" },
        { name: "高一", id: "4" }
      ],
      tags: [],
      stuTags: [],
      props: {
        label: "name",
        isLeaf: (data, node) => {
          if (node.level == 2) {
            // 第三层没有子节点
            return true;
          }
        }
      }
    };
  },
  watch:{
    tags(n,o){
      this.$emit('classIdList', n)
    }
  },
  methods: {
    stuListChange(value) {
      let arr = [];
      this.stuData.forEach(v => {
        arr = this.stuTags.filter(item => {
          return item.id != v.id;
        });
        this.stuTags = arr;
      });
      value.forEach(v => {
        this.stuTags.push(v)
        this.handleClose({id:v.classId})
      });
      var obj = {};
      this.stuTags = this.stuTags.reduce(function(item, next) {
        obj[next.id] ? "" : (obj[next.id] = true && item.push(next));
        return item;
      }, []);
    },
    stuCheckAllChange(val) {},
    handleClose(tag) {
      this.filterTags({ key: tag.id });
      this.$refs.tree.setCheckedNodes(this.tags);
    },
    filterTags(data) {
      let arr = this.tags.filter(item => {
        return item.id != data.key;
      });
      this.tags = arr;
    },
    check(data, node) {
      let _node = this.$refs.tree.getNode(data.id);
      if (_node.level == 1) {
        if (_node.checked) {
          _node.childNodes.forEach(sonVal => {
            this.filterTags(sonVal);
          });
          this.tags.push({ name: _node.label, id: _node.key });
        } else {
          this.filterTags(_node);
        }
      } else {
        if(_node.checked) this.cleanClassStu(_node.key)
        if (_node.parent.checked) {
          _node.parent.childNodes.forEach(sonVal => {
            this.filterTags(sonVal);
          });
          this.tags.push({ name: _node.parent.label, id: _node.parent.key });
        } else {
          this.filterTags(_node.parent);
          _node.parent.childNodes.forEach(val => {
            this.filterTags(val);
          });
          _node.parent.childNodes.forEach(val => {
            if (val.checked) {
              let flag = false;
              if (!this.tags.length)
                this.tags.push({ name: val.label, id: val.key });
              this.tags.forEach(v => {
                if (v.id != val.key) {
                  flag = true;
                }
              });
              if (flag) {
                this.tags.push({ name: val.label, id: val.key });
                flag = false;
              }
            } else {
              this.filterTags(val);
            }
          });
        }
      }
    },
    handleCheckAllChange(val) {
      let list = val ? this.signalList : [];
      this.$refs.tree.setCheckedNodes(list);
      this.tags = list;
    },
    CloseStu(tag){
      this.stuTags = this.stuTags.filter(item=>{
        return item.id != tag.id
      })
      this.stuList = this.stuList.filter(item=>{
        return item.id != tag.id
      })
    },
    cleanClassStu(classId){
      this.stuTags = this.stuTags.filter(item=>{
        return item.classId != classId
      })
      this.stuList = this.stuList.filter(item=>{
        return item.classId != classId
      })
    },
    selectStu(data) {
      this.stuTitle = data.name;
      let stu = [
        { name: "A同学", id: data.id+"1-1" ,classId:data.id },
        { name: "B同学", id: data.id+"2-2" ,classId:data.id},
        { name: "C同学", id: data.id+"3-3" ,classId:data.id}
      ];
      this.stuData = stu;
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(this.signalList);
      } else if (node.level === 1) {
        // 可以换成自定义的方法，ajax请求之类的，node.data是所选节点的对象信息
        let data = [
          { name: node.label + "（1）班", id: node.key + "_1", showStu: true },
          { name: node.label + "（2）班", id: node.key + "_2", showStu: true },
          { name: node.label + "（3）班", id: node.key + "_3", showStu: true }
        ];
        // node.son = data
        return resolve(data);
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
    width: 145px;
    display: inline-block;
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
      width: 50%;
      vertical-align: top;
      height: 100%;
      overflow-y: scroll;
      .tree_title {
        padding-left: 24px;
      }
    }
    &_stu {
      display: inline-block;
      width: 48%;
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