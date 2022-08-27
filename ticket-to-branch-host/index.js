const { exec } = require("child_process");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const port = 10101;

app.post("/", (req, res) => {
  exec(
    `cd ${req.body.pathToRepo} && git checkout -b ${req.body.branchName} master`
  );
  res.json([req.body]);
});

app.listen(port, () => {
  console.log(
    `Host for ticket-to-branch Chrome extension is listening on port ${port}`
  );
});
