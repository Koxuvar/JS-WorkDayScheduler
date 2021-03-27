/**
 * displayDay
 * Uses moment to get the current day, date and time and sets the text content of the <p> element with id 'currentDay'
 */
function displayDay()
{
    let rightNow = moment().format('dddd, MMM Do YYYY, h:mm:ss a');
    $('#currentDay').text(rightNow)
}

/**
 * Calls the displayDay function to update the time and date display every second
 */
setInterval(displayDay, 1000);

/**
 * Array of objects to be made into timeblocks
 */
let workHours = [
    {hour:'09 AM',description:' '},
    {hour:'10 AM',description:' '},
    {hour:'11 AM',description:' '},
    {hour:'12 PM',description:' '},
    {hour:'01 PM',description:' '},
    {hour:'02 PM',description:' '},
    {hour:'03 PM',description:' '},
    {hour:'04 PM',description:' '},
    {hour:'05 PM',description:' '}
]

/**
 * makeBlocks()
 * Takes in an array of objects and generates a table to be displayed with those objects
 * @param {Array} arr array of objects to be displayed
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
        let form = $('<textarea/>')
            .attr('name', index)
            .attr('id', 'description')
            .attr('cols', '100%')
            .text(hourObj.description);
        let descSlot = $('<td/>')
            .addClass('description')
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
        
        let saveIcon = $('<i/>')
            .addClass('fas fa-save');
        let saveSlot = $('<td/>')
            .addClass('saveBtn')
            .attr('id', 'save-button')
            .append(saveIcon);

        table.append(row.append(hourSlot, descSlot, saveSlot));
    })

    return $('#timeblock-container').append(table);
}

/**
 * storeBlocks
 * takes a given array and stores it in local storage under the key 'time-blocks'
 * @param {Array} arr 
 */
function storeBlocks(arr)
{
    localStorage.setItem('time-blocks', JSON.stringify(arr));
}

/**
 * getBlocks
 * retrieves the array stored in the 'time-blocks' key in local storage
 * @returns array stored at key 'time-blocks' in local storage
 */
function getBlocks()
{
    let arrLocSt = JSON.parse(localStorage.getItem('time-blocks'));
    if(arrLocSt != null)
    {
        workHours = arrLocSt;
    }
    return arrLocSt;
}

/**
 * Event Listener for a click on the save button td to then take whats in the text area and store it to the array 'workHours'
 * the array is then stored to local storage
 */
$("body").on("click", "#save-button", e => {
    const targetTest = e.target.nodeName === 'TD';

    let descBox = targetTest ? e.target.previousSibling.firstElementChild : e.target.parentElement.previousSibling.firstElementChild;
    let index = descBox.name;

    workHours[index].description = descBox.value;
    storeBlocks(workHours);
});

/**
 * when document is ready, first check if an array is already stored in local storage and then use it or use the blank template arr to make the table
 * calls displayDay once so page doesnt wait 1 second before displaying day date and time.
 */
$(function()
{
    if(getBlocks())
    {
        makeBlocks(getBlocks());
    }
    else
    {
        makeBlocks(workHours);
    }
    
    displayDay();
});


