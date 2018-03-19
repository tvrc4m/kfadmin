import request from "@/utils/request"

export function getQuestionCollectionList(type,page){
	return request({
		url:"question/collection",
		method:"get",
        params:{type:type,page:page}
	})
}

export function getQuestionCollection(id){
	return request({
		url:"question/collection/"+id,
		method:"get"
	})
}
export function addQuestionCollection(data){
	console.log(data)
	return request({
		url:"question/collection",
		method:"post",
		data
	})
}

export function editQuestionCollection(question_collection_id,data){
	return request({
		url:"question/collection"+question_collection_id,
		method:"put",
		data
	})
}

export function getQuestionList(question_collection_id){
	return request({
		url:"question/"+question_collection_id,
		method:"get"
	})
}

export function addQuestion(data){
	return request({
		url:"question/",
		method:"post",
		data
	})
}

export function editQuestion(data){
	return request({
		url:"question/",
		method:"put",
		data
	})
}