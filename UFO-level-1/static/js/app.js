// from data.js
var tableData = data;
var columns = ['datetime', 'city', 'state', 'country', 'shape', 'durationMinutes', 'comments'];

// table body
var tbody = d3.select('tbody');

// append rows 
function tabulate() { 
    tableData.forEach( sighting => {
        var row = tbody.append('tr')
        columns.forEach( column => { 
            row.append('td').text(sighting[column])
        })
    })
};

// load table data 
tabulate();