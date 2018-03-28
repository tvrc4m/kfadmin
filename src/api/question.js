import request from "@/utils/request"

export function getQuestionCollectionList(type,page){
	return request({
		url:"/admin/question/collection",
		method:"get",
        params:{type:type,page:page}
	})
}

export function getQuestionCollection(id){
	return request({
		url:"/admin/question/collection/"+id,
		method:"get"
	})
}
export function addQuestionCollection(data){
	return request({
		url:"/admin/question/collection",
		method:"post",
		data
	})
}

export function editQuestionCollection(question_collection_id,data){
	return request({
		url:"/admin/question/collection/"+question_collection_id,
		method:"put",
		data
	})
}

export function delQuestionCollection(question_collection_id){
	return request({
		url:"/admin/question/collection/"+question_collection_id,
		method:"delete"
	})
}

export function getQuestionList(question_collection_id){
	return request({
		url:"/admin/question/",
		method:"get",
    	params: { question_collection_id:question_collection_id }
	})
}

export function getQuestion(question_id){
	return request({
		url:"/admin/question/"+question_id,
		method:"get",
	})
}

export function addQuestion(data){
	return request({
		url:"/admin/question/",
		method:"post",
		data
	})
}

export function editQuestion(question_collection_id,data){
	return request({
		url:"/admin/question/"+question_collection_id,
		method:"put",
		data
	})
}

export function delQuestion(question_id){
	return request({
		url:"/admin/question/"+question_id,
		method:"delete",
	})
}


export function getAdviseList(question_collection_id){
	return request({
		url:"/admin/question/suggest/",
		method:"get",
		params:{question_collection_id:question_collection_id}
	})
}

export function getAdvise(advise_id){
	return request({
		url:"/admin/question/suggest/"+advise_id,
		method:"get",
	})
}

export function addAdvise(data){
	return request({
		url:"/admin/question/suggest",
		method:"post",
		data
	})
}

export function editAdvise(advise_id,data){
	return request({
		url:"/admin/question/suggest/"+advise_id,
		method:"put",
		data
	})
}

export function delAdvise(advise_id){
	return request({
		url:"/admin/question/suggest/"+advise_id,
		method:"delete"
	})
}

export function getAdviseRule(question_collection_id){
	return request({
		url:"/admin/question/suggest/rule/detail/",
		method:"get",
		params:{question_collection_id:question_collection_id}

	})
}
// 查看所有的问题集
export function getAllQuestion(params){
	return request({
		url:"/admin/question/allcollection",
		method:"GET",
		params
	})
}
// 获取某个问题下面的所有问题以及选项
export function getCollectionQuestionsAndOptions(question_collection_id){
	return request({
		url:"/admin/question/allquestion",
		method:"GET",
		params:{question_collection_id}
	})
}

// 新增情感建议匹配关系
export function addQuestionSuggestRelation(data){
	return request({
		url:"/admin/question/suggest/rule",
		method:"POST",
		data
	})
}

// 查看情感建议匹配关系列表
export function getQuestionSuggestRelations(params){
	return request({
		url:"/admin/question/suggest/rule",
		method:"GET",
		params
	})
}

// 查看情感建议匹配关系详情
export function getQuestionSuggestRelation(devise_relation_id){
	return request({
		url:"/admin/question/suggest/rule/"+devise_relation_id,
		method:"GET"
	})
}
// 更新情感建议匹配关系
export function editQuestionSuggestRelation(devise_relation_id,data){
	return request({
		url:"/admin/question/suggest/rule/"+devise_relation_id,
		method:"PUT",
		data
	})
}

// 删除情感建议匹配关系
export function delQuestionSuggestRelation(devise_relation_id){
	return request({
		url:"/admin/question/suggest/rule/"+devise_relation_id,
		method:"DELETE",
	})
}

//查看报告书模版
export function getReportTemplate(){
	return request({
		url:"/admin/template",
		method:"GET"
	})
}

// 更新报告书模版
export function editReportTemplate(data){
	return request({
		url:"/admin/template",
		method:"PUT",
		data
	})
}
// 问题排序
export function sortQuestion(data){
	return request({
		url:"/admin/question/sort",
		method:"POST",
		data
	})
}