
const baseURL = "https://api.example.com/api/v1";

const taskExample = {
  id: "task_8f31a2",
  title: "Complete React assignment",
  description: "Plan To-Do APIs",
  completed: false,
  createdAt: "2026-10-13T10:00:00Z",
  updatedAt: "2026-10-13T10:00:00Z"
};

const apis = [
  {
    method: "POST",
    path: "/tasks",
    title: "Add Task",
    purpose: "Creates a new task.",
    request: {
      title: "Complete React assignment",
      description: "Plan To-Do APIs"
    },
    response: {
      ...taskExample
    },
    status: "201 Created",
    reason: "POST creates a new resource. The backend validates the title and generates a unique ID, preferably a UUID."
  },
  {
    method: "GET",
    path: "/tasks",
    title: "Get All Tasks",
    purpose: "Returns the complete task list.",
    request: null,
    response: {
      tasks: [taskExample]
    },
    status: "200 OK",
    reason: "GET retrieves data without changing it. The React app uses this endpoint to display all tasks."
  },
  {
    method: "GET",
    path: "/tasks/{id}",
    title: "Get Single Task",
    purpose: "Returns one task by its ID.",
    request: null,
    response: taskExample,
    status: "200 OK",
    reason: "A resource-specific URL lets the frontend retrieve an individual task. An unknown ID returns 404 Not Found."
  },
  {
    method: "PUT",
    path: "/tasks/{id}",
    title: "Update Task",
    purpose: "Updates the editable fields of an existing task.",
    request: {
      title: "Complete API assignment",
      description: "Finish endpoint planning",
      completed: false
    },
    response: {
      ...taskExample,
      title: "Complete API assignment",
      description: "Finish endpoint planning"
    },
    status: "200 OK",
    reason: "PUT replaces the editable representation of a task. The backend preserves its ID and updates updatedAt."
  },
  {
    method: "PATCH",
    path: "/tasks/{id}",
    title: "Update Task Status",
    purpose: "Changes only the completion status.",
    request: {
      completed: true
    },
    response: {
      ...taskExample,
      completed: true
    },
    status: "200 OK",
    reason: "PATCH is useful for partial updates, such as clicking a checkbox to mark a task completed."
  },
  {
    method: "DELETE",
    path: "/tasks/{id}",
    title: "Delete Task",
    purpose: "Removes an existing task.",
    request: null,
    response: null,
    status: "204 No Content",
    reason: "DELETE removes the resource identified by the ID. A successful response does not need a body."
  }
];

const apiList = document.getElementById("api-list");
const apiDetails = document.getElementById("api-details");

function renderAPIs() {
  apiList.innerHTML = "";

  apis.forEach((api, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "api-button";
    button.innerHTML = `
      <span class="method ${api.method}">${api.method}</span>
      <strong>${api.title}</strong>
      <code class="endpoint">${api.method} ${api.path}</code>
    `;

    button.addEventListener("click", () => {
      showDetails(index);
    });

    apiList.appendChild(button);
  });

  showDetails(0);
}

function showDetails(index) {
  const api = apis[index];

  document.querySelectorAll(".api-button").forEach((button, i) => {
    button.classList.toggle("active", i === index);
  });

  const requestBody = api.request
    ? JSON.stringify(api.request, null, 2)
    : "No request body required.";

  const responseBody = api.response
    ? JSON.stringify(api.response, null, 2)
    : "No response body (204 No Content).";

  apiDetails.innerHTML = `
    <span class="method ${api.method}">${api.method}</span>
    <h3>${api.title}</h3>
    <p><strong>Endpoint:</strong>
      <code>${baseURL}${api.path}</code>
    </p>
    <p><strong>Purpose:</strong> ${api.purpose}</p>

    <h4>Request Body</h4>
    <pre></pre>

    <h4>Expected Response — ${api.status}</h4>
    <pre></pre>

    <h4>Reasoning</h4>
    <p>${api.reason}</p>
  `;

  const blocks = apiDetails.querySelectorAll("pre");
  blocks[0].textContent = requestBody;
  blocks[1].textContent = responseBody;
}

document.getElementById("print-btn").addEventListener("click", () => {
  window.print();
});

renderAPIs();