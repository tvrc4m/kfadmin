import request from '@/utils/request'

export function getCaseList(params){
    return request({
        url:"case",
        method:"GET",
        params
    })
}

export function getCaseCat(){
    return request({
        url:"case/cate",
        method:"GET"
    })
}

export function getCaseInfo(case_id){
    return request({
        url:"case/"+case_id,
        method:"GET"
    })
}

export function addCase(data){
    return request({
        url:"case",
        method:"POST",
        data
    })
}

export function editCase(case_id,data){
    return request({
        url:"case/"+case_id,
        method:"PUT",
        data
    })
}

export function delCase(case_id){
    return request({
        url:"case/"+case_id,
        method:"DELETE"
    })
}