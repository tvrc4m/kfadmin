import request from "@/utils/request"

export function getExpertList(params){
    return request({
        url:"expert",
        method:'GET',
        params
    })
}

export function getExpertInfo(expert_id){
    return request({
        url:'expert/'+expert_id,
        method:"GET"
    })
}

export function addExpert(data){
    return request({
        url:'expert',
        method:'POST',
        data
    })
}

export function editExpert(expert_id,data){
    return request({
        url:'expert/'+expert_id,
        method:'PUT',
        data
    })
}

export function delExpert(expert_id){
    return request({
        url:'expert/'+expert_id,
        method:"DELETE"
    })
}
