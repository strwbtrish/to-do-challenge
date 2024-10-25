'use script';

class ToDoApp {
    #taskId;
    tasks;

    constructor() {
        this.input = document.querySelector('.todo-input');
        this.switchTheme = document.querySelector('.switch-theme');
        this.body = document.querySelector('body');
        this.detailBox = document.querySelector('.project-box-details-box');
        this.taskLists = this.detailBox.querySelector('.ul-list');
        this.allTasks = document.querySelectorAll('.radio-li');
        this.specificTask = document.querySelector('.radio-li');
        this.activeLink = document.querySelector('.active-link');

        //for testing
        this.tasks = [{
            taskId: '33333',
            message: 'Prepare Breakfast',
            activeTask: true,
        }, {
            taskId: '332',
            message: 'Wash dishes',
            activeTask: true,
        }, {
            taskId: '333332',
            message: 'Play video games',
            activeTask: false,
        }];

        this.init();
        this.toggletheme();
        this.deleteTask();
        this.allTask();
        this.activeTask();
        this.completeTask();
        this.#taskId = ''; //temporary
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

    addTask() {
        //set id
        this.#taskId++;
        this.#taskId = `${this.#taskId}`.padStart(6, '0');
        console.log(this.#taskId);

        const addTask = {
            taskId: this.#taskId,
            message: this.input.value,
            activeTask: true
        }

        this.tasks.push(addTask);

        this.renderAllTasks();
        

        }


    generateMarkUp(task) {
        return `<li class="radio-li" data-id = '${task.taskId}'><label for="${task.taskId}" class="radio-button-label">
        <input type="radio" value="${task.taskId}" id="${task.taskId}">${task.message}</label>
        <img src="images/icon-cross.svg" class="delete-task" data-id= "${task.taskId}"></li>`
    }

    renderAllTasks() {
        this.clearTasks();

        const allTasks = this.tasks.map(this.generateMarkUp.bind(this)).join('');
        this.taskLists.insertAdjacentHTML('beforeend', allTasks);

    }
    
    //for active task and completed task
    renderFilteredTasks(taskStatus) {
        this.clearTasks();

        const renderTasks = this.tasks
        .filter(task => taskStatus === 'active' ? task.activeTask : !task.activeTask)
        .map(this.generateMarkUp.bind(this)).join('');
          
        this.taskLists.insertAdjacentHTML('beforeend', renderTasks);
    }

    
    allTask() {

        const checkHashAndRender = () => {
            const currentHash = window.location.hash.slice(1).trim();
            if(currentHash !== 'alltasks') return;

            this.renderAllTasks();
        }

        window.addEventListener('hashchange', checkHashAndRender);
        document.addEventListener('DOMContentLoaded', checkHashAndRender);
    }

    activeTask() {
        const checkHashAndRender = () => {
            const currentHash = window.location.hash.slice(1).trim();
            if(currentHash !== "active") return; 

            this.renderFilteredTasks('active');
        }

        window.addEventListener('hashchange', checkHashAndRender);
        document.addEventListener("DOMContentLoaded", checkHashAndRender);
           
    }

    completeTask() {
        const checkHashAndRender = () => {
            const currentHash = window.location.hash.slice(1).trim();
            if(currentHash !== 'completedtasks') return;

            this.renderFilteredTasks('complete');
        }

        window.addEventListener('hashchange', checkHashAndRender);
        window.addEventListener("DOMContentLoaded", checkHashAndRender);
    }

 
    editTask() {

    }

    // deleteTask() {
    //     this.detailBox.addEventListener('click', function(e) {
    //         const parentTask = e.target.closest('.radio-li');
         
    //         if (!e.target.classList.contains('delete-task')) return
               
            
           

    //     }.bind(this))
    // }

    clearInput() {
        this.input.value = '';
    }

    clearTasks() {
        // this.tasks.forEach(task => task.remove());
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

