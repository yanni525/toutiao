import request  from  "@/utils/request"
import store from "@/store"
export const GetMyChannel = () => {
    return request({
        url: "/v1_0/channels",
        headers: {
            //Bearer后面有空格
            Authorization: "Bearer " + store.state.tokenobj.token

        }


    })
}