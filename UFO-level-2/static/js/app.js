// search input elements
var dateSearch = d3.select('#filter-date');
var citySearch = d3.select('#filter-city');
var stateSearch = d3.select('#filter-stte');
var countrySearch = d3.select('#filter-cnty');
var shapeSearch = d3.select('#filter-shpe');

// initial values & limits
dateSearch.property('value', '');
dateSearch.property('min', minDate(data));
dateSearch.property('max', maxDate(data));

// table columns
var columns = ['datetime', 'city', 'state', 'country', 'shape', 'durationMinutes', 'comments'];

// table body
var tbody = d3.select('tbody');

// populate table with all data
loadTable(data);

// buttons & form
var filterBtn = d3.select('#filter-btn');
var form = d3.select('#filter-frm');
var resetBtn = d3.select('#reset-btn');

//  actions for buttons & form 
filterBtn.on('click', getCriteria);
form.on('submit', getCriteria);
resetBtn.on('click', resetTable);

//-----------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------

// filter the table on the search date value
function getCriteria() {
    
    // prevent page refresh
    d3.event.preventDefault();
    
    // search criteria
    if ( dateSearch.property('value') == '') { var sDate = '' } 
    else { var sDate = new Date(dateSearch.property('value')); }

    var sCity = citySearch.property('value');
    var sState = stateSearch.property('value');
    var sCountry = countrySearch.property('value');
    var sShape = shapeSearch.property('value');

    // filtered data
    var filterData = data.filter( sightings => {  return ( 
            ( sDate == '' ||
              ( new Date(sightings.datetime).getFullYear() == sDate.getFullYear() &&
                new Date(sightings.datetime).getMonth() == sDate.getMonth() &&
                new Date(sightings.datetime).getDate() == sDate.getDate() ) ) &&
            ( sightings.city.toLowerCase() == sCity.toLowerCase() || sCity == '') &&
            ( sightings.state.toLowerCase() == sState.toLowerCase() || sState == '') &&
            ( sightings.country.toLowerCase() == sCountry.toLowerCase() || sCountry == '') &&
            ( sightings.shape.toLowerCase() == sShape.toLowerCase() || sShape == '')
    )   }   );

    // populate table with filtered dataset
    loadTable(filterData);
};

//-----------------------------------------------------------------------------------------------

// reset table with all data
function resetTable() { 
    
    // prevent page refresh 
    d3.event.preventDefault();

    // load all data to table
    loadTable(data); 
    
    // date selector inital value blank
    dateSearch.property('value', '');
    citySearch.property('value', '');
    stateSearch.property('value', '');
    countrySearch.property('value', '');
    shapeSearch.property('value', '');
}

//-----------------------------------------------------------------------------------------------

// adapted from: https://www.tutorialspoint.com/how-to-title-case-a-sentence-in-javascript
function titleCase(string) {
    
    // split sentence
    var sentence = string.toLowerCase().split(' ');

    // change first letter to uppercase
    for(var i = 0; i< sentence.length; i++){
       sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }

    // return assembled sentence
    return sentence.join(' ');
}

//-----------------------------------------------------------------------------------------------

// find earliest date
function minDate(someData) {
    
    // initial value
    var minD = new Date(someData[0].datetime);
 
    // loop through data assigning lowest value
    someData.forEach( sighting => { 
        var thisDate = new Date(sighting.datetime);
        if (minD > thisDate) { minD = thisDate }
    });
    
    // strip date components
    var y = minD.getFullYear();
    var m = ('0' + (minD.getMonth() + 1) ).slice(-2);
    var d = ('0' + minD.getDate()).slice(-2);

    // return date in 'yyyy-mm-dd' format
    return (`${y}-${m}-${d}`);
}

//-----------------------------------------------------------------------------------------------

// find most recent date
function maxDate(someData) {
    
    // initial value
    var maxD = new Date(someData[0].datetime);
    
    // loop through data assigning highest value
    someData.forEach( sighting => { 
        var thisDate = new Date(sighting.datetime);
        if (maxD < thisDate) { maxD = thisDate }
    });

    // strip date components
    var y = maxD.getFullYear();
    var m = ('0' + (maxD.getMonth() + 1) ).slice(-2);
    var d = ('0' + maxD.getDate()).slice(-2);

    // return date in 'yyyy-mm-dd' format
    return (`${y}-${m}-${d}`);
}

//-----------------------------------------------------------------------------------------------