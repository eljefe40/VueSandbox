import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    messages: [

    ],
    snackbar: {
      show: false,
      text: ''
    },
    sorting: false
  },
  mutations: {
    setSearch(state, value) {
      state.search = value
    },

    addTask(state, newTask) {
      state.messages.push(newTask)
    },
    doneTask(state, id) {
      let message = state.messages.filter(message => message.id === id)[0]
      message.done = !message.done
    },
    deleteTask(state, id) {
      state.messages = state.messages.filter(message => message.id !== id)
    },
    updateTaskTitle(state, payload) {
      let message = state.messages.filter(message => message.id === payload.id)[0]
      message.title = payload.title
    },
    updateTaskDueDate(state, payload) {
      let message = state.messages.filter(message => message.id === payload.id)[0]
      message.dueDate = payload.dueDate
    },
    setTasks(state, messages) {
      state.messages = messages
    },

    showSnackbar(state, text) {
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
      }, timeout)
    },
    hideSnackbar(state) {
      state.snackbar.show = false
    },

    toggleSorting(state) {
      state.sorting = !state.sorting
    }
  },
  actions: {
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      }
      db.collection('messages').add(newTask).then(() => {
        commit('addTask', newTask)
        commit('showSnackbar', 'Message added!')
      })
    },
    doneTask({ state, commit }, id) {
      let message = state.messages.filter(message => message.id === id)[0]
      db.collection('messages').doc({ id: id }).update({
        done: !message.done
      }).then(() => {
        commit('doneTask', id)
      })
    },
    deleteTask({ commit }, id) {
      db.collection('messages').doc({ id: id }).delete().then(() => {
        commit('deleteTask', id)
        commit('showSnackbar', 'Message deleted!')
      })
    },
    updateTaskTitle({ commit }, payload) {
      db.collection('messages').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload)
        commit('showSnackbar', 'Message updated!')
      })
    },
    updateTaskDueDate({ commit }, payload) {
      db.collection('messages').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateTaskDueDate', payload)
        commit('showSnackbar', 'Due Date Updated!')
      })
    },
    setTasks({ commit }, messages) {
      db.collection('messages').set(messages)
      commit('setTasks', messages)
    },
    getTasks({ commit }) {
      db.collection('messages').get().then(messages => {
        commit('setTasks', messages)
      })
    }
  },
  getters: {
    messagesFiltered(state) {
      if (!state.search) {
        return state.messages
      }
      return state.messages.filter(message =>
        message.title.toLowerCase().includes(state.search.toLowerCase())
      )
    }
  }
})
