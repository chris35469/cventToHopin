const csv = require("csv-parser");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
let inputFile = null;
let outputFile = null;
let csvWriter = null;
let path = null;

const out = [
  {
    Email: "Email",
    FirstName: "FirstName",
    LastName: "LastName",
    Headline: "Headline",
  },
];

const write = (record) => {
  csvWriter
    .writeRecords(record) // returns a promise
    .then(() => {
      //console.log('...Done');
    });
};

function read(file, onData, onEnd) {
  fs.createReadStream(file).pipe(csv()).on("data", onData).on("end", onEnd);
}

let main = () => {
  read(
    inputFile,
    (data) => {
      let email = Object.values(data)[3];
      let name = Object.values(data)[0].split(",");
      let head = Object.values(data)[2] + " at " + Object.values(data)[1];
      let row = {
        Email: email,
        FirstName: name[1],
        LastName: name[0],
        Headline: head,
      };
      out.push(row);
    },
    () => {
      write(out);
      console.log(`Saved ${path}`);
    }
  );
};

if (process.argv.length < 4) {
  console.log("Please provide input and output file names.");
} else {
  inputFile = process.argv[2];
  outputFile = process.argv[3];
  const start = Date.now();
  path = start + "_" + outputFile;
  csvWriter = createCsvWriter({
    path: path,
    header: ["Email", "FirstName", "LastName", "Headline"],
  });

  main();
}
