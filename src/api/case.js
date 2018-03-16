import request from '@/utils/request'

export function getCaseList(params){
    return request({
        url:"/admin/case",
        method:"GET",
        params
    })
}

export function getCaseCat(){
    return request({
        url:"/admin/case/cate",
        method:"GET"
    })
}

export function getCaseInfo(case_id){
    return request({
        url:"/admin/case/"+case_id,
        method:"GET"
    })
}

export function addCase(data){
    return request({
        url:"/admin/case",
        method:"POST",
        data
    })
}

export function editCase(case_id,data){
    return request({
        url:"/admin/case/"+case_id,
        method:"PUT",
        data
    })
}

export function delCase(case_id){
    return request({
        url:"/admin/case/"+case_id,
        method:"DELETE"
    })
}

export function getCaseFactors(){
    return request({
        url:"/admin/case/factor",
        method:"GET"
    })
}

export function getCaseKeywords(case_id){
    return request({
        url:"/admin/case/keyword",
        method:"GET",
        params:{case_id}
    })
}

export function addCaseFactor(data){
    return request({
        url:"/admin/case/factor",
        method:"POST",
        data
    })
}

export function editCaseFactor(case_factor_id,data){
    return request({
        url:"/admin/case/factor/"+case_factor_id,
        method:"PUT",
        data
    })
}

export function searchKeyword(name){
    return request({
        url:"/admin/case/searchKeyword/",
        method:"POST",
        data:{name}
    })
}