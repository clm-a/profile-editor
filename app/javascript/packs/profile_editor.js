/* eslint no-console: 0 */


import Turbolinks from 'turbolinks'
import Rails from 'rails-ujs'
Rails.start()
Turbolinks.start()
import TurbolinksAdapter from 'vue-turbolinks';
import Vue from 'vue/dist/vue.esm'
import ProfileEditor from '../profile_editor/ProfileEditor.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(TurbolinksAdapter)



document.addEventListener('turbolinks:load', () => {
  let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
  Vue.axios.defaults.headers.common['X-CSRF-Token'] = token
  Vue.axios.defaults.headers.common['Accept'] = 'application/json'
  var element = document.getElementById("profile_editor")
  if (element != null) {
    const app = new Vue({
      el: '#profile_editor',
      components: { ProfileEditor }
    })
  }
})
