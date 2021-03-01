<template>
  <v-tooltip
    bottom
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        block
        color="primary"
        depressed
        @click="addNewTask"
        :disabled="isEditingTask"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <span>Add New Task</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'AddTaskButton',
  props: {
    isDone: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    //
  }),
  methods: {
    addNewTask () {
      this.$store.commit('addTask', {
        id: this.tasksLength,
        content: '',
        done: this.isDone,
        editing: true
      })
    }
  },
  computed: {
    isEditingTask () {
      return this.$store.state.tasks.filter(task => task.editing).length > 0
    },
    tasksLength () {
      return this.$store.state.tasks.length
    }
  }
}
</script>
