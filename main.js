const d3 = require('d3-dsv');
const https = require('https');

const csvURL = 'https://raw.githubusercontent.com/Wilson-Cal/Giveaway-Tracker/master/50for50.csv';

function getCSV(url, callback) {
    https.get(url, resp => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            callback(null, d3.csvParse(data));
        });
    }).on('error', (err) => {
        callback(err.message, null);
    });
}

function buildArray(csv) {
    let data = [];
    csv.forEach(row => {
        for (let i = 0; i < row.Entries; i++) {
            data.push(row.Followers);
        }
    });
    return data;
}

function scrambleArray(data) {
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }
    return data;
}

function selectWinner(scrambledArray) {
    let randomNumber = Math.floor(Math.random() * (scrambledArray.length));
    console.log(scrambledArray[randomNumber]);
}


// Start Here
getCSV(csvURL, (err, csv) => {
    if (err) {
        console.error(err);
        return;
    }
    let data = buildArray(csv);
    let scrambledArray = scrambleArray(data);
    selectWinner(scrambledArray);
});