import React, {Component } from "react";
import "./index.css";
// import InfiniteCalendar from 'react-infinite-calendar';
// import 'react-infinite-calendar/styles.css';
import UpdateTaskPopup from '../popup';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";





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
      chosenColumn: 'name',
      currentName: '',
      isCalendarVisible: false,
      addNewtask: false
      

      
    };

    this.stagesNames = ['Backlog', 'To Do', 'Ongoing','Review'];
    // this.handleChange = this.handleChange.bind(this);
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
            name: obj[i].name,
            course: obj[i].course,
            calendarDate: obj[i].due_date,
            stage: obj[i].stage,
            

          }); 
        // alert(obj[i].tid);
      
          };

          this.setState({tasks: datafiles});

      });
  }

  

  

  async createTask(name, course, due_date, stage) {
    try {
      const response = await fetch(`http://localhost:3001/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, course, due_date, stage }),
      });
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      
      // If response is successful, update state or handle as necessary
      this.setState({ tasks: this.state.tasks });
      // window.location.reload();
  
    } catch (error) {
      console.error('Error creating task:', error);
      // Handle the error, such as showing an error message to the user
      // For example, you can display an alert:
    }
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

  handleDateInputFocus = () => {
    this.setState({ isCalendarVisible: true });
  }




  // handleChange(date) {
  //   this.setState({
  //     calendarDate: date.toISOString().split('T')[0],
  //     dateInput: date.toISOString().split('T')[0].toString()
  //   })
     
  // }

  handleEdit(event) {
    this.setState({chosenColumn: event.target.value});
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.calendarDate)
    
  }
  
  onEditTask = (e) => {
    this.setState({
      changeTask: e.target.value
    })

  }
  onInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
      
    })
  }

  onDateChange = (e) => {
    this.setState({
      calendarDate: e
      
    })
  }
  
  onCourseInputChange = (e) => {
    this.setState({
      courseInput: e.target.value
    })
  }
  addTask = () => {
    if (this.state.inputValue) {
      let _tasks = this.state.tasks;
      this.createTask(this.state.inputValue, this.state.courseInput, this.state.calendarDate, 0);
      this.state.tasks.push({ name: this.state.inputValue, course: this.state.courseInput, calendarDate: this.state.calendarDate,  stage: 0 });
     
      
      this.setState({ tasks: _tasks, inputValue:'' });
      this.setState({ tasks: _tasks, courseInput:'' });
      this.setState({ tasks: _tasks, calendarDate:new Date() });

      this.setState({ isCalendarVisible: false });
      this.setState({ addNewtask: !this.state.addNewtask });

      window.location.reload();
      
      
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
      if (task.name == name) return {tid: task.tid, name: task.name, course: task.course,calendarDate: task.calendarDate, stage: task.stage == 0 ? 0 : task.stage -1  };
      else return task;
    });

    this.setState({ tasks: _tasks });
  }

  forward = (name) => {
    let _tasks = this.state.tasks;
    _tasks = _tasks.map((task) => {
      if (task.name == name) return { tid: task.tid, name: task.name, course: task.course,calendarDate: task.calendarDate, stage: task.stage == 3 ? 3 : task.stage +1  };
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
   
    
  }
  
  update = (name, column, change) => {
    let _tasks = this.state.tasks;
  
    for (let i =0; i < Object.keys(_tasks).length; i++) {
     if (_tasks[i].name == name) {
      if (column == "name") {
        this.createTask(change, _tasks[i].course, _tasks[i].calendarDate, _tasks[i].stage)
        this.remove(name)

      }
      else if (column == "course") {
        this.createTask(_tasks[i].name ,change, _tasks[i].calendarDate,  _tasks[i].stage)
        this.remove(name)

      }
      else if (column == "date") {
        this.createTask(_tasks[i].name , _tasks[i].course, change,  _tasks[i].stage)
        this.remove(name)

      }
      else {
        
      }
      
        // this.updateMerchant(idToUpdate, column, change);
        this.setState({ tasks: _tasks });

      
     }
    
  };
    
  }

  showAdd = () => {
    this.setState({ addNewtask: !this.state.addNewtask });
  
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
      
      <div className="mt-50 layout-column justify-content-center align-items-center">
      <h1 className="mt-50">A KANBAN board</h1>
      
      
      
      <div className="mt-50 layout-row">
      <button onClick={this.showAdd} type="submit" className="addthetask" data-testid="create-task-button">Add a new task</button>
      <button onClick={this.saveProgress} type="submit" className="save" data-testid="create-task-button">Save progress</button>


      </div>

      
      <div className="mt-50 layout-row">

      {this.state.addNewtask && (
        
        <div>           
        <section style={{border: "thin solid rgba(var(--primary-rgb), 0.1)", padding:"2rem", borderRadius: "10px"}} className="mt-0 layout-column align-items-left justify-content-center">
          <h2>Create a new task</h2>
          <label htmlFor="create-task-input">Task name</label>
          <input style={{ borderRadius: "5px"}}  value={this.state.inputValue} onChange={this.onInputChange} onKeyDown={this.enterAddTask} id="create-task-input" type="text" className="large mb-10" placeholder="New task name" data-testid="create-task-input" />
          
          <label htmlFor="create-task-input">Course name</label>
          <input style={{ borderRadius: "5px"}}  value={this.state.courseInput} onChange={this.onCourseInputChange} onKeyDown={this.enterAddTask} id="create-task-input" type="text" className="large mb-10" placeholder="Course code" data-testid="create-task-input" />
          {/* <input value={this.state.dateInput}  onFocus={this.handleDateInputFocus}  onKeyDown={this.enterAddTask} id="create-task-input" type="text" className="large" placeholder="Deadline date" data-testid="create-task-input" /> */}
          <label htmlFor="create-task-input">Due date</label>
          <DatePicker className="datepicker-input"  selected={this.state.calendarDate} onChange={this.onDateChange} />
          <button style={{ marginTop: "20px"}} onClick={this.addTask} type="submit" className="createTask" data-testid="create-task-button">Create task</button>
          
          {/* <button  onClick={this.getMerchant} type="submit" className="save-progress">Delete a task </button> */}
        </section>
        </div>
        
      )}
      
      
        {stagesTasks.map((tasks, i) => {
        return (
    
          <div className="card outlined ml-20 mt-0" key={`${i}`}>
          <div className="card-text">
            <h4>{this.stagesNames[i]}</h4>
            <ul className="styled mt-50" data-testid={`stage-${i}`}>
            {tasks.map((task, index) => {
              return <li style={{borderRadius: "18px"}} className="slide-up-fade-in" key={`${i}${index}`}>
              <div className="layout-column justify-content-between align-items-center">
                <section className="mt-50 layout-column align-items-center justify-content-center ">
                <span style={{fontSize: "1rem", minWidth: "200px", textAlign: "center", maxWidth: "200px", overflow: "hidden"}}>{task.name}</span>
                <section className="mt-50 layout-row align-items-center justify-content-center ">
                  <span className="taskIcon">{task.course}</span>
                  <span  className="taskIcon2">{task.calendarDate.split("T")[0]}</span>
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
                {/* <button onClick={() => this.update(task.name)} className="icon-only small mx-2">
                  <i className="material-icons">settings</i>
                </button> */}
                <UpdateTaskPopup name={task.name} onUpdate={this.update} />
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