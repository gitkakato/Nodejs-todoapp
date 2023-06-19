const tasksDOM = document.querySelector(".tasks");
const taskFormDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");


// /api/v1/tasksからタスクを読み込む
const showTasks = async () => {
    try {
        //自作のAPIをたたく
        const { data: tasks } = await axios.get("/api/v1/tasks");

        //一つもタスクがないとき
        if(tasks.length < 1 ) {
            tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`;
            return 
        }

        //タスクを出力
        const allTasks = tasks.map((task) => {
            const { _id, completed, name } = task;
            
            return `<div class="single-task ${completed && "task-completed"}">
            <h5><span>
                    <i class="far fa-check-circle"></i>
                </span>${name}</h5>
            <div class="task-links">
                <!-- 編集リンク -->
                <a href="edit.html?id=${_id}" class="edit-link">
                    <i class="fas fa-edit"></i>
                </a>
                <!-- ゴミ箱リンク -->
                <button type="button" class="delete-btn" data-id="${_id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>`
        }).join("");
        tasksDOM.innerHTML = allTasks;
        taskInputDOM.value = "";
    } catch (err) {
        console.log(err);
       
    }
};

showTasks();

//タスクを新規作成
taskFormDOM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = taskInputDOM.value;
    try {
        const task = await axios.post("/api/v1/tasks", {name: name});
        showTasks();
        taskInputDOM.value = "";
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "タスクを追加しました。";
        formAlertDOM.classList.add("text-success");
    } catch (err) {
        console.log(err);
        formAlertDOM.style.display = "block";
        formAlertDOM.classList.remove("text-success");
        formAlertDOM.innerHTML = "無効です。もう一度やり直してください。";
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
    },2000);
});

//タスクの削除
tasksDOM.addEventListener("click", async (event) => {
    const element = event.target;
    if(element.parentElement.classList.contains("delete-btn")) {
        const id = element.parentElement.dataset.id;
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (err) {
            console.log(err);
        }
    }
});