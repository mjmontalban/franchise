import Vue from 'vue'

// axios
import axios from 'axios'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export const getToken = () => JSON.parse(localStorage.getItem('userdata'))?.token

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  // baseURL: 'https://some-domain.com/api/',
  // timeout: 1000,
  headers: { Authorization: `Bearer ${getToken()}` },
})

axiosIns.interceptors.request.use(config => config,
  error => console.log(error))
// Add a response interceptor
axiosIns.interceptors.response.use(response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('userdata')
      location.reload()
    }
    const message = error.response.data.message || error.message
    Vue.$toast({
      component: ToastificationContent,
      props: {
        title: message,
        icon: 'XCircleIcon',
        variant: 'danger',
      },
    })
    return error
  },
  // Do something with response error
)

Vue.prototype.$http = axiosIns

export default axiosIns
