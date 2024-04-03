import React, {Component } from "react";
import "./index.css";
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';





export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.

    this.state = {
      
      tasks: [],
      inputValue: '',
      courseInput: '',
      dateInput: '',
      calendarDate: new Date(),
      count: 0,

      changeTask: '', 
      showForm: false,
      chosenColumn: 'task_name',
      currentName: ''
      

      
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing','Review'];
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    // this.onClick = this.onClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);

    this.getMerchant();
    
   
    
  }

  async getMerchant() {
    const datafiles = [];
    await fetch('http://localhost:3001')
      .then(response => {
        // alert(response.tid);
        return response.text();
      })
      .then(data => { 
        const obj = JSON.parse(data);
        for (let i =0; i < Object.keys(obj).length; i++) {
            
          datafiles.push({
            tid: obj[i].tid,
            name: obj[i].task_name,
            course: obj[i].course,
            chosenDate: obj[i].due_date,
            stage: obj[i].stage,
            

          }); 
        // alert(obj[i].tid);
      
          };

          this.setState({tasks: datafiles});

      });
  }

  

  

  async createMerchant(name, course, due_date) {
    // let name = prompt('Enter task name');
    // let course = prompt('Enter task course');
    // let due_date = prompt('Enter task due date');
    const stage = 0;
    await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, course, due_date,stage}),
    })
      .then(response => {
        return response.text();
      })
      this.setState({ tasks: this.state.tasks });

      window.location.reload();
    
      
      
  //     .then(data => {
  //       alert(data);
  //       this.getMerchant();
  //     });
  }
  async updateStage(id, stage) {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, stage}),
    })
      .then(response => {
        return response.text();
      })
      // .then(data => {
      //   // alert(data);
      //   this.getMerchant();
      // });
      this.setState({ tasks: this.state.tasks });
      
      

      // window.location.reload();
  }
  async updateMerchant(id, column, change) {    
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, column, change}),
    })
      .then(response => {
        return response.text();
      })
      // .then(data => {
      //   // alert(data);
      //   this.getMerchant();
      // });
      this.setState({ tasks: this.state.tasks });
      
      

      // window.location.reload();
  }


//   onClick = (name) => {
//     // On click we change our state – this will trigger our `render` method
//     if(this.state.showForm){
//       this.setState({ showForm: false });
//     }
//     else {
//       console.log(name);
//     this.setState({ showForm: true, currentName: name });
//     }
// }

// renderForm = () => {
//    return (
//        <div className="mt-50 layout-column"> 
//         <form onSubmit={this.onFormSubmit}>
//         <label>
//           <p>What to change</p>
//           <select value={this.state.chosenColumn} onChange={this.handleEdit}>
//             <option value="task_name">Task name</option>
//             <option value="course">Course</option>
//             <option value="due_date">Due date</option> 
//           </select>
//         </label>
//       </form>
     
//          <input value={this.state.changeTask} onChange={this.onEditTask} id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input" />
//          {this.state.chosenColumn} 
//          {this.state.changeTask} 
//          <button onClick={this.confirmUpdates} type="submit" className="addthetask" data-testid="update-task-button">Confirm changes</button>

//       </div>
//    );
// }


  // confirmUpdates = () => {
  //   let idToUpdate;
  //   let name = this.state.currentName;
  //   let _tasks = this.state.tasks;
  //   for (let i =0; i < Object.keys(_tasks).length; i++) {
  //     if (_tasks[i].name = name) {
  //       idToUpdate = _tasks[i].tid;
  //       if (this.state.chosenColumn == 'task_name'){
  //         _tasks.push({id: idToUpdate, name: this.state.changeTask, course: _tasks[i].course, chosenDate:  _tasks[i].chosenDate,  stage:  _tasks[i].stage });
  //       }
  //       else if (this.state.chosenColumn == 'course') {
  //         _tasks.push({id: idToUpdate, name: _tasks[i].name, course: this.state.changeTask, chosenDate:  _tasks[i].chosenDate,  stage:  _tasks[i].stage });
  //       }
  //       else {
  //         _tasks.push({id: idToUpdate, name: _tasks[i].name, course: _tasks[i].course, chosenDate: this.state.changeTask, stage:  _tasks[i].stage });
  //       }

  //       this.updateTask(idToUpdate, this.state.chosenColumn, this.state.changeTask);
  //       this.saveProgress(_tasks[i].id, _tasks[i].stage);
  //       // this.setState({ tasks: _tasks, chosenColumn:'', changeTask: 'task_name', showForm: false });  
  //       _tasks.splice(i, 1);
  //     }
  //   }
  // }
    async deleteMerchant(id) {
      
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        // alert(data);
        this.getMerchant();
      });

      // window.location.reload();
  }

  handleChange(date) {
    this.setState({
      calendarDate: date.toISOString().split('T')[0],
      dateInput: date.toISOString().split('T')[0].toString()
    })
     
  }

  handleEdit(event) {
    this.setState({chosenColumn: event.target.value});
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.chosenDate)
    
  }
  
  onEditTask = (e) => {
    this.setState({
      changeTask: e.target.value
    })

  }
  onInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }
  
  onCourseInputChange = (e) => {
    this.setState({
      courseInput: e.target.value
    })
  }
  addTask = () => {
    if (this.state.inputValue) {
      const _tasks = this.state.tasks;
      this.createMerchant(this.state.inputValue, this.state.courseInput, this.state.dateInput);
      _tasks.push({ name: this.state.inputValue, course: this.state.courseInput, chosenDate: this.state.dateInput,  stage: 0 });
     
      
      this.setState({ tasks: _tasks, inputValue:'' });
      this.setState({ tasks: _tasks, courseInput:'' });
      this.setState({ tasks: _tasks, dateInput:'' });

   
      
    }
    
  }

  enterAddTask = (e) => {
    if (e.key === 'Enter') {
      this.addTask()
    }
  }
  back = (name) => {
    let _tasks = this.state.tasks;
    _tasks = _tasks.map((task) => {
      if (task.name == name) return {tid: task.tid, name: task.name, course: task.course,chosenDate: task.chosenDate, stage: task.stage == 0 ? 0 : task.stage -1  };
      else return task;
    });

    this.setState({ tasks: _tasks });
  }

  forward = (name) => {
    let _tasks = this.state.tasks;
    _tasks = _tasks.map((task) => {
      if (task.name == name) return { tid: task.tid, name: task.name, course: task.course,chosenDate: task.chosenDate, stage: task.stage == 3 ? 3 : task.stage +1  };
      else return task;
    });

    this.setState({ tasks: _tasks });
  }

  remove = (name) => {
     // Find id where name is part of id
     let _tasks = this.state.tasks;
     let idToDelete = 0;
     for (let i =0; i < Object.keys(_tasks).length; i++) {
      if (_tasks[i].name = name) {
        idToDelete = _tasks[i].tid;
        console.log(_tasks[i].name);
        console.log(_tasks[i].tid);
        _tasks.splice(i, 1);
         this.deleteMerchant(idToDelete);
         this.setState({ tasks: _tasks });
         
      }
     
   };

   update = (name) => {
    // Find id where name is part of id
    let _tasks = this.state.tasks;
    let idToUpdate = 0;
    let column = prompt("Which part would you like to change?");
    if (column != name || column != course || column != date) {
      alert("There is no such column as" + column + " on this to-do list")
      return 
    }
    let change = prompt("What would you like to change it to?")

    for (let i =0; i < Object.keys(_tasks).length; i++) {
     if (_tasks[i].name = name) {
      idToUpdate = _tasks[i].tid;
       console.log(_tasks[i].name);
       console.log(_tasks[i].tid);
        this.updateMerchant(idToUpdate, column, change);
        this.setState({ tasks: _tasks });
      
     }
    
  };
    
  }
  

  saveProgress = () => {
    let _tasks = this.state.tasks;

     for (let i =0; i < Object.keys(_tasks).length; i++) {
        this.updateStage(_tasks[i].tid, _tasks[i].stage);
        console.log(_tasks[i].tid);
        console.log(_tasks[i].name);

      };
      this.setState({ tasks: _tasks });
  


  }

  test = () => {
    alert("I am an alert box!");


  }

  render() {
    const { tasks } = this.state;
    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; i++) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }
  
    
   
    return (
      
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="deadlineCal">
          <InfiniteCalendar

            selected={ this.state.calendarDate }
            onSelect={ this.handleChange }
            locale={{
            weekStartsOn: 1}}
            displayOptions={{
            layout: 'landscape'
            }}
            width={800}
            height={200}
          />
         </section>
         <section className="mt-50 layout-row align-items-center justify-content-center">
          <input value={this.state.inputValue} onChange={this.onInputChange} onKeyDown={this.enterAddTask} id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input" />
          <input value={this.state.courseInput} onChange={this.onCourseInputChange} onKeyDown={this.enterAddTask} id="create-task-input" type="text" className="large" placeholder="Course code" data-testid="create-task-input" />
          <input value={this.state.dateInput} onKeyDown={this.enterAddTask} id="create-task-input" type="text" className="large" placeholder="Deadline date" data-testid="create-task-input" />

        
          <button onClick={this.addTask} type="submit" className="addthetask" data-testid="create-task-button">Create task</button>
          <button onClick={this.saveProgress} type="submit" className="addthetask" data-testid="create-task-button">Save progress</button>
  
          {/* <button  onClick={this.getMerchant} type="submit" className="save-progress">Delete a task </button> */}
        </section>
        <div className="mt-50 layout-row">
          {stagesTasks.map((tasks, i) => {
            return (
              <div className="card outlined ml-20 mt-0" key={`${i}`}>
                <div className="card-text">
                  <h4>{this.stagesNames[i]}</h4>
                  <ul className="styled mt-50" data-testid={`stage-${i}`}>
                    {tasks.map((task, index) => {
                      return <li className="slide-up-fade-in" key={`${i}${index}`}>
                        <div className="layout-column justify-content-between align-items-center">
                        <section className="mt-50 layout-column align-items-center justify-content-center ">
                          <span  onClick={() => this.test() }>{task.name}</span>
                          <section className="mt-50 layout-row align-items-center justify-content-center ">
                          <span className="taskIcon">{task.course}</span>
                          <span onClick={() => this.test() } className="taskIcon2">{task.chosenDate.split("T")[0]}</span>
                          </section>
                        </section>
                          <div className="icons">
                          {/* <button onClick={() => this.onClick(task.name)} className="icon-only small mx-2">
                              <i className="material-icons">settings</i>
                            </button>
                            {this.state.showForm && this.renderForm()} */}
                            <button onClick={() => this.back(task.name)} className="icon-only small mx-2"  disabled={task.stage == 0}>
                              <i className="material-icons">arrow_back</i>
                            </button>
                            <button onClick={() => this.forward(task.name)} className="icon-only small mx-2"  disabled={task.stage == 3}>
                              <i className="material-icons">arrow_forward</i>
                            </button>
                            <button onClick={() => this.remove(task.name)} className="icon-only medium mx-2">
                              <i className="material-icons">checkmark</i>
                            </button>
                            <button onClick={() => this.update(task.name)} className="icon-only small mx-2">
                              <i className="material-icons">settings</i>
                            </button>
                    
                          </div>
                        </div>
                      </li>
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
        
      </div>
    );
  }
}
