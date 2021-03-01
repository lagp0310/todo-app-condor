<template>
  <v-list-item :ripple="false">
    <v-list-item-action>
      <v-checkbox
        v-model="isDone"
        @change="toggleDone"
      ></v-checkbox>
    </v-list-item-action>
    <v-list-item-content>
      <v-text-field
        v-model="content"
        v-if="task.editing"
        :autofocus="task.editing"
        label="Task Content"
        clearable
        :rules="[rules.required]"
        append-icon="mdi-check"
        @click:append="applyChanges"
        @keyup.enter="applyChanges"
        @keyup.escape="removeTask"
      ></v-text-field>
      <v-list-item-title
        v-if="!task.editing"
      >
        {{ task.content }}
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <TaskButtons
        :taskId="task.id"
        :editing="task.editing"
      />
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import TaskButtons from '@/components/TaskButtons.vue'

export default {
  name: 'ListItem',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    content: null,
    isDone: false,
    rules: {
      required: value => !!value || 'Task Content is Required.'
    }
  }),
  mounted () {
    this.content = this.task.content
    this.isDone = this.task.done
  },
  methods: {
    applyChanges () {
      if (!this.content) {
        return
      }

      this.$store.commit('toggleEditing', this.task.id)
      this.$store.commit('editTask', {
        taskId: this.task.id,
        taskContent: this.content
      })
    },
    toggleDone () {
      this.$store.commit('toggleDone', this.task.id)
    },
    removeTask () {
      this.$store.commit('removeTask', this.task.id)
    }
  },
  components: {
    TaskButtons
  }
}
</script>
