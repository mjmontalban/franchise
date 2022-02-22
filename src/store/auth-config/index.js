export default {
  state: {
    isAuthenticated: !!localStorage.getItem('userdata'),
    userdata: localStorage.getItem('userdata') ? JSON.parse(localStorage.getItem('userdata')) : [],
  },
  getters: {

  },
  mutations: {
    setStateValue: state => {
      state.isAuthenticated = !localStorage.getItem('userdata'),
      state.userdata = localStorage.getItem('userdata') ? JSON.parse(localStorage.getItem('userdata')) : []
    },
  },
  actions: {

  },
}
