import request from '@/utils/request'

export function getCaseFactorList(){
    return request({
        url:"/admin/keyword/getFactorList",
        method:"GET"
    })
}


// export function getFactorKeywords(factor_id){
//     return request({
//         url:"/admin/keyword/getKeywordList/"+factor_id,
//         method:"GET"
//     })
// }

export function getFactorKeywords(){
    return request({
        url:"/admin/keyword",
        method:"GET"
    })
}

export function addFactorKeywords(data){
	return request({
		url:"/admin/case/keyword",
		method:"POST",
		data
	})
}

export function editFactorKeywords(keyword_id,data){
	return request({
		url:"/admin/keyword/"+keyword_id,
		method:"PUT",
		data
	})
}

export function delFactorKeywords(keyword_id){
	return request({
		url:"/admin/keyword/"+keyword_id,
		method:"DELETE"
	})

}