import Vue from 'vue'
import VoerroTagsInput from '@voerro/vue-tagsinput'
Vue.component('tags-input', VoerroTagsInput)

document.addEventListener('click', (event) => {
	let target = event.target
	if (target.classList.contains('tags-input')) {
		let input = event.target.querySelector('input')
		if (input) { input.focus() }
	}
})