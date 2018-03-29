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

export function getExpertServices(params){
    return request({
        url:"/admin/expert/service",
        method:"GET",
        params
    })
}

export function getExpertCertification(){
    return request({
        url:"/admin/expert/certification",
    })
}
// 获取后台服务列表
export function getAdminServices(params){
    return request({
        url:"/admin/service/",
        method:"GET",
        params
    })
}
// 添加服务
export function addService(data){
    return request({
        url:"/admin/service/",
        method:"POST",
        data
    })
}
// 修改服务
export function editService(service_id,data){
    return request({
        url:"/admin/service/"+service_id,
        method:"PUT",
        data
    })
}

// 修改服务
export function delService(service_id){
    return request({
        url:"/admin/service/"+service_id,
        method:"DELETE",
    })
}