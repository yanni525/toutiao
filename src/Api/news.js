import request  from '@/utils/request'


// @param { * } channelId 频道的id
// @param { * } timestamp 请求第一页数据穿当前的时间戳
// @returns Promise


export const getArticlrApi = (channelId,timestamp) => {
    return request({
    url: '/v1_0/articles',
    method: 'get',
        params: {
            channel_id :channelId,
            timestamp 
        }
    })
}