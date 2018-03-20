import request from '@/utils/request'

export function getTopicList(params){
	return request({
		url:'/admin/topic',
		method:'GET',
		params
	})
}

export function hiddenTopic(topic_id,hidden=true){
    return request({
        url:"/admin/topic/hide",
        method:"POST",
        data:{topic_id,hide_stat:hidden}
    })
}

export function topTopic(topic_id,top=true){
    return request({
        url:"/admin/topic/top",
        method:"POST",
        data:{topic_id,top_stat:top}
    })
}