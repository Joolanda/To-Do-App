<template>

  <div>
  <md-field>
    <md-input 
    v-model="currentTodo" 
    @keydown.enter="addTodo()" 
    placeholder="Add a todo"></md-input>
  </md-field>

    <ul class="todos">
      <li v-for="todo in todos" :key="todo.id">
            <input
            class="checkbox"
            v-model="todo.completed" 
            @change="toggleCompleted()" 
            placeholder="done">

        {{ todo.label }}

        <button @click="removeTodo(todo)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      currentTodo: ''
    };
  },
  methods: {

    addTodo() {
      this.todos.push({id: this.todos.length, label: this.currentTodo, completed: false});
      this.currentTodo = '';
    },
    editedTodo() {
      this.todos.push({id: this.todos.length, label: this.currentTodo, completed: false});
      this.currentTodo = '{{ todo.label }}';
    },
    removeTodo(todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    toggleCompleted() {
        this.todos.push({id: this.todos.length, label: this.currentTodo, completed: true});
      this.currentTodo = '';
    },
  },
};

</script>

<style>
</style>
