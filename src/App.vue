<template>
  <div class="app-container">
    <md-toolbar>
      <h1>{{title}}</h1>
    </md-toolbar>
 
  <md-field class="addTodo">
    <md-textarea
      v-model="currentTodo" 
      @keydown.enter="addTodo()" 
      placeholder="Add a new task">
    </md-textarea>
  </md-field>
     <md-list class="todos">
      <md-list-item class="list-item" v-for="todo in todos" :key="todo.id">
      <md-checkbox type="checkbox" v-model="todo.completed"></md-checkbox>
        <span v-on:click.prevent="clickToEdit(todo)" v-show="editTodoId !== todo.id" :class="{ completed: todo.completed }"> 
            {{ todo.label }} 
          </span> 
        <input v-model="todo.label" v-show="editTodoId == todo.id" v-on:keyup.enter="saveEdit">
           <a @click.prevent="removeTodo(todo)">
             <i class="material-icons right teal-text">delete</i>
          </a>         
      </md-list-item>
    </md-list>

  </div>
</template>

<script>
export default {
  name: 'RegularToolbar',
  data() {
    return {
      title: "My Weekly Tasks",
      todos: [],
      currentTodo: '',
      editTodoId: null
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

    showTodos () {
      return this.todos.length > 0 
    },


    addTodo() {
      if(this.currentTodo !== ''){
      this.todos.push({
        id: this.todos.length, 
        label: this.currentTodo, 
        completed: false
        });
      this.currentTodo = '';
      }
    },
    removeTodo(todo){
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    clickToEdit (todo) {
      this.editTodoId = todo.id; 
    },
    saveEdit(){
      this.editTodoId = null;
    }
    
  }
};

</script>

<style>
.addTodo{
  margin: 0 auto;
  margin-bottom: 20px;
  width: 80%;
  height: 80px;
}
.todos {
  width: 80%;
  margin: 0 auto;
  padding-top: 0px;
  padding-bottom: 0px;
    border: 0.5px solid dark-grey;
}
.todo-title{
  background: #212121;
}
.list-item{
width: 100%;
}
.md-field {
  border: 2px solid blue !important;
  height: 70px !important;
  border-radius: 3px !important;
  width: 60% !important;
  font-size: 40px !important;
  min-height: 0px !important;
  padding-top: 5px !important;
  padding-left: 5px !important;
}
.md-button{
  border: 1.5px solid white !important;
}
.completed{
  text-decoration: line-through;
  opacity: 0.5;
};
</style>