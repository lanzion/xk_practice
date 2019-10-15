<template>
  <div class="worklist">
    <div class="g-search--wrap clearfix">
      <div class="contest">
        <span>发起机构</span>
        <p>教育局名称、、、</p>
      </div>
      <div class="contest">
        <span>联系人</span>
        <p>联系人</p>
      </div>
      <div class="contest">
        <span>联系方式</span>
        <p>11111111111</p>
      </div>
      <div class="contest">
        <span>实践主题</span>
        <p>实践主题名称</p>
      </div>
      <div class="contest">
        <span>实践时间</span>
        <p>2019年6月1日 - 2019年7月1日</p>
      </div>

      <el-table
        :data="tableData4"
        style="width: 100%"
        :style="{'marginTop':'20px','marginBottom':'20px'}"
      >
        <el-table-column fixed prop="date" label="活动标题" width="150" align="center"></el-table-column>
        <el-table-column prop="name" label="活动描述" align="center" :style="{'padding':'20px'}"></el-table-column>
        <el-table-column fixed="right" label="活动附件" width="120" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small">点击下载</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="mhcshool">
        <div class="mhcshool_fl">
          <div :style="{'paddingLeft':'30px'}">
            <el-radio v-model="radio" label="1">小学</el-radio>
            <el-radio v-model="radio" label="2">中学</el-radio>
          </div>
          <div class="contest">
            <span>最少参与</span>
            <p>25</p>
          </div>
          <div class="contest">
            <span>项目市场</span>
            <p>2小时</p>
          </div>
          <div class="contest">
            <span>负责人</span>
            <p>张三</p>
          </div>
        </div>
        <div class="mhcshool_fr">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>人文教育</el-breadcrumb-item>
            <el-breadcrumb-item>人文艺术教育</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="contest">
            <span>负责人</span>
            <p>张三</p>
          </div>
          <div class="contest">
            <span></span>
          </div>
          <div class="contest">
            <span>负责人</span>
            <p>张三</p>
          </div>
        </div>
      </div>
      <div class="contest" :style="{'marginBottom':'20px'}">
        <span></span>
        <p>本次事件活动详细地址</p>
      </div>
      <div class="imgnew">
        <img src alt />
      </div>
      <div class="contest">
        <span>课程名称</span>
        <p>课程名称</p>
      </div>
      <div class="contest">
        <span>学习目标</span>
        <p>学习目标</p>
      </div>
      <div class="description">课程内容</div>
      <div class="ctext"></div>
      <!-- 分割 -->
      <div class="mhcshool">
        <div class="mhcshool_fl">
          <div class="contest" :style="{'marginTop':'0px','height':'40px'}">
            <span>上课年级</span>
            <p :style="{'background':'#fff','paddingLeft':'70px'}">
              <el-select v-model="value" placeholder="请选择" :style="{'width':'400px'}" class>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </p>
          </div>
          <div class="contest">
            <span>班主任</span>
            <p :style="{'background':'#fff'}">张菲菲</p>
          </div>
          <div class="contest">
            <span>上课日期</span>
            <p>2019年6月7号</p>
          </div>
          <div class="contest">
            <span>上课时间</span>
            <p :style="{'background':'#fff'}">08：00 - 10：00</p>
          </div>
        </div>
        <div class="mhcshool_fr">
          <div class="contest" :style="{'marginTop':'0px','height':'40px'}">
            <span>上课班级</span>
            <p :style="{'background':'#fff','paddingLeft':'70px'}">
              <el-select
                v-model="value"
                placeholder="请选择"
                size="mini"
                :style="{'width':'400px'}"
                class
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </p>
          </div>
          <div class="contest">
            <span>联系方式</span>
            <p :style="{'background':'#fff'}">11111111111</p>
          </div>
        </div>
      </div>

      <div class="goback">
        <el-button @click="goback()">返回列表</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "worklist",
  data() {
    return {
      radio: "1",
      tableData4: [
        {
          date: "2016-05-02",
          name:
            "烟波浩淼的南中国海，孕育和滋养了悠远深厚的中华文明。她的怀中不仅蕴藏着丰富的自然资源，也养护着海上丝绸之路那段岁月的辉煌。2007年，广东省南澳县三点金海域，渔民进行潜水捕捞作业的时候，发现了沉睡海底几百年的明代商船“南澳1号”，再次把一个时代传奇带到世人面前2010至2012年，国家文物局组织水下考古队对沉船进行了三次考古发据，打捞出水各类文物超过3000牛，并确定该船沉没于明万历早期。同样在南海海域，在2004年马来西亚距加奴州东海岸约6英里的海域，南海海洋考古公司对当地渔民发现的沉船“万历号”进行水下发掘，采集出水文物7000多件，并确定沉船年代为万历晚期。广东省博物馆以这两艘沉船的发现及研究为基础，探素明代海洋中西方海洋贸易的发展、内函与变迁。展览分为“序篇:中国海洋贸易黄金时代的到来”，“碧海沉舟一东西洋沉船的发现”，“货通万国-海洋贸易物品”，“时间胶流动的社会”，“东西汇流:大航海时代”五部分と观众通过展览去了解这一段作为中国海洋贸易黄金时代前奏的绚丽图景。此外，“广东历史文化陈列”第二篇“扬帆世界”部分浓缩展示了中国外销艺术品在西方颇受目的历史。就让以博物馆为媒介，回到那个波光浩渺的时代，开启我们的探索之旅吧。本次活动分为两个主题，分别是“触摸大航海时代”和“重返十三行。"
        },
        {
          date: "2016-05-02",
          name:
            "烟波浩淼的南中国海，孕育和滋养了悠远深厚的中华文明。她的怀中不仅蕴藏着丰富的自然资源，也养护着海上丝绸之路那段岁月的辉煌。2007年，广东省南澳县三点金海域，渔民进行潜水捕捞作业的时候，发现了沉睡海底几百年的明代商船“南澳1号”，再次把一个时代传奇带到世人面前2010至2012年，国家文物局组织水下考古队对沉船进行了三次考古发据，打捞出水各类文物超过3000牛，并确定该船沉没于明万历早期。同样在南海海域，在2004年马来西亚距加奴州东海岸约6英里的海域，南海海洋考古公司对当地渔民发现的沉船“万历号”进行水下发掘，采集出水文物7000多件，并确定沉船年代为万历晚期。广东省博物馆以这两艘沉船的发现及研究为基础，探素明代海洋中西方海洋贸易的发展、内函与变迁。展览分为“序篇:中国海洋贸易黄金时代的到来”，“碧海沉舟一东西洋沉船的发现”，“货通万国-海洋贸易物品”，“时间胶流动的社会”，“东西汇流:大航海时代”五部分と观众通过展览去了解这一段作为中国海洋贸易黄金时代前奏的绚丽图景。此外，“广东历史文化陈列”第二篇“扬帆世界”部分浓缩展示了中国外销艺术品在西方颇受目的历史。就让以博物馆为媒介，回到那个波光浩渺的时代，开启我们的探索之旅吧。本次活动分为两个主题，分别是“触摸大航海时代”和“重返十三行。"
        }
      ],
      resData: [
        {
          date: "2016-05-02",
          name:
            "烟波浩淼的南中国海，孕育和滋养了悠远深厚的中华文明。她的怀中不仅蕴藏着丰富的自然资源，也养护着海上丝绸之路那段岁月的辉煌。2007年，广东省南澳县三点金海域，渔民进行潜水捕捞作业的时候，发现了沉睡海底几百年的明代商船“南澳1号”，再次把一个时代传奇带到世人面前2010至2012年，国家文物局组织水下考古队对沉船进行了三次考古发据，打捞出水各类文物超过3000牛，并确定该船沉没于明万历早期。同样在南海海域，在2004年马来西亚距加奴州东海岸约6英里的海域，南海海洋考古公司对当地渔民发现的沉船“万历号”进行水下发掘，采集出水文物7000多件，并确定沉船年代为万历晚期。广东省博物馆以这两艘沉船的发现及研究为基础，探素明代海洋中西方海洋贸易的发展、内函与变迁。展览分为“序篇:中国海洋贸易黄金时代的到来”，“碧海沉舟一东西洋沉船的发现”，“货通万国-海洋贸易物品”，“时间胶流动的社会”，“东西汇流:大航海时代”五部分と观众通过展览去了解这一段作为中国海洋贸易黄金时代前奏的绚丽图景。此外，“广东历史文化陈列”第二篇“扬帆世界”部分浓缩展示了中国外销艺术品在西方颇受目的历史。就让以博物馆为媒介，回到那个波光浩渺的时代，开启我们的探索之旅吧。本次活动分为两个主题，分别是“触摸大航海时代”和“重返十三行。"
        }
      ]
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.contest {
  width: 100%;
  height: 30px;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  span {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    height: 30px;
    line-height: 30px;
    width: 60px;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #324157;
    background: #fff;
  }
  p {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #ccc;
    padding-left: 80px;
    font-weight: 400;
    font-size: 13px;
  }
  .contest_p {
    background: #fff;
  }
  .contest_e_l {
    width: 680px;
    float: left;
  }
  .contest_e_r {
    width: 680px;
    float: right;
    padding-left: 20px;
  }
}
.contest_f {
  height: 40px;
  width: 1100px;
  overflow: unset;
}
.mgtop {
  margin-top: 20px;
  margin-bottom: 20px;
}
.mhcshool {
  height: 175px;
  margin-bottom: 20px;
  .mhcshool_fl {
    width: 48%;
    float: left;
  }
  .mhcshool_fr {
    float: right;
    width: 48%;
  }
}
.imgnew {
  height: 80px;
  width: 100%;
  img {
    display: block;
    width: 80px;
    height: 80px;
    border: 1px solid #000;
  }
}
.description {
  margin-top: 20px;
  font-size: 16px;
  height: 30px;
  line-height: 30px;
}
.ctext {
  width: 100%;
  border: 1px solid #000;
  height: 200px;
  margin-bottom: 20px;
}
.goback {
  width: 100%;
  text-align: center;
}
</style>

