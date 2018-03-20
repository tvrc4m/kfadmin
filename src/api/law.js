import request from "@/utils/request"

export function getLawList(params){
    return request({
        url:"/admin/law",
        method:'get',
        params
    })
}
/**
 * 获取法律信息
 * @param  {int} id 法律id
 * @return
 */
export function getLawInfo(id){
    return request({
        url:'/admin/law/detail/'+id,
        method:'get'
    })
}

export function addLaw(data){
    return request({
        url:"/admin/law",
        method:'POST',
        data
    })
}

export function editLaw(law_id,data){
    return request({
        url:"/admin/law/"+law_id,
        method:"PUT",
        data
    })
}

export function delLaw(law_id){
    return request({
        url:"/admin/law/"+law_id,
        method:"DELETE"
    })
}

export function getLawRuleList(law_id,page=1){
    return request({
        url:"/admin/law/rule",
        method:"GET",
        params:{law_id:law_id,page:page},
    })
}

export function getLawRuleInfo(law_rule_id){
    return request({
        url:"/admin/law/rule/detail/"+law_rule_id,
        method:"GET"
    })
}

export function addLawRule(data){
    return request({
        url:"law/rule/",
        method:"POST",
        data
    })
}

export function editLawRule(law_rule_id,data){
    return request({
        url:"law/rule/"+law_rule_id,
        method:"PUT",
        data
    })
}

export function delLawRule(law_rule_id){
    return request({
        url:"law/rule/"+law_rule_id,
        method:"DELETE"
    })
}

