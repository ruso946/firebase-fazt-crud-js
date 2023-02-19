
import {getTasks, saveTask, onGetTasks, deleteTask, getTask, updateTask} from './firebase.js'

const taskContainer = document.getElementById('task-container')
const taskform = document.getElementById('task-form')

let editstatus = false;
let id = "";

window.addEventListener('DOMContentLoaded', async () => {   //inicia la funcion cuando carga la pagina
    onGetTasks((querySnapshot) => {
        let html = "";
        
        querySnapshot.forEach((doc) => {
            const task = doc.data();
            html += `
                <div>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <button class="btn-delete" data-id="${doc.id}">delete</button>
                    <button class="btn-edit" data-id="${doc.id}">edit</button>
                </div>
            `;
        
        });
        
        taskContainer.innerHTML = html;

        const btnDelete = taskContainer.querySelectorAll('.btn-delete');

        btnDelete.forEach(btn=>{
            btn.addEventListener("click", (e)=>
            deleteTask(e.target.dataset.id))
        })
    

        const btnEdit = taskContainer.querySelectorAll('.btn-edit')
        btnEdit.forEach(btn=>{
            btn.addEventListener("click", async (e)=>{            
                const doc = await getTask(e.target.dataset.id)
                const task = doc.data()

                taskform['task-title'].value = task.title
                taskform['task-description'].value = task.description
                editstatus= true;
                id = doc.id;

                taskform['btn-task-save'].innerText = "Update"
            });
        });
    });
});

taskform.addEventListener('submit', (e) => {
    e.preventDefault()

    const title = taskform['task-title']
    const description = taskform['task-description']

    if (!editstatus) {
        saveTask(title.value, description.value);        
    } else {
        updateTask(id, {
            title: title.value,
            description: description.value,
        });
        editstatus = false;
        taskform['btn-task-save'].innerText = "Save"
    }
    taskform.reset()
    
    
})

 