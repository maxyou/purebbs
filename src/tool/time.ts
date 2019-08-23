import moment from 'moment';

export default {

    fromNow(t:any) {
        // moment.locale('zh-cn');
        return moment(t).fromNow()
        // return moment(t).format("dddd, MMMM Do YYYY, h:mm:ss a")
        // return d.toLocaleDateString()+(d.toLocaleTimeString().substring(0,6))
    },

    async delay(ms:number) {
        await (ms => new Promise(res => setTimeout(res, ms)))(ms)
    }

}