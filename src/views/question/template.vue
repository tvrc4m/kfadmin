<template>
	<div class="report-template-container">
		<el-card class="box-card">
		    <div slot="header" class="clearfix">
		    	<span>模版内容</span>
		    	<el-button style="float: right; padding: 5px 10px" @click="editClick" type="primary" plain>保存</el-button>
		  	</div>
		  	<div>
		    	<el-input type="textarea" auto-size class="content" autosize v-model="template.content" placeholder="模版内容" :value="template.content"></el-input>
		  	</div>
		  	<div style="padding: 20px 0;border-bottom: 1px solid #ebeef5;margin-top:20px;">
		  		<span>模版说明</span>
		  	</div>
		  	<div>
		  		<p>1.&nbsp;<el-button size="mini" type="info" plain style="padding:5px 6px;margin:0 3px;">&lt;i&gt;&lt;/i&gt;</el-button><i></i>标签包含的内容为带颜色的内容</p>
				<p>2.&nbsp;<el-button size="mini" type="info" plain style="padding:5px 6px;">{2}</el-button>标签代表会被程序替换的内容。里面的数字代表问题的ID号，标签最终会被替换的内容为用户对该问题的回答</p>
		  	</div>	
		</el-card>
	</div>
</template>

<script>
    import {getReportTemplate,editReportTemplate} from '@/api/question'
	export default{
		data(){
			return {
				template:{
					content:''
				},
			}
		},
        methods:{
            editClick(){
				editReportTemplate(this.template).then(data=>{
					this.$message({
	                  	message: "编辑成功",
	                  	type: 'success',
	                  	duration: 5 * 1000
	                })
	                this.$router.back(-1)
				})
            },
		},
		mounted(){
			getReportTemplate().then(data=>{
				this.template.content=data.content
				console.log('template',data);
			})
		}
	}
</script>

<style scoped>
	p{
	    font: 400 14px system-ui;
	}
</style>