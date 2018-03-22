import request from "@/utils/request"

export function uploadImage(data){
    return request({
        url:"/admin/upload",
        method:"POST",
        data
    })
}