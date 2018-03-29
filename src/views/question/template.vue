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
				<p>
					<h6>例如：</h6>
					<p>模版内容：
						<el-button size="mini" type="info" plain style="padding:5px 6px;margin:5px 3px 0 3px;">&lt;i&gt;【{60}】&lt;/i&gt;与&lt;i&gt;【{61}】&lt;/i&gt;于&lt;i&gt;【{62}】&lt;/i&gt;相识，&lt;i&gt;【{63}】&lt;/i&gt;后领取结婚证，婚后有&lt;i&gt;【{64}】&lt;/i&gt;，婚后&lt;i&gt;【{65}】&lt;/i&gt;，婚后感情&lt;i&gt;【{66}】&lt;/i&gt;感情发生改变，后因诸多问题发生变化。&lt;i&gt;【{67}】&lt;/i&gt;争吵，&lt;i&gt;【{68}】&lt;/i&gt;。&lt;i&gt;【69】&lt;/i&gt;家庭暴力。婚姻存续期间，发现第三者。</el-button>
					</p>
					<p><span>显示结果：</span><img :src="demoImg.src" alt="" style="vertical-align:top;"></p>
				</p>
		  	</div>	
		</el-card>
	</div>
</template>

<script>
    import {getReportTemplate,editReportTemplate} from '@/api/question'
    import pic from '@/assets/report_template/template-demo.jpg'
	export default{
		data(){
			return {
				template:{
					content:''
				},
				demoImg:{
					src:pic,
				}
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