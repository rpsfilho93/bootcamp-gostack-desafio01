const express = require("express");

const server = express();

server.use(express.json());

projects = [];
num_req = 0;

server.use((req, res, next) => {
  num_req++;
  console.log(`Number of Requisitions: ${num_req}`);
  next();
});

function checkId(req, res, next) {
  for (project of projects) {
    if (project.id == req.params.id) {
      return next();
    }
  }
  return res.status(400).json({ error: "Id not found." });
}

//Add new project.
server.post("/projects", (req, res) => {
  const newProj = {
    id: req.body.id,
    title: req.body.title,
    tasks: []
  };

  projects.push(newProj);
  return res.json(newProj);
});

//Return all projects.
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//Change project title.
server.put("/projects/:id", checkId, (req, res) => {
  for (project of projects) {
    if (project.id == req.params.id) {
      project.title = req.body.title;
      return res.json(project);
    }
  }
});

//Delete project.
server.delete("/projects/:id", checkId, (req, res) => {
  index = 0;
  for (project of projects) {
    if (project.id == req.params.id) {
      projects.splice(index, 1);
      return res.send();
    }
    index++;
  }
});

//Add new task.
server.post("/projects/:id/tasks", checkId, (req, res) => {
  for (project of projects) {
    if (project.id == req.params.id) {
      project.tasks.push(req.body.title);
      return res.json(project);
    }
  }
});

server.listen(3000);
