import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 0,
        content: 'Testing',
        done: false,
        editing: false
      },
      {
        id: 1,
        content: 'Another Testing',
        done: true,
        editing: false
      },
      {
        id: 2,
        content: 'B Testing',
        done: false,
        editing: false
      }
    ]
  },
  mutations: {
    addTask (state, task) {
      state.tasks.push(task)
    },
    editTask (state, { taskId, taskContent }) {
      state.tasks.filter(task => task.id === taskId)[0].content = taskContent
    },
    toggleDone (state, taskId) {
      const task = state.tasks.filter(task => task.id === taskId)[0]
      task.done = !task.done
    },
    toggleEditing (state, taskId) {
      const task = state.tasks.filter(task => task.id === taskId)[0]
      task.editing = !task.editing
    },
    removeTask (state, taskId) {
      const index = state.tasks.findIndex(task => task.id === taskId)
      state.tasks.splice(index, 1)
    }
  },
  actions: {
  },
  modules: {
  }
})
