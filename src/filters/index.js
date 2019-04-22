import Vue from 'vue'
//import moment from 'moment'
import format from 'date-fns/format'
Vue.filter("date-format",(value,formatStr="YY-MM-DD HH:mm:ss")=>{
	//return moment(value).format(formatStr);
	return format(value, formatStr)
})