import request from '@/utils/request'

export function getCaseList(params){
    return request({
        url:"/case",
        method:"GET",
        params
    })
}

export function getCaseCat(){
    return request({
        url:"/case/cate",
        method:"GET"
    })
}

export function getCaseInfo(case_id){
    return request({
        url:"/case/"+case_id,
        method:"GET"
    })
}

export function addCase(data){
    return request({
        url:"/case",
        method:"POST",
        data
    })
}

export function editCase(case_id,data){
    return request({
        url:"/case/"+case_id,
        method:"PUT",
        data
    })
}

export function delCase(case_id){
    return request({
        url:"/case/"+case_id,
        method:"DELETE"
    })
}

export function getCaseFactors(){
    return request({
        url:"/case/factor",
        method:"GET"
    })
}

export function getCaseKeywords(case_id){
    return request({
        url:"/case/keyword",
        method:"GET",
        params:{case_id}
    })
}

export function addCaseFactor(data){
    return request({
        url:"/case/factor",
        method:"POST",
        data
    })
}

export function editCaseFactor(case_factor_id,data){
    return request({
        url:"/case/factor/"+case_factor_id,
        method:"PUT",
        data
    })
}

export function addKeyword(data){
    return request({
        url:"/case/keyword",
        method:"POST",
        data
    })
}

export function searchKeyword(data){
    return request({
        url:"/case/searchKeyword/",
        method:"POST",
        data
    })
}

export function getFactorKeyword(case_factor_id){
    return request({
        url:"/admin/case/factor/keywords",
        method:"GET",
        params:{case_factor_id:case_factor_id}
    })
}

export function updateFactorKeywords(data){
    return request({
        url:"/admin/case/keyword",
        method:"PUT",
        data
    })
}