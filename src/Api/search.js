import request  from '@/utils/request'

export const getSearchSuggetionsApi = (q) => {
    return request({
        url: '/v1_0/suggestion',
        params: {
            q
        }
    })

}
