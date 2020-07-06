//document.getElementById("main-content").addEventListener("load", fetchBugs);
const fetchBugs = () => {
  let bugs = JSON.parse(localStorage.getItem("bugs"));
  let bugList = $("#bug-list");

  bugList.html("");

  bugs.forEach((bug) => {
    let id = bug.id;
    let summary = bug.summary;
    let description = bug.description;
    let priority = bug.priority;
    let assignment = bug.assignment;
    let status = bug.status;

    bugList.html(
      bugList.html() +
        '<div class="card bug-card">' +
        '<div class="card-body">' +
        "<h6>Bug ID: " +
        id +
        "</h6>" +
        (status === "Open"
          ? '<p><span class="status badge badge-success">'
          : '<p><span class="badge badge-danger">') +
        status +
        "</span></p>" +
        "<h3>" +
        summary +
        "</h3>" +
        '<p class="card-text">' +
        description.replace(/\r\n|\r|\n/g, "</br>") +
        "</p>" +
        '<p><span class="fas fa-hourglass-half"></span><strong> Priority:</strong> ' +
        priority +
        "</p>" +
        '<p> <span class="fas fa-user"></span><strong> Assigned to:</strong> ' +
        assignment +
        "</p>" +
        '<a href="#" class="btn close-bug-btn" onclick="setStatusClosed(\'' +
        id +
        "')\">" +
        '<span class="fas fa-times-circle"></span> Close</a>' +
        '<a href="#" class="btn delete-bug-btn" onclick="deleteBug(\'' +
        id +
        "')\">" +
        '<span class="fas fa-trash"></span> Delete</a>' +
        "</div>" +
        "</div>"
    );
  });
};

const saveBug = (event) => {
  let bugId = chance.guid();
  let bugSummary = $("#bug-summary").val();
  let bugDescription = $("#bug-description").val();
  let bugPriority = $("#bug-priority").val();
  let bugAssignment = $("#bug-assignment").val();
  let bugStatus = "Open";
  let bug = {
    id: bugId,
    summary: bugSummary,
    description: bugDescription,
    priority: bugPriority,
    assignment: bugAssignment,
    status: bugStatus,
  };

  let bugs = JSON.parse(localStorage.getItem("bugs"));

  if (!bugs) {
    bugs = [];
  }

  bugs.push(bug);

  document.getElementById("new-bug-form").reset();

  setBugs(bugs);

  event.preventDefault();
};

const setStatusClosed = (id) => {
  let bugs = JSON.parse(localStorage.getItem("bugs"));

  bugs.forEach((bug) => {
    if (bug.id == id) {
      bug.status = "Closed";
    }
  });

  setBugs(bugs);
};

const deleteBug = (id) => {
  let bugs = JSON.parse(localStorage.getItem("bugs"));

  for (let i = 0; i < bugs.length; i++) {
    if (bugs[i].id == id) {
      bugs.splice(i, 1);
    }
  }

  localStorage.setItem("bugs", JSON.stringify(bugs));

  fetchBugs();
};

const setBugs = (bugs) => {
  localStorage.setItem("bugs", JSON.stringify(bugs));

  fetchBugs();
};

$(document).ready(fetchBugs);
$("#new-bug-form").submit(saveBug);
