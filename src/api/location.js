import request from '@/utils/request'

export function getLocation(){
    return request({
        url:"/common/area"
    })
}