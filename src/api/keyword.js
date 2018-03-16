import request from '@/utils/request'

export function getCaseFactorList(){
    return request({
        url:"/admin/keyword/getFactorList",
        method:"GET"
    })
}


export function getFactorKeywords(factor_id){
    return request({
        url:"/admin/keyword/getKeywordList/"+factor_id,
        method:"GET"
    })
}