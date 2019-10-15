<template>
    <el-table ref="table" :data="datas" stripe align="center" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="45" />
        <el-table-column prop="name" label="应用名称" sortable />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" align="center" :width="operateWidth">
            <template slot-scope="scope">
                <slot name="operate" :data="scope.row" :index="scope.$index"></slot>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props: {
        datas: {
            type: Array,
            default() {
                return []
            }
        },
        checked: {
            type: Array,
            default() {
                return []
            }
        },
        operateWidth: {
            type: Number
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.$emit('update:checked', val)
        }
    }
}
</script>
