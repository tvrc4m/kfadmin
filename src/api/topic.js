import request from '@/utils/request'

export function getTopicList(data){
	return request({
		url:'topic',
		method:'POST',
		data
	})
}