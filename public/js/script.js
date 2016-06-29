'use strict';
class Task{

    constructor(title = Task.getDefaultTitle()){
        this.title = title;
        this._done = false;
        Task.count ++;
        console.log('creating task');
    }

    get done(){
        return this._done === true ? 'Done': 'Undone';
    }

    set done(value){
        console.log('getting value: ' + value);
        if(value!==undefined && typeof value === 'boolean'){
            this._done = value;
        }else{
            console.log('Error! Set val true or false');
        }
    }

    complete(){
        this.done = true;
        console.log(`${this.title} is done`);
    }

    static getDefaultTitle(){
        return 'Задача'
    }
}
Task.count = 0;


let task3 = new Task();

console.log(task3._done);
task3.complete();
console.log(task3.done, task3._done);