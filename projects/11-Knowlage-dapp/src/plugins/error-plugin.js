import swal from 'sweetalert2'

export default {
  install(Vue) {
    Vue.prototype.$toast = (msg, icon) => {
      swal.fire({
        toast: true,
        icon: icon || 'error',
        text: msg || 'Something Wrong ...',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
    }

    Vue.config.errorHandler = (err) => {
      const msg = typeof err.message == 'string' ? err.message : undefined
      Vue.prototype.$toast(msg)
      console.log('Vue Error Handler', msg)
    }

    window.addEventListener('unhandledrejection', (err) => {
      let msg = undefined
      if (typeof err.reason == 'string') msg = err.reason
      if (typeof err.reason == 'object') msg = err.reason.message

      Vue.prototype.$toast(msg)
      console.log('Window Event Listener', msg)
    })
  }
}