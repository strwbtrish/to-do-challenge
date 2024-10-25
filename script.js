'use script';

class ToDoApp {
 
    constructor() {
        this.input = document.querySelector('.todo-input');
        this.switchTheme = document.querySelector('.switch-theme');
        this.body = document.querySelector('body');
        this.detailBox = document.querySelector('.project-box-details-box');
        this.taskLists = this.detailBox.querySelector('.ul-list');
        this.taskId = '';
        this.init();
        this.toggletheme();
    }

    init() {
        this.input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (this.input.value.trim() === '') {
                    console.error('Empty input!!!');
                    this.clear();

                } else {
                    this.addTask();
                    this.clear();
                }
            }
        }.bind(this));
    
    }

    addTask() {
        //set id
        this.taskId++;
        this.taskId = `${this.taskId}`.padStart(6, '0');

        console.log('Task Id:' , this.taskId);
        console.log('To do list:' , this.input.value);

        const addList = `<li class="radio-li" data-id = '${this.taskId}'><label for="${this.taskId}" class="radio-button-label">
                <input type="radio" value="${this.taskId}" id="${this.taskId}">${this.input.value}</label></li>`

        
        this.taskLists.insertAdjacentHTML('beforeend', addList); }

    editTask() {

    }

    deleteTask() {
        
    }

    clear() {
        this.input.value = '';
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

