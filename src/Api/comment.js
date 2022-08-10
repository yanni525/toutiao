import request  from '@/utils/request'
import { method } from 'lodash'

export const getComment = (params) => {
    return request({
        url: '/v1_0/comments',
        params    
    })
}
//收藏
export const getCollect = (id) => {
    return request({
        url: '/v1_0/article/collections',
        method:'POST',
        data: {
            target:id
        }
    })

}
//取消收藏
export const getOffCollet = (target) => { 
    return request({
        url: `/v1_0/article/collections/${target}`,
        method:'DELETE',

    })
}
//关注
export const getFollow = (id) => {
    return request({
        url: '/v1_0/user/followings',
        method:'POST',
        data: {
            target:id
        }
    })
}

//取消关注
export const getOffFollow = (target) => { 
    return request({
        url: `/v1_0/user/followings/${target}`,
        method:'DELETE',

    })
}
//点赞
export const getLink = (id) => {
    return request({
        url:'/v1_0/article/likings',
        method:'POST',
        data: {
            target: id,
        }
    })
}

//取消点赞
export const getOnLink = (target) => { 
    return request({
        url: `/v1_0/article/likings/${target}`,
        method:'DELETE'
    })
}
//对评论点赞
export const getCommentLick = (id) => {
    return request({
        url:'/v1_0/comment/likings',
        method:'POST',
        data:{
            target: id,
        }
    })
}

//取消对评论点赞
export const getCommentOnLink = (target) => { 
    return request({
        url: `/v1_0/comment/likings/${target}`,
        method:'DELETE'
    })
}
//发表评论
export const getSendComment = (data) => {
    return request({
        url:'/v1_0/comments',
        method:'POST',
        data,
    })
}