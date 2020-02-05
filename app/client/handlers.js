function addTable(body) {
    fetch("http://localhost:8010/proxy/board/add", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(response => response.json());
}

function removeBoard(body) {
    fetch("http://localhost:8010/proxy/board/remove", {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(response => response.json());
}

function createTable(value) {
    const { name, color, description } = value;

    const container = document.querySelector(".content-container");
    const table = document.createElement("div");
    const tableName = document.createElement("span");
    const removeButton = document.createElement("button");
    const tableDescription = document.createElement("span");

    table.className = "table-block";
    table.style.background = color;
    tableName.className = "table-block__title";
    tableName.innerHTML = name;
    tableDescription.innerHTML = description;
    removeButton.addEventListener("click", () => {
        removeBoard({ name });
    });

    table.appendChild(tableName);
    table.appendChild(tableDescription);
    table.appendChild(removeButton);

    container.appendChild(table);
}

function boardList() {
    fetch("http://localhost:8010/proxy/board").then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.map(item => createTable(item));
            } else {
                createTable("List of boards is empty!");
            }
        });
}


function getTanle() {
    fetch("http://localhost:8010/proxy").then(response => response.json())
        .then(data => {
            data.map(item => createTable(item));
        });
}

const addButton = document.querySelector(".content-container__add-button");
addButton.addEventListener("click", () => {
    const name = document.querySelector(".content-container__new-name");
    const color = document.querySelector(".content-container__new-color");
    const description = document.querySelector(".content-container__new-description");

    addTable({
        name: name.value,
        color: color.value,
        description: description.value
    });
});

const loadButton = document.querySelector(".content-container__load-button");
loadButton.addEventListener("click", boardList);

getTanle();
