#!/usr/bin/env node
const fs = require('fs');
const { stdin } = require('process');

const readline = require('readline');


// read new file in Controllers


const readConsole = readline.createInterface({
  input: stdin,
  output: process.stdout,
});
// let consoleinput = "";

async function ReadUpdateController(someName) {
  let exportsfile = []
  fs.readdirSync('./src/core/controllers/Admin').forEach(file => {



    let newValue = file.replace(/^\./gim, '');
    let newstr = newValue.replace('.ts', "");
    let newexport = `export * from './Admin/${newstr}'`
    exportsfile.push(newexport)
    // fs.writeFile('./src/core/controllers/index.ts', newexport, (err) => {
    //   console.log(err)
    // })
  });
  let fileReadController = fs.createReadStream('./src/core/controllers/index.ts',);

  fileReadController.on('error', function (err) {
  })
  const rl = readline.createInterface({
    input: fileReadController,
    crlfDelay: 1
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let readlineFile = []
  for await (const line of rl) {
    readlineFile.push(line)
  }


  exportsfile.map((data, index) => {
    if (data != readlineFile[index]) {
      fileWriteController.write(`\n` + data);
    } else {
      console.log(`Line from file: ${data}`);
    }
  })

  console.log(someName)
}

async function MakeController(controllername, foldername) {
  let constrollervalue =
    `import { Request, Response } from "express"; \n\r
    \rexport class ${controllername} {
      \r static index = async (req: Request, res: Response) => { 
        \r // yout code .... 
      \r };
  \r}
  `

  fs.appendFile(`./src/core/controllers/${foldername ? foldername + '/' + controllername + '.ts' : controllername + '.ts'}`, constrollervalue, function (err) {
    if (err) throw err;
    ExportController(controllername)
    console.log(`Create ${controllername} fo controller is completed`);
  });
}

async function ExportController(exportstring) {

  let newexport = `export * from './Admin/${exportstring}'`
  let fileReadController = fs.createReadStream('./src/core/controllers/index.ts',);

  fileReadController.on('error', function (err) { })


  // write file index in controller
  let fileWriteController = fs.createWriteStream('./src/core/controllers/index.ts', { flags: 'a', });

  fileWriteController.on('error', function (err) { /* error handling */ });

  const rl = readline.createInterface({
    input: fileReadController,
    crlfDelay: 1
  });
  let readlineFile = []
  for await (const line of rl) {
    readlineFile.push(line)
    console.log(line)
  }

  if (readlineFile.lastIndexOf(newexport) < 0) {
    fileWriteController.write(`\n` + newexport);
  } else {
    readConsole.close()
  }
}


const consoleCommand = process.argv.slice(2);

switch (consoleCommand[0]) {
  case 'make':
    switch (consoleCommand[1]) {
      case 'controller':
        switch (consoleCommand[2]) {
          case '-f':
            MakeController(consoleCommand[5], consoleCommand[3]) // -f file name
            break
          case '-n':
            MakeController(consoleCommand[3], consoleCommand[5])
            break
          default:
            MakeController(consoleCommand[2])
            readConsole.close()
        }
        readConsole.close()
        break
      default:
        console.log('Sorry, that is not something I know how to do.');
        readConsole.close()

    }
    break;
  default:
    console.log('Sorry, that is not something I know how to do.');
    readConsole.close()

}


