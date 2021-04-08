import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Assets';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: '',              moduleId: PLATFORM.moduleName('no-selection'),   title: 'Select' },
      { route: 'asset/:id',  moduleId: PLATFORM.moduleName('asset-detail'), name:'asset' },
     { route: 'asset-new', moduleId: PLATFORM.moduleName('asset-new'),   name:'asset-new' , title: 'New Asset' }
    ]);

    this.router = router;
  }

  save() {
    console.log("Button Clicked");
    this.router.navigateToRoute('asset-new');

    //this.router.navigateToRoute('newcontacts');

  }
}





// interface Todo {
//   description: string;
//   done: boolean;
// }

// export class App {
//   heading = "Todos";
//   todos: Todo[] = [];
//   todoDescription = '';

//   addTodo() {
//     if (this.todoDescription) {
//       this.todos.push({
//         description: this.todoDescription,
//         done: false
//       });
//       this.todoDescription = '';
//     }
//   }

//   removeTodo(todo) {
//     let index = this.todos.indexOf(todo);
//     if (index !== -1) {
//       this.todos.splice(index, 1);
//     }
//   }
// }


