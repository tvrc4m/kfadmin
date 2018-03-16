import request from '@/utils/request'

export function getCaseFactorList(){
    return request({
        url:"keyword/getFactorList",
        method:"GET"
    })
}


export function getFactorKeywords(factor_id){
    return request({
        url:"keyword/getKeywordList/"+factor_id,
        method:"GET"
    })
}