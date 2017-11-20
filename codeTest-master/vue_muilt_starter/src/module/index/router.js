// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
	routes:[{
		path: '/',
		component: function(resolve) {
			require(['../../components/demo1.vue'], resolve)
		}
	}, {
		path: '/demo1',
		component: function(resolve) {
			require(['../../components/demo1.vue'], resolve)
		}
	}, {
		path: '/demo2',
		component: function(resolve) {
			require(['../../components/demo2.vue'], resolve)
		}
	}, {
		path: '/city',
		component: function(resolve) {
			require(['../../components/city.vue'], resolve)
		}
	}, {
		path: '/around',
		component: function(resolve) {
			require(['../../components/around.vue'], resolve)
		}
	}]
})
