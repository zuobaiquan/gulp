import Vue from 'vue'
import App from './App'
import router from './router'

import './less/common.less'
import './iconfont.css'

Vue.config.productionTip = false

new Vue({
	el:'#app',
	router,
	template:'<App></App>',
	components:{App}
})

