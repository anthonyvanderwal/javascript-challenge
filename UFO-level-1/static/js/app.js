// date selector
var dateControl = d3.select('#filter-dte');

// date selector defualts
dateControl.property('value', '2010-01-01');
dateControl.property('min', '2010-01-01');
dateControl.property('max', '2010-01-13');

// table columns
var columns = ['datetime', 'city', 'state', 'country', 'shape', 'durationMinutes', 'comments'];

// table body
var tbody = d3.select('tbody');

// populate table with all data
loadTable(data);

// reference button & form
var filterBtn = d3.select('#filter-btn');
var form = d3.select('#filter-frm');
var resetBtn = d3.select('#reset-btn');

//  associate button & form events with an action 
filterBtn.on('click', getDate);
form.on('submit', getDate);
resetBtn.on('click', resetTable);

// filter the table on the search date value
function getDate() {
    
    // prevent page refresh
    d3.event.preventDefault();
    
    // search date
    var searchDate = new Date(dateControl.property('value'));
 
    // data subset
    var filterData = data.filter( sightings => { return (
        new Date(sightings.datetime).getFullYear() == searchDate.getFullYear() &&
        new Date(sightings.datetime).getMonth() == searchDate.getMonth() &&
        new Date(sightings.datetime).getDate() == searchDate.getDate()
    ) } );

    // populate table with filtered dataset
    loadTable(filterData);
};

// populate the table
function loadTable (someData) {
    
    // clear the table
    tbody.text('');

    // loop through each piece of data
    someData.forEach( sighting => {
    
        // append a row for each piece of data
        var row = tbody.append('tr')
        columns.forEach( column => {
    
            // insert cells in each row with formatted data
            if ( column == 'datetime' ) { 
                row.append('td').text(
                    new Date(sighting[column]).getFullYear() + '-' +
                    new Date(sighting[column]).getMonth() + 1 + '-' +
                    ('0' + new Date(sighting[column]).getDate()).slice(-2)
                ) } 
            else if ( column == 'city' ) { row.append('td').text(titleCase(sighting[column])) }
            else if ( column == 'state' ) { row.append('td').text(sighting[column].toUpperCase()) }
            else if ( column == 'country' ) { row.append('td').text(sighting[column].toUpperCase()) }
            else { row.append('td').text(sighting[column]) }
        })
    });
}

// reset table with all data
function resetTable() { 
    d3.event.preventDefault();
    loadTable(data); 
}


// adapted from: https://www.tutorialspoint.com/how-to-title-case-a-sentence-in-javascript
function titleCase(string) {
    var sentence = string.toLowerCase().split(' ');
    for(var i = 0; i< sentence.length; i++){
       sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(' ');
}





minDate(data);
// find earliest date in the data
function minDate(someData) {
    someData.forEach( sighting => { console.log( new Date(sighting.datetime) )  });
    // console.log(`${mD.getFullYear()} - ${mD.getMonth() + 1} - ${0 + mD.getDate()}`);
    // return mD;
}
