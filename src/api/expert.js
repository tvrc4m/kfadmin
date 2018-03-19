import request from "@/utils/request"

export function getExpertList(params){
    return request({
        url:"/admin/expert",
        method:'GET',
        params
    })
}

export function getExpertInfo(expert_id){
    return request({
        url:'/admin/expert/'+expert_id,
        method:"GET"
    })
}

export function addExpert(data){
    return request({
        url:'/admin/expert',
        method:'POST',
        data
    })
}

export function editExpert(expert_id,data){
    return request({
        url:'/admin/expert/'+expert_id,
        method:'PUT',
        data
    })
}

export function delExpert(expert_id){
    return request({
        url:'/admin/expert/'+expert_id,
        method:"DELETE"
    })
}

export function getExpertJob(){
    return request({
        url:"/admin/expert/job",
    })
}

export function getExpertGoodAt(){
    return request({
        url:"/admin/expert/goodAt",
    })
}

export function getExpertServices(){
    return request({
        url:"/admin/expert/service",
    })
}

export function getExpertCertification(){
    return request({
        url:"/admin/expert/certification",
    })
}