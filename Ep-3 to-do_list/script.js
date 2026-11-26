
function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");

    // Create checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Create task text
    let span = document.createElement("span");
    span.textContent = taskText;

    checkbox.addEventListener("change", function() {
        span.style.textDecoration =
            checkbox.checked ? "line-through" : "none";
    });

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = function() {
        li.remove();
    };

    // Move Up button
    let upBtn = document.createElement("button");
    upBtn.textContent = "↑";

    upBtn.onclick = function() {
        let previous = li.previousElementSibling;

        if (previous) {
            li.parentNode.insertBefore(li, previous);
        }
    };

    // Move Down button
    let downBtn = document.createElement("button");
    downBtn.textContent = "↓";

    downBtn.onclick = function() {
        let next = li.nextElementSibling;

        if (next) {
            li.parentNode.insertBefore(next, li);
        }
    };

    // Add elements to list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(upBtn);
    li.appendChild(downBtn);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}
