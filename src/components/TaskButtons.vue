<template>
  <div>
    <v-tooltip
      v-if="!editing"
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          depressed
          fab
          icon
          small
          @click="editTask"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
      </template>
      <span>Edit Task</span>
    </v-tooltip>
    <v-tooltip
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          depressed
          fab
          icon
          small
          @click="removeTask"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </template>
      <span>Remove Task</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'TaskButtons',
  props: {
    taskId: {
      type: Number,
      required: true
    },
    editing: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    //
  }),
  methods: {
    editTask () {
      this.$store.commit('toggleEditing', this.taskId)
    },
    removeTask () {
      this.$store.commit('removeTask', this.taskId)
    }
  }
}
</script>
