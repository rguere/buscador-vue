import Vue from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout'
import BasicLayout from '@/layouts/BasicLayout'

[
	DefaultLayout,
	BasicLayout,
].forEach(Component => {
  Vue.component(Component.name, Component)
})