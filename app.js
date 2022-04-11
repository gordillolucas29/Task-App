document.getElementById('formTask')
    .addEventListener('submit', saveTask);

function saveTask(e) {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    const task = {
        title,  // title: title,
        description // description: description
    };

    // Si las tareas en tan vacías crea una
    if (localStorage.getItem('tasks') === null) {
        // creo un array
        let tasks = [];
        // le agrego al array los objetos 'task'
        tasks.push(task);
        // lo almaceno en el localstorage
        //  JSON.stringify: método del navegador que convierte un objeto en un string
        localStorage.setItem('tasks', JSON.stringify(tasks))
    
    // Si las tareas ya existen, actualizalas y almacená las nuevas.
    } else {
        // obtengo las tareas del localstorage y las almaceno en una variable
        // JSON.parse: método del navegador que convierte un string en un objeto
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        // una vez tengo las tareas anteriores le agrego las nuevas
        tasks.push(task);
        // las almaceno en el localstorage
        localStorage.setItem('tasks', JSON.stringify(tasks))

    }

    // agrego una tarea sin necesidad de recargar la página
    getTask();

    document.getElementById('formTask').reset();

    e.preventDefault();
}

function getTask(){
    // obtengo las tareas almacenadas en el local storage
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    // obtengo el div con id "tasks" del index.html
    let taskView = document.getElementById('tasks');

    // "limpio" el html
    taskView.innerHTML = '';

    // recorrro el array tasks
    for(let i = 0; i < tasks.length; i++) {
        // pongo en una variable el titulo y descripcion de un elemento del array
        let title = tasks[i].title;
        let description = tasks[i].description;

        // inserto en el html
        // += para que se agregue cada tarea una vez que las recorra 
        taskView.innerHTML += `
        <div class="card mb-3">
            <div class="card-body">
                <p>${title} - ${description}</p>
                <a class="btn btn-danger" onclick="deleteTask('${title}')">Delete</a>
            </div>
        </div>
        `
    }

}

function deleteTask(title){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    
    // recorro las tareas del local storage, si alguno de los titulos ya existen los puede eliminar
    for(let i = 0; i < tasks.length; i++){
        if (tasks[i].title == title) {
            // splice es un metodo que quita un dato del array, del indice i quita 1 dato.
            tasks.splice(i, 1);
        }
    }
    // vuelvo a almacenar los datos con item menos
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // agrego una tarea sin necesidad de recargar la página
    getTask()
}

getTask();