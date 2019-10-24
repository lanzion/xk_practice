<template>
    <el-form ref="form" class="g-form--wrap" label-width="80px" :model="form" :rules="rules" :isloading="isLoading" style="maxWidth:1200px;min-width: 700px" @submit.native.prevent>
        <el-form-item label="活动标题" prop="title">
            <el-col :span="14">
                <el-input v-model="form.title" placeholder="请输入活动标题"></el-input>
            </el-col>
        </el-form-item>
          <el-form-item label="活动时间" prop="activityTime">
            <el-col :span="14">
                 <el-date-picker
                            value-format="timestamp"
                            v-model="form.activityTime"
                            :editable="false"
                            clearable
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间" style="width:400px;" @change="changeTime">
                        </el-date-picker >
   
            </el-col>
        </el-form-item>
       <el-form-item label="活动主题" prop="activityTheme">
            <el-col :span="18">
                 <el-input type="textarea" :rows="4" placeholder="请填写活动主题" v-model="form.activityTheme" ></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="活动指标" prop="activityTarget">
            <el-col :span="18">
                 <el-input type="textarea" :rows="4" placeholder="请填写活动指标" v-model="form.activityTarget" ></el-input>
            </el-col>
        </el-form-item>
         <el-row>
            <el-col :span="8">
                 <el-form-item label="封面图片" prop="cover">
                        <ali-upload  :limit="1" :file-list.sync="cover" :before-upload="beforeUploadCover" accept=".gif,.jpg,.png,.jpeg" :on-change="uploadCover" @remove="remove">
                                   
                        </ali-upload>
                         <div>建议上传的图片像素为 590 x 300比例</div>
                </el-form-item>
            </el-col>
            
              <el-col :span="10">
                 <el-form-item label="详情海报" prop="playbillPage">
                        <ali-upload  :limit="1" :file-list.sync="playbillPage" :before-upload="beforeUploadCover" accept=".gif,.jpg,.png,.jpeg" :on-change="uploadCover1" @remove="remove1">
                                   
                        </ali-upload>
                         <div>建议上传的图片像素为 590 x 300比例</div>
                </el-form-item>
            </el-col>
        </el-row>
         <el-row>
                <el-form-item label="活动资源" prop="resourceList">
                    <el-col :span="14">
                        <ali-upload list-type="file" :accept="fileType" :file-list.sync="form.resourceList" :before-upload="beforeUploadFile">
                
                        </ali-upload>
                    </el-col>
                </el-form-item>
         </el-row>
        <el-row>
            <el-col :span="8">
                 <el-form-item label="地区筛选">
                   <region  type="object" @change="changeRegion"  class="regions"></region>
                </el-form-item>
                
            </el-col>
            <el-col :span="5">
                  <el-form-item label="学段">
                    <el-select v-model="searchForm.schoolType" clearable placeholder="请选择学段" @change="resetPage">
                        <el-option
                        v-for="item in fpStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="学校搜索">
                    <el-input v-model="searchForm.codeName" placeholder="请输入学校名称/编码"></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="3">
                 <el-button type="primary" style="marginLeft:10px;" @click="resetPage">搜索</el-button>
             </el-col>
        </el-row>
         <el-row>
             <el-col :span="11">
                 <div class="school-table-head">查询通知学校</div>
                   <div class="school-table-box">
                             <div class="school-table-tr school-table-tr-head">
                                <div class="school-table-td"><div class="school-table-cell">编码</div> </div>
                                <div class="school-table-td"><div class="school-table-cell">学校名称</div> </div>
                                <div class="school-table-td"><div class="school-table-cell">学段</div> </div>
                                <div class="school-table-td"><div class="school-table-cell">操作</div> </div>
                             </div>
                       </div>
                        <div class="school-infinite-box" v-infinite-scroll="load"  infinite-scroll-disabled="disabled">
                            <div class="school-table-box">
                                        <div class="school-table-tr" v-for="(item,index) in schoolList" :key="index"  v-show="schoolList.length!=0">
                                            <div class="school-table-td">
                                                    <div class="school-table-cell">
                                                            {{item.identityCode}}
                                                    </div>
                                                
                                            </div>
                                            <div class="school-table-td">
                                                <div class="school-table-cell">
                                                            {{item.schoolName}}
                                                </div>
                                            
                                            </div>
                                            <div class="school-table-td">
                                                <div class="school-table-cell">
                                                    <span v-if="item.schoolType=='primarySchool'">小学</span>
                                                    <span v-else-if="item.schoolType=='middleSchool'">初中</span>
                                                    <span v-else-if="item.schoolType=='highSchool'">高中</span>
                                                </div>
                                            </div>
                                            <div class="school-table-td">
                                                <div class="school-table-cell">
                                                    <el-button class="g-table--link" type="text" @click="changeSchool(item,index,'add')" v-if="checkIs(item)">选择</el-button>
                                                    <el-button class="g-table--link"  type="text" disabled v-else>已选择</el-button>
                                                </div>
                                            </div>
                                    </div>
                            </div>
                            <div v-if="schoolList.length!=0" class="school-show-title">
                                <p v-if="isLoading1">加载中...</p>
                                <p v-if="noMore">没有更多了</p>
                            </div>
                            
                        </div>
                      
                          <div class="school-table-footer" v-if="schoolList.length==0">
                                 暂无数据
                             </div>
                <div class="center-box">
                     <el-button type="primary" @click="allChose('add')">全部选择</el-button>
                </div>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
             <el-col :span="11">
                <div class="school-table-head">已选择通知学校</div>
                  <div class="school-table-box">
                             <div class="school-table-tr school-table-tr-head">
                                <div class="school-table-td"><div class="school-table-cell">编码</div> </div>
                                <div class="school-table-td"><div class="school-table-cell">学校名称</div> </div>
                                <div class="school-table-td"><div class="school-table-cell">学段</div> </div>
                                <div class="school-table-td"><div class="school-table-cell">操作</div> </div>
                             </div>
                       </div>
                 <div class="school-infinite-box">
                            <div class="school-table-box"  >
            
                                        <div class="school-table-tr" v-for="(item,index) in schoolListed" :key="index" v-show="schoolListed.length!=0">
                                            <div class="school-table-td">
                                                    <div class="school-table-cell">
                                                            {{item.identityCode}}
                                                    </div>
                                                
                                            </div>
                                            <div class="school-table-td">
                                                <div class="school-table-cell">
                                                            {{item.schoolName}}
                                                </div>
                                            
                                            </div>
                                            <div class="school-table-td">
                                                <div class="school-table-cell">
                                                    <span v-if="item.schoolType=='primarySchool'">小学</span>
                                                    <span v-else-if="item.schoolType=='middleSchool'">初中</span>
                                                    <span v-else-if="item.schoolType=='highSchool'">高中</span>
                                                </div>
                                            </div>
                                            <div class="school-table-td">
                                                <div class="school-table-cell">
                                                    <el-button class="g-table--link" type="text" @click="changeSchool(item,index,'del')">取消</el-button>
                                                   
                                                </div>
                                            </div>
                                    </div>
                            </div>
                            
                        </div>
                        <div class="school-table-footer" v-if="schoolListed.length==0">
                                 暂无数据
                        </div>
                 <div class="center-box">
                     <el-button type="primary" @click="allChose('del')">全部取消</el-button>
                </div>
            </el-col>
        </el-row>
        <el-form-item label="开启状态" prop="status">
            <el-radio-group v-model="form.status">
                <el-radio v-for="(item) in isMust" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
         <el-form-item label="活动通知">
            <div v-if="data.schActVoList&&data.schActVoList.length>0">
                <span v-for="(item,index) in data.schActVoList" :key="index" style="marginRight:15px;">
                    {{item.schoolName}}(<template v-if="item.status=='A'">已查看</template><template v-else>未查看</template>)
                    </span>
             </div>
             <div v-else>
                       暂无学校
             </div>
        </el-form-item>
        <el-form-item class="g-operate--box">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit" :loading="isLoading">修改活动</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { schoolList, activityEdit} from '@/api/resetApi'
import { activityDetail } from '@/api/newApi'
import { validateAccount, validateUserName, validateIDCode, validatePhone, validateEmail } from '@/utils/utility/validateRule'
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import aliUpload from '@/components/common/upload.vue'

export default {
    mixins: [uploadFileSize],
    components: {
        'ali-upload': aliUpload
    },
    data() {
        return {
            isLoading1: false,
            fileType: '.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar',
            activityTime: [],
            cover: [], // 封面
            playbillPage: [],
            data: {},
            searchForm: {
                provinceId: '',
                cityId: '',
                areaId: '',
                schoolType: '',
                codeName: '',
            },
            resetList: [// 学校列表备份
                
            ],
            schoolList: [// 学校列表
                
            ],
            schoolListed: [// 学校被选中列表
                
            ],
           
            fpStates: [
              
                {
                    value: 'primarySchool',
                    label: '小学'
                },
                {
                    value: 'middleSchool',
                    label: '初中'
                },
                {
                    value: 'highSchool',
                    label: '高中'
                }
            ],
            cover: [],
            isLoading: false,
            dialogVisible: false,
            isMust: [
                {
                    id: 1,
                    name: '开启'
                },
                {
                    id: 0,
                    name: '关闭'
                }
            ],
            form: {
                status: '', // 开启状态
                activityTime: '',
                startDateStr: '', // 开始时间
                endDateStr: '',
                activityTheme: '', // 主题
                activityTarget: '', // 指标
                cover: '', // 封面
                playbillPage: '', // 详情海报
                resourceList: [],
                schoolIdList: [], // 学校数组
                title: ''// 标题
            },
            form1: {
                selectedOptions: ''
            },
            rules: {
                title: [{
                    required: true, message: '请输入活动标题', trigger: ['blur']
                }],
                cover: [{
                    required: true, message: '请选择活动封面', trigger: ['blur']
                }],
                playbillPage: [{
                    required: true, message: '请选择详情海报', trigger: ['blur']
                }],
                activityTheme: [{
                    required: true, message: '请输入活动主题', trigger: ['blur']
                }],
                activityTarget: [{
                    required: true, message: '请输入活动指标', trigger: ['blur']
                }],
                status: [
                    { required: true, message: '请选择开启状态', trigger: ['change', 'blur'] }
                ],
                activityTime: [{
                    required: true, message: '请选择活动开始和结束时间', trigger: ['blur', 'change']
                }],
                resourceList: [{
                    required: true, message: '请上传活动资源', trigger: ['blur', 'change']
                }],
            },
            pages: {
                pageNum: 1,
                pageSize: 10,
            }

        }
    },
    computed: {
        noMore() {
            return this.pages.pageNum >= this.totalNum
        },
        disabled() {
            return this.isLoading1 || this.noMore
        }
    },
    watch: {
       
    },
    mounted() {
          
    },
    created() {
        this.getDetailData()
    },
    methods: {
        checkIs(item) {
            let arr = this.schoolListed.filter(o => o.id == item.id),
                istrue = false
            if (arr.length == 0) istrue = true
            return istrue
        },
        // 获取详情
        getDetailData() {
            const id = this.id || this.$route.query.id
            if (id) {
                activityDetail({ id }).then(res => {
                    const { code, entity: datas } = res.data
                    if (code === 200 && datas) {
                        this.data = datas
                        this.form.title = datas.title
                        this.form.cover = [datas.cover]
                        this.cover = [{
                            name: '2.png',
                            size: 63600,
                            status: 'success',
                            uploadName: 'd77e555877554abab3394032b5922988-1566870608494__2.png',
                            url: datas.cover
                        }]
                        this.form.playbillPage = [datas.playbillPage]
                        this.playbillPage = [{
                            name: '2.png',
                            size: 63600,
                            status: 'success',
                            uploadName: 'd77e555877554abab3394032b5922988-1566870608494__2.png',
                            url: datas.playbillPage
                        }]
                        this.form.activityTarget = datas.activityTarget
                        this.form.id = id
                        this.form.endDateStr = datas.endDate.slice(0, 10)
                        this.form.startDateStr = datas.startDate.slice(0, 10)
                        this.form.activityTime = [new Date(this.form.startDateStr), new Date(this.form.endDateStr)]
                        this.form.status = datas.status || 1
                        this.form.activityTheme = datas.activityTheme
                        let arry = []
                        datas.resourceVoList.forEach(o => {
                            arry.push({
                                name: o.name,
                                size: 63600,
                                status: 'success',
                                uploadName: 'd77e555877554abab3394032b5922988-1566870608494__2.png',
                                url: o.resourceId
                            })
                        })
                   
                        this.form.resourceList = arry
                    }
                }).finally(() => {
                    
                })
            }
        },
        changeRegion(region) {
            this.searchForm.provinceId = region[0].code || ''
            this.searchForm.cityId = region[1].code || ''
            this.searchForm.areaId = region[2].code || ''
        },
        changeTime() {
            this.form.startDateStr = this.form.activityTime[0] || ''
            this.form.endDateStr = this.form.activityTime[1] || ''
        },
        load() {
            if (this.searchForm.provinceId) {
                this.isLoading1 = true
                setTimeout(() => {
                    this.getSchoolList()
                }, 2000)
            }
        },
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            this.$set(this.pages, 'pageSize', 10)
            this.resetList = []
            this.schoolList = []
            // this.schoolListed = [];
            // this.form.schoolIdList =[];
            this.getSchoolList()
        },
        async getSchoolList() {
            const formList = Object.assign({}, this.searchForm)
            if (!formList.provinceId) {
                this.$message({
                    message: '请选择地区',
                    type: 'error'
                })
                return false
            }
           
            const res = await schoolList(formList, this.pages)

            const { entity: datas = {} } = res.data

            try {
                datas.resultData.forEach((o, i) => {
                    // o.key = this.resetList.length;
                    this.resetList.push(o)
                    this.schoolList.push(o)
                })
                this.pages.pageNum++
                this.totalNum = datas.totalPageNum || 0
            } catch (error) {
                console.log(error)
            } finally {
                this.isLoading1 = false
            }
        },
        changeSchool(row, index, key) { // 选择取消学校
            let changeId = row.id
            // 添加
            if (key == 'add') {
                let idx = this.form.schoolIdList.indexOf(changeId)// 被选中
                if (idx == -1) {
                    let len = this.form.schoolIdList.length,
                        puId = ''
                    for (let i = 0; i < len; i++) {
                        let o = this.schoolListed[i]
                                  
                        if (parseInt(o.identityCode) > parseInt(row.identityCode)) { // 查找列表中下标比当前大的项
                            puId = i
                                    
                            break
                        }
                    }
                              
                    if (len > 0) {
                        if (puId === '') {
                            this.form.schoolIdList.push(changeId)
                            this.schoolListed.push(row)
                        } else {
                            this.form.schoolIdList.splice(puId, 0, changeId)
                            this.schoolListed.splice(puId, 0, row)
                        }
                    } else {
                        this.form.schoolIdList.push(changeId)
                        this.schoolListed.push(row)
                    }
                }
            } else if (key == 'del') { // 删除
                this.form.schoolIdList.splice(index, 1)
                this.schoolListed.splice(index, 1)
            }
        },
        allChose(key) {
            if (key == 'del') {
                this.form.schoolIdList = []
                this.schoolListed = []
            } else {
                const list = [...this.resetList]
        
                this.form.schoolIdList = list.map(o => o.id)
               
                this.schoolListed = list
            }
        },
        handleChange(value) {
            let cityArr = this.$refs.myCascader.getCheckedNodes()[0].pathLabels
     	},
        uploadCover({ file } = {}) {
            this.form.cover = this.cover.map((item, index) => item.url)
        },
        uploadCover1({ file } = {}) {
            this.form.playbillPage = this.playbillPage.map((item, index) => item.url)
        },
        
        submit() {
            let that = this
            this.$refs.form.validate((valid) => {
                if (valid) {
                    const formList = Object.assign({}, this.form)
                  
                    //   if(formList.schoolIdList.length==0){
                    //     this.$message({
                    //     message: '请选择学校',
                    //     type: 'error'
                    //     })
                    //     return false;
                    // }
                    const formData = {
                        id: formList.id,
                        startDateStr: formList.startDateStr, // 开始时间
                        endDateStr: formList.endDateStr,
                        activityTheme: formList.activityTheme, // 主题
                        activityTarget: formList.activityTarget, // 指标
                        cover: this.getFileUrl(formList.cover[0]), // 封面
                        playbillPage: this.getFileUrl(formList.playbillPage[0]), // 详情海报
                        resourceList: [],
                        status: formList.status,
                        schoolIdList: formList.schoolIdList, // 学校数组
                        title: formList.title// 标题
                    }
                 
                    formList.resourceList.forEach(o => {
                        formData.resourceList.push({
                            resourceId: o.url,
                            name: o.name
                        })
                    })
                    
                    this.isLoading = true
                    activityEdit(formData).then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                message: `修改成功`,
                                type: 'success',
                                onClose() {
                                    that.$router.go(-1)
                                }
                            })
                        } else {
                            this.isLoading = false
                            this.$message({
                                message: res.data.msg || `修改失败`,
                                type: 'error'
                            })
                        }
                    }).finally(() => {
                        
                    })
                } else {
                    return false
                }
            })
        },
        remove(file) {
            this.form.cover = this.cover.map((item, index) => item.url)
        },
        remove1(file) {
            this.form.playbillPage = this.playbillPage.map((item, index) => item.url)
        },
        cancel() {
            this.$router.go(-1)
        },
    }
}
</script>
<style lang="scss" scoped>
   .school-table-head{
       background: rgb(242, 242, 242);
       font-size: 14px;
       color:#333;
       text-align: center;
       line-height: 40px;

   }
   .center-box{
       text-align: center;
       padding:20px 0;
   }
   .school-infinite-box{
       max-height: 500px;
       overflow:auto;
   }
   .school-table-box{
        border-top:1px solid #EBEEF5;
        border-left:1px solid #EBEEF5;
         display: table;
         width: 100%;
         box-sizing: border-box;
       
        .school-table-tr{
           
           display: table-row;
            
            &.school-table-tr-head{
                background-color:#eef1f6;
              
                font-size: 14px;
                color:#666;
               
            }
            .school-table-td{
                display: table-cell;
                text-align: center;
                line-height: 23px;
                width: 25%;
                font-size: 14px;
                padding: 8px 0;
                border-bottom:1px solid #EBEEF5;
                border-right:1px solid #EBEEF5;
                color:#333;
                box-sizing: border-box;
               vertical-align: middle;
                .school-table-cell{
                   padding: 0 10px;
                   word-break: break-all;
                }
            }
        }
      
   }
   .school-show-title{
        p{
            text-align:center;
            line-height: 30px;
            font-size: 14px;
        }
   }
   .school-table-footer{
            box-sizing: border-box;
            line-height: 60px;
            text-align: center;
            font-size: 14px;
            border-left:1px solid #EBEEF5;
            border-bottom:1px solid #EBEEF5;
            border-right:1px solid #EBEEF5;
            color: #909399;
    }
</style>
