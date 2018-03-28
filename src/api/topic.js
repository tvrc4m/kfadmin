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
        data:{topic_id,hide_stat:hidden?2:1}
    })
}

export function topTopic(topic_id,top=true){
    return request({
        url:"/admin/topic/top",
        method:"POST",
        data:{topic_id,top_stat:top?1:0}
    })
}

export function searchTopic(content){
    return request({
        url:"/admin/topic/search",
        method:"GET",
        params:{content}
    })
}
// 获取用户提问的专家评论列表
export function getCommentList(params){
    return request({
        url:'/admin/comment',
        method:'GET',
        params
    })
}

export function topComment(comment_id,top=true){
    return request({
        url:"/admin/comment/top",
        method:"POST",
        data:{comment_id,top_stat:top?1:0}
    })
}

export function hiddenComment(comment_id,hidden=true){
    return request({
        url:"/admin/comment/hide",
        method:"POST",
        data:{comment_id,hide_stat:hidden?2:1}
    })
}