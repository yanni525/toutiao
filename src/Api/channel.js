import request  from  "@/utils/request"
import store from "@/store"
//引入
import storage from "@/utils/storage"
export const GetMyChannel = () => {
    return request({
        url: "/v1_0/user/channels",
        headers: {
            //Bearer后面有空格
            Authorization: "Bearer " + store.state.tokenobj.token

        }


    })
}
//获取所有频道
export const getAllChannels = () =>
    request({ 
        url: "/v1_0/channels",
    })
//删除推荐
export const delChannels = (target) => {
    return request({
        url:`/v1_0/user/channels/${target}`,
        method: "DELETE",
    })
}    
//添加频道
export const addChannel = (id,seq) => {
    return request({
        url: "/v1_0/user/channels",
        method:'PATCH',
        data: {
            channels:[{id,seq}]
        }
    })

}

//本地存储和设置
const HEIMA_TOUTIAO_MY_CHANNELS = 'HEIMA_TOUTIAO_MY_CHANNELS'

export const setMyChannelsToLocal = (myChannels) => {
    storage.set(HEIMA_TOUTIAO_MY_CHANNELS,myChannels)
    
} 
export const getMyChannelsByLocal = () => {
     return storage.set(HEIMA_TOUTIAO_MY_CHANNELS)
    
} 