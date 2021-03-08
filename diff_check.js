const csv = require("csv-parser");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
let oldFile = null;
let newFile = null;
let outputFile = null;
let csvWriter = null;
let path = null;
let old_array = [];

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

let readNewFile = () => {
  read(
    newFile,
    (data) => {
      let email = Object.values(data)[1];
      if (old_array.includes(email)) {
        // duplicate
      } else {
        //console.log(email);
        let name = Object.values(data)[0].split(",");
        let head = Object.values(data)[3] + " at " + Object.values(data)[2];
        let row = {
          Email: email,
          FirstName: name[1],
          LastName: name[0],
          Headline: head,
        };
        out.push(row);
      }
    },
    () => {
      //console.log(out);
      write(out);
      //console.log(`Saved ${path}`);
    }
  );
};

let main = () => {
  // Read old file
  read(
    oldFile,
    (data) => {
      let email = Object.values(data)[0];
      /*
      let name = Object.values(data)[0].split(",");
      let head = Object.values(data)[3] + " at " + Object.values(data)[2];
      let row = {
        Email: email,
        FirstName: name[1],
        LastName: name[0],
        Headline: head,
      };*/
      old_array.push(email);
    },
    () => {
      readNewFile();
      //console.log(out);
      //write(out);
      //console.log(`Saved ${path}`);
    }
  );
};

if (process.argv.length < 4) {
  console.log("Please provide input and output file names.");
} else {
  const start = Date.now();
  oldFile = process.argv[2];
  newFile = process.argv[3];
  outputFile = process.argv[4];
  path = start + "_" + outputFile;
  csvWriter = createCsvWriter({
    path: path,
    header: ["Email", "FirstName", "LastName", "Headline"],
  });

  /*
  inputFile = process.argv[2];
  outputFile = process.argv[3];
  const start = Date.now();
  path = start + "_" + outputFile;
  csvWriter = createCsvWriter({
    path: path,
    header: ["Email", "FirstName", "LastName", "Headline"],
  });
  */
  main();
}
