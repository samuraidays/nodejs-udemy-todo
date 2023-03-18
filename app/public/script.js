const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form")
const taskInputDOM = document.querySelector(".task-input")

const showTasks = async () => {
    try {
        const { data: tasks } = await axios.get("/api/v1/tasks")

        const allTasks = tasks.map((task) => {
            const { completed, _id, name } = task;
            return `<div class="single-task">
            <h5>
                <span><i class="far fa-check-circle"></i></span>${name}
            </h5>
            <div class="task-links">
            <a href="#" class="edit-link">
                <i class="fas fa-edit"></i>
            </a>
            <button type="button" class="delete-btn"></button>
                <i class="fas fa-trash"></i>
            </div>
        </div>`;
        }).join("");
        tasksDOM.innerHTML = allTasks;
    } catch (err) {
        console.log(err)
    }
};

showTasks();

formDOM.addEventListener("submit", async(event) => {
    event.preventDefault();
    const name = taskInputDOM.value;
    try {
        await axios.post("/api/v1/tasks", { name: name } );
        showTasks();
        taskInputDOM.value = "";
    } catch (error) {
        console.log(err)
    }
})