document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);
// document.getElementById('')

function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  const id = Math.floor(Math.random() * 100000000) + "";
  const status = "Open";
  closedClass = "";

  const issue = {
    id,
    description,
    severity,
    assignedTo,
    status,
    closedClass,
  };
  let issues = [];
  if (localStorage.getItem("issues")) {
    issues = JSON.parse(localStorage.getItem("issues"));
  }
  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));

  document.getElementById("issueInputForm").reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const currentIssue = issues.find((issue) => parseInt(issue.id) === id);
  currentIssue.status = "Closed";
  currentIssue.closedClass = "closedClass";

  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
};

const deleteIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const remainingIssues = issues.filter((issue) => issue.id != id);
  localStorage.setItem("issues", JSON.stringify(remainingIssues));
  fetchIssues();
};

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = "";

  let totalIssues;
  let openedIssues;
  if (issues !== null) {
    totalIssues = issues.length;
    openedIssues = issues.filter((issue) => issue.status === "Open").length;

    for (var i = 0; i < issues.length; i++) {
      const {
        id,
        description,
        severity,
        assignedTo,
        status,
        closedClass,
      } = issues[i];

      issuesList.innerHTML += `<div class="well">
                                <h6>Issue ID: ${id} </h6>
                                <p><span class="label label-info"> ${status} </span></p>
                                <h3 class="${closedClass}"> ${description} </h3>
                                <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                                <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                                <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                                </div>`;
    }
  } else {
    totalIssues = 0;
    openedIssues = 0;
  }
  document.getElementById("totalIssue").innerText = totalIssues;
  document.getElementById("openedIssue").innerText = openedIssues;
};
