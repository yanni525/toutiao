import request  from '@/utils/request'


// @param { * } channelId 频道的id
// @param { * } timestamp 请求第一页数据穿当前的时间戳
// @returns Promise
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh'
/**
 * .....多久之前
 * @param {*} 之前的时间
 * @returns 系统时间到之前指定时间的距离值
 */

export const timeAgo = (targetTime) => {
 // 格式化时间
 dayjs.extend(relativeTime)
 dayjs.locale('zh')
 const a = dayjs()
 const b = dayjs(targetTime)
 return a.to(b) // 返回多久之前...
}

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

export const geiDetails = (article_id) => {
    return request({
        url: `/v1_0/articles/${article_id}`, 
    })

}