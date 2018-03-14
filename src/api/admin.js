import request from '@/utils/request'

export function getAdminUserList(params){
    return request({
        url:"user",
        method:"GET",
        params
    })
}

export function getAdminUserInfo(user_id){
    return request({
        url:"user/"+user_id,
        method:"GET"
    })
}


export function addAdminUser(data){
    return request({
        url:"user",
        method:"POST",
        data
    })
}

export function editAdminUser(user_id,data){
    return request({
        url:"user/"+user_id,
        method:"PUT",
        data
    })
}

export function delAdminUser(user_id){
    return request({
        url:"user/"+user_id,
        method:"DELETE"
    })
}