<template>
  <v-card
    class="pa-2"
    outlined
    tile
  >
    <v-toolbar
     flat
    >
      <v-toolbar-title>{{ listName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searching"
        label="Search..."
        append-icon="mdi-magnify"
        class="pt-5"
        clearable
        :disabled="!searching && filteredTasks.length === 0"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-menu
        bottom
        left
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            :disabled="filteredTasks.length === 0"
          >
            <v-icon>mdi-filter-variant</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group
            v-model="currentFilter"
            color="primary"
          >
            <v-list-item
              @click="$emit('order-by-id')"
            >
              <v-list-item-content>
                <v-list-item-title>
                  Filter by ID
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click="$emit('order-by-content')"
            >
              <v-list-item-content>
                <v-list-item-title>
                  Filter by Content (A-Z)
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-list
      flat
      subheader
    >
      <v-list-item-group>
        <p
          v-if="!searching && filteredTasks.length === 0"
          class="text-subtitle-1 text-center"
        >
          {{ this.isCompletedList ? 'No Completed Tasks Yet' : 'No Pending Tasks' }}
        </p>
        <p
          v-if="searching && filteredTasks.length === 0"
          class="text-subtitle-1 text-center"
        >
          Sorry, Task Not Found.
        </p>
        <div v-for="task in filteredTasks" :key="task.id">
          <ListItem
            :task="task"
          />
        </div>
        <AddTaskButton
          :isDone="this.isCompletedList"
        />
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import ListItem from '@/components/ListItem.vue'
import AddTaskButton from '@/components/AddTaskButton.vue'

export default {
  name: 'List',
  props: {
    listName: {
      type: String,
      required: true
    },
    isCompletedList: {
      type: Boolean,
      required: false
    },
    tasks: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    currentFilter: 0,
    searching: null
  }),
  computed: {
    filteredTasks () {
      if (!this.searching) {
        return this.tasks
      }

      return this.tasks.filter(task => task.content.toLowerCase().includes(this.searching.toLowerCase()))
    }
  },
  components: {
    ListItem,
    AddTaskButton
  }
}
</script>
