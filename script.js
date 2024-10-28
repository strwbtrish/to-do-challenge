'use script';

class ToDoApp {
    taskId;
    tasks;

    constructor() {
        this.input = document.querySelector('.todo-input');
        this.switchTheme = document.querySelector('.switch-theme');
        this.body = document.querySelector('body');
        this.detailBox = document.querySelector('.project-box-details-box');
        this.linkBox = document.querySelector('.project-box-links-box');
        this.links = document.querySelectorAll('.a-link');
        this.taskLists = this.detailBox.querySelector('.ul-list');
        this.specificTask = document.querySelector('.radio-li');
        this.activeLink = document.querySelector('.active-link');
        //links
        this.allTaskLink = document.querySelector('.all-link');
        this.activeTaskLink = document.querySelector('.active-link');
        this.completedTaskLink = document.querySelector('.completed-link');
        this.noOfTasks = document.querySelector('.no-items');
        this.clearCompleted = document.querySelector('.clear-complete');
      

        //for testing
        this.tasks = [{
            taskId: '000001',
            message: 'Prepare Breakfast',
            activeTask: false,
        }, {
            taskId: '000002',
            message: 'Wash dishes',
            activeTask: true,
        }, {
            taskId: '000003',
            message: 'Play video games',
            activeTask: false,
        }];

        // this.tasks = [];

        this.init();
        this.toggletheme();
        this.deleteTask();
        this.registerEventListener();
        this.modifyTaskStatus();
        this.clearCompletedTasks();
        this.taskId = ''; //temporary
        
    }

    init() {
        this.input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (this.input.value.trim() === '') {
                    console.error('Empty input!!!');
                    this.clearInput();

                } else {
                    this.addTask();
                    this.clearInput();
                }
            }
        }.bind(this));
    
    }

    get currentHash() {
        return window.location.hash.slice(1).trim();
    }

    addTask() {
        //set id
        this.taskId++;
        this.taskId = `${this.taskId}`.padStart(6, '0');
        console.log(this.taskId);

        const addTask = {
            taskId: this.taskId,
            message: this.input.value,
            activeTask: true
        }

        this.tasks.push(addTask);

        this.checkHashAndRender();
        }


    generateMarkUp(task) {
        const addCheck = !task.activeTask ? 'CHECKED' : '';
        const slashCompletedTask = !task.activeTask ? 'text-decoration: line-through;' : '';

        return `<li class="radio-li" data-id = '${task.taskId}'>
        <label for="${task.taskId}" class="radio-button-label" style="${slashCompletedTask}"}>
        <input type="radio" class="radio-btn" data-id="${task.taskId}" } ${addCheck}>${task.message}
        </label>
        <img src="images/icon-cross.svg" class="delete-task" data-id= "${task.taskId}">
        </li>`
    }

    //for active task and completed task
    renderTasks() {
        let renderTasks;
        const typeOfTask = this.currentHash.replace('tasks', ' tasks'); //put space
        this.clearTasks();

        const noOfTasksLeft = this.tasks.reduce((acc, i) =>  acc += (i.activeTask ? 1 : 0), 0);

        this.noOfTasks.textContent = `${noOfTasksLeft} items left`;

        if (typeOfTask === 'all tasks' || !typeOfTask) {

            if(this.tasks.length === 0) {
                renderTasks = '<li class="no-tasks-message">No tasks at the moment </li>';
                
            } else {
                renderTasks = this.tasks.map(this.generateMarkUp.bind(this)).join(''); 
            }}
        
        else {

            if(this.tasks.length === 0) {
                renderTasks = `<li class="no-tasks-message">No ${typeOfTask} at the moment </li>`;
                
            } else {
                renderTasks = this.tasks
                .filter(task => this.currentHash === 'activetasks' ? task.activeTask : !task.activeTask)
                .map(this.generateMarkUp.bind(this)).join(''); 
            }}

        this.taskLists.insertAdjacentHTML('beforeend', renderTasks);
    }

    checkHashAndRender() {
        const allLinks = {
            completedtasks: this.completedTaskLink,
            activetasks: this.activeTaskLink,
            alltasks: this.allTaskLink
        }

        this.renderTasks();
      
        //Reset links
        Object.values(allLinks).forEach(link => link.classList.remove('ACTIVE'));

        //Add 1 active link according to the current hash
        (allLinks[this.currentHash] || allLinks.alltasks).classList.add('ACTIVE');
    }

    registerEventListener() {
        //ALL, ACTIVE, COMPLETED
        window.addEventListener('hashchange', this.checkHashAndRender.bind(this));
        document.addEventListener('DOMContentLoaded', this.checkHashAndRender.bind(this));
    }

    deleteTask() {
        this.detailBox.addEventListener('click', function(e) {
         
            if (!e.target.classList.contains('delete-task')) return
            const selectedTaskID = e.target.dataset.id;
            const findID = this.tasks.findIndex(task => task.taskId === selectedTaskID);

            if (findID === -1) return;

            this.tasks.splice(findID, 1);


            this.checkHashAndRender();
        

        }.bind(this))
    }

    clearCompletedTasks() {
        this.clearCompleted.addEventListener('click', function() {
            this.tasks =  this.tasks.filter(task => task.activeTask);
            this.checkHashAndRender();
        }.bind(this));
            
    }

    findID(taskID) {
        return this.tasks.findIndex(task => task.taskId === taskID);
    }
    
    modifyTaskStatus() {
        this.taskLists.addEventListener('click', function(e) {
            const clicked = e.target;
            if (!clicked.classList.contains('radio-btn')) return;
            
            const selectedTaskID = clicked.dataset.id;
            const id = this.findID(selectedTaskID);
            const radioBtn = document.querySelector(`input[type="radio"][data-id = "${this.tasks[id].taskId}"]`);
           
            //Change task status
            if(this.tasks[id].activeTask) {

                this.tasks[id].activeTask = false;
            } else  {

                this.tasks[id].activeTask = true;
                radioBtn.checked = false;
            }

            this.checkHashAndRender();
            
        }.bind(this))
        
    }

    clearInput() {
        this.input.value = '';
    }

    clearTasks() {
       this.taskLists.textContent = '';
    }


    toggletheme() {
        this.switchTheme.addEventListener('click', function() {

            this.switchTheme.classList.toggle('light-themey');
            this.switchTheme.style.opacity = 0;
        
        
        setTimeout(() =>
        {
            this.body.classList.toggle('light-theme');
        
            if (this.switchTheme.classList.contains('light-theme')) {
                this.switchTheme.src = 'images/icon-moon.svg'; 
                this.switchTheme.style.opacity = 1;
               
            }
        
            else {
                this.switchTheme.src = 'images/icon-sun.svg';
                this.switchTheme.style.opacity = 1;
        
            }
        
        }, 300) // 0.3s
        }.bind(this));
        
    }


    } //END CLASS



const runApp = new ToDoApp();

