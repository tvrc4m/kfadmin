<template>
    <div class="keyword-container">
        <el-collapse v-model="activid" :accordion="false" style="width: 100%">
            <el-collapse-item v-for="(factor,factorindex) in tableData" :title="factor.name" :name="factor.id">

                <div class="tag" v-for="(tag,tagindex) in factor.keywords" style="display:inline-block; margin-right:10px;margin-bottom:5px;">
                    <el-input type="text" class="input-new-tag" v-show="tag.inputVisible" v-model="tag.inputValue" ref="editTagInput" size="small"  @keyup.enter.native="handleEditInputConfirm(tag,tagindex,factorindex)" @blur="handleEditInputConfirm(tag,tagindex,factorindex)"></el-input>
                    <el-tag v-show="!tag.inputVisible" :key="tag.id"  closable :disable-transitions="false" @close="handleClose(tag,tagindex,factorindex)">{{tag.name}}
                        <i class="el-tag__edit el-icon-edit" @click="showEditInput(tag,tagindex)"></i>
                    </el-tag>
                </div>
                <el-input type="text" class="input-new-tag" v-show="factor.inputVisible" v-model="factor.inputValue" ref="saveTagInput" size="small"  @keyup.enter.native="handleInputConfirm(factor,factorindex)" @blur="handleInputConfirm(factor,factorindex)"></el-input>
                <el-button v-show="!factor.inputVisible" class="button-new-tag" size="small" @click="showInput(factor,factorindex)">+ New Tag</el-button>
            </el-collapse-item>
        </el-collapse>

    </div>
</template>

<script>
    import {getFactorKeywords,addFactorKeywords,editFactorKeywords,delFactorKeywords} from "@/api/keyword"
    export default{
        data(){
            return {
                tableData:[],
                activid:[]
            }
        },
        mounted(){
            getFactorKeywords().then(data=>{
                console.log('keyword',data);
                this.tableData=data;
                data.forEach(item=>{
                    this.activid.push(item.id)
                    item.inputVisible=false
                    item.inputValue=''
                    item.keywords.forEach(i=>{
                        i.inputVisible=false
                        i.inputValue=''
                    })
                })
            })
        },
        methods: {
            handleClose(tag,tagindex,factorindex) {
                delFactorKeywords(tag.id).then(data=>{
                    this.$message({
                        message:"删除成功",
                        type:"success"
                    })
                    this.tableData[factorindex].keywords.splice(tagindex,1);
                })
            },
            showInput(factor,factorindex) {
                factor.inputVisible = true;
                this.$forceUpdate()
                this.$nextTick(_ => {
                    // console.log(this.$refs)
                    this.$refs['saveTagInput'][factorindex].focus()
                });
            },
            handleInputConfirm(factor,factorindex) {
                let inputValue = factor.inputValue;
                if (inputValue) {
                    addFactorKeywords({case_factor_id:factor.id,name:inputValue}).then(data=>{
                        this.$message({
                            message:"添加成功",
                            type:"success"
                        })
                        this.tableData[factorindex].keywords.push({name:inputValue});
                    })
                }
                factor.inputVisible = false;
                factor.inputValue = '';
            },
            showEditInput(tag,tagindex){
                tag.inputVisible = true;
                this.$forceUpdate()
                this.$nextTick(_ => {
                    this.$refs['editTagInput'][tagindex].focus()
                });
            },
            handleEditInputConfirm(tag,tagindex,factorindex) {
                let inputValue2 = tag.inputValue;
                if (inputValue2) {
                    editFactorKeywords(tag.id,{name:inputValue2}).then(data=>{
                        this.$message({
                            message:"修改成功",
                            type:"success"
                        })
                        this.tableData[factorindex].keywords[tagindex].name=inputValue2
                    })
                }
                tag.inputVisible = false;
                tag.inputValue = '';
            },
        }
    }
</script>
<style lang="scss" type="text/css">

    .el-tag + .el-tag {
        margin-left: 10px;
        margin-bottom: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    .el-tag__edit{
        /*color:#909399*/
    }
    .el-icon-edit:hover{
        background-color:#409EFF;
        color:#fff;
        border-radius: 50%;
    }
</style>