const csv = require("csv-parser");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const inputFile = process.argv[2];
const outputFile = process.argv[3];
const out = [
  {
    Email: "Email",
    FirstName: "FirstName",
    LastName: "LastName",
    Headline: "Headline",
  },
];

const csvWriter = createCsvWriter({
  path: outputFile,
  header: ["Email", "FirstName", "LastName", "Headline"],
});

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
    console.log(row);
    out.push(row);
  },
  () => {
    console.log(out);
    write(out);
  }
);
