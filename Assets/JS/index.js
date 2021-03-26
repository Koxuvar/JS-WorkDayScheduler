
let rightNow; //global variable to keep track of time

/**
 * displayDay
 * Uses moment to get the current day, date and time and sets the text content of the <p> element with id 'currentDay'
 * Also Updates the global variable rightNow for use in other functions
 */
function displayDay()
{
    rightNow = moment().format('dddd, MMM Do YYYY, h:mm:ss a');
    $('#currentDay').text(rightNow)
}

/**
 * Calls the displayDay function to update the time and date display every second
 */
setInterval(displayDay, 1000);

/**
 * Array of objects to be made into timeblocks
 */
const workHours = [
    {hour:'9 AM',description:' '},
    {hour:'10 AM',description:' '},
    {hour:'11 AM',description:' '},
    {hour:'12 PM',description:' '},
    {hour:'1 PM',description:' '},
    {hour:'2 PM',description:' '},
    {hour:'3 PM',description:' '},
    {hour:'4 PM',description:' '},
    {hour:'5 PM',description:' '}
]

/**
 * makeBlocks()
 * Takes in an array of objects and generates a table to be displayed with those objects
 * @param {Array} arr array of objects to be displayed
 * @returns 
 */
function makeBlocks(arr)
{
    let table = $('<table/>').addClass('time-block table');
    $.each(arr, function(index, hourObj)
    {
        let row = $('<tr/>')
            .addClass('row')
            .attr('scope', 'row');
        let hourSlot = $('<td/>')
            .text(hourObj.hour)
            .addClass('hour');
        let form = $('<input/>');
        let descSlot = $('<td/>')
            .text(hourObj.description)
            .addClass('description')
            .attr('data-desc-index', index)
            .append(form);
        
        const timeCheck = moment().diff(moment(hourObj.hour, 'h a'), 'minutes');
        
        if(timeCheck > 60)
        {
            descSlot.addClass('past');
        }
        else if(timeCheck < 60 && timeCheck >= 0)
        {
            descSlot.addClass('present');
        }
        else
        {
            descSlot.addClass('future');
        }
        
        let saveSlot = $('<td/>')
            .addClass('saveBtn')
            .append('<i/>')
            .addClass('fas fa-save');

        table.append(row.append(hourSlot, descSlot, saveSlot));
    })

    return $('#timeblock-container').append(table);
}

makeBlocks(workHours);
