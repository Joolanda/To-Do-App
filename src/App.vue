<template>
  <div class="app-container">
    <md-toolbar>
      <h1>{{ title }}</h1>
    </md-toolbar>

    <md-field class="addTodo">
      <md-textarea
        v-model="currentTodo"
        @keydown.enter="addTodo()"
        placeholder="Add a new task"
      >
      </md-textarea>
    </md-field>
    <md-list class="todos">
      <md-list-item class="list-item" v-for="todo in todos" :key="todo.id">
        <md-checkbox
          type="checkbox"
          v-model="todo.completed"
          class="md-primary"
        ></md-checkbox>
        <span
          v-on:click.prevent="clickToEdit(todo)"
          v-show="editTodoId !== todo.id"
          :class="{ completed: todo.completed }"
        >
          {{ todo.label }}
        </span>
        <input
          v-model="todo.label"
          v-show="editTodoId == todo.id"
          v-on:keyup.enter="saveEdit"
        />
        <a @click.prevent="removeTodo(todo)">
          <i class="material-icons right teal-text">delete</i>
        </a>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: "RegularToolbar",
  data() {
    return {
      title: "TO DO list",
      todos: [],
      currentTodo: "",
      editTodoId: null,
    };
  },
  watch: {
    todos: {
      handler() {
        localStorage.todos = JSON.stringify(this.todos);
      },
      deep: true,
    },
  },
  mounted() {
    if (localStorage.todos) {
      this.todos = JSON.parse(localStorage.todos);
    }
  },
  methods: {
    showTodos() {
      return this.todos.length > 0;
    },

    addTodo() {
      if (this.currentTodo !== "") {
        this.todos.push({
          id: this.todos.length,
          label: this.currentTodo,
          completed: false,
        });
        this.currentTodo = "";
      }
    },
    removeTodo(todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    clickToEdit(todo) {
      this.editTodoId = todo.id;
    },
    saveEdit() {
      this.editTodoId = null;
    },
  },
};
</script>

<style>
.addTodo {
  margin: 0 auto;
  margin-bottom: 20px;
  width: 80%;
  height: 80%;
}

element.style {
  width: 100%;
}

.material-icons {
  cursor: pointer;
}
.todos {
  width: 80%;
  margin: 0 auto;
  padding-top: 0px;
  padding-bottom: 0px;
  border: 0.5px solid #0af;
}
.todo-title {
  background: #212121;
}
.list-item {
  border-top: 0.5px solid #896b4c;
  width: 100%;
}

.md-field {
  border: 2px solid #896b4c;
  height: 70px;
  border-radius: 3px;
  font-size: 24px;
  min-height: 0px;
  padding-top: 5px;
  padding-left: 5px;
}
.md-button {
  border: 1.5px solid #896b4c;
}
.completed {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>