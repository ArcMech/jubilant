import express from "express";
import path from "path";
const app = express();
const port = 8080;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render(path.join(__dirname + "/views/protocole"), {
    name: "Jane Doe",
    projects: [
      {
        name: "DataProject",
        tasks: [],
      },
      {
        name: "PepeProject",
        tasks: [
          {
            name: "Implement mega ultra feature",
          },
        ],
      },
    ],
  });
});

// Need to think about passing data through request
// schema should contain data like:
// generate_date
// full_name
// month_start
// month_end
// hours
// wage_per_hour
// api_key from evernote

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export {};
