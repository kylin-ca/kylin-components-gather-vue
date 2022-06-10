import download from './download'

export default {
    install(Vue) {
        Vue.prototype.$download = download
    }
}