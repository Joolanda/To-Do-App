<template>
  <div class="app-container">
    <md-toolbar>
      <h1>{{ title }}</h1>
    </md-toolbar>

    <md-field class="addTodo">
      <md-textarea
        class="todos_textarea"
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
      title: "TO DO",
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
.app-container {
  margin: 5%;
}
.addTodo {
  text-align: left;
  margin: 0 auto;
  margin-bottom: 20px;
  width: 80%;
  height: 80%;
  padding-top: 5px;
  padding-left: 5px;
}
.todos_textarea {
  padding-top: 5px;
  padding-left: 5px;
  padding-bottom: 5px;
}

.element.style {
  width: 80%;
}

.material-icons {
  cursor: pointer;
}

.todos {
  width: 100%;
  margin: 0 auto;
  padding-top: 0px;
  padding-bottom: 5px;
  border: 0.5px solid #896b4c;
}
.todo-title {
  padding: 20px;
  text-decoration: #896b4c;

  background: #212121;
}
h1 {
  color: #896b4c;
}
.list-item {
  border-bottom: 0.5px solid #896b4c;
  margin-bottom: 15px;
  width: 100%;
}

.md-field {
  width: 80%;
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