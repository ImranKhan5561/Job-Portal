import axiosInstance from "../Interceptor/AxiosInterceptor";

const getNotifications=async(id:any)=>{
return axiosInstance.get(`/notification/get/${id}`)
.then(result=>result.data)
.catch(error=>{throw error;});
}

const readNotification=async(id:any)=>{
    return axiosInstance.put(`/notification/read/${id}`)
    .then(result=>result.data)
    .catch(error=>{throw error;});
}

export {getNotifications,readNotification}