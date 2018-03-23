import request from "@/utils/request"

export  var upload_url=process.env.BASE_API+"/admin/upload"

export function uploadImage(data){
    return request({
        url:"/admin/upload",
        method:"POST",
        data
    })
}