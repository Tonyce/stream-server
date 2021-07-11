const fs = require('fs');

const wriableStream = fs.createWriteStream('./tt')

wriableStream.write("Hey there!")

// fs.writeFile("./tt", "Hey there!", function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
// }); 