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