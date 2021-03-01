<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col xs="12" md="6">
            <List listName="Pendiente"
              :isCompletedList="false"
              :tasks="pending"
              @order-by-id="orderByID(true)"
              @order-by-content="orderByContent(true)"
            />
          </v-col>
          <v-col xs="12" md="6">
            <List listName="Completado"
              :isCompletedList="true"
              :tasks="completed"
              @order-by-id="orderByID(false)"
              @order-by-content="orderByContent(false)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import List from './components/List'

export default {
  name: 'App',
  components: {
    List
  },
  data: () => ({
    pending: [],
    completed: []
  }),
  mounted () {
    this.pending = this.pendingTasks
    this.completed = this.completedTasks
  },
  updated () {
    this.pending = this.pendingTasks
    this.completed = this.completedTasks
  },
  methods: {
    orderByID (pending) {
      return pending ? this.pending.sort((a, b) => a.id - b.id) : this.completed.sort((a, b) => a.id - b.id)
    },
    orderByContent (pending) {
      return pending
        ? this.pending.sort((a, b) => a.content.toLocaleLowerCase().localeCompare(b.content))
        : this.completed.sort((a, b) => a.content.toLocaleLowerCase().localeCompare(b.content))
    }
  },
  computed: {
    completedTasks () {
      return this.$store.state.tasks.filter(task => task.done)
    },
    pendingTasks () {
      return this.$store.state.tasks.filter(task => !task.done)
    }
  },
  watch: {
    completedTasks: function (newValue) {
      this.completed = newValue
    },
    pendingTasks: function (newValue) {
      this.pending = newValue
    }
  }
}
</script>
