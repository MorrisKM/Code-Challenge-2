let submitbtn = document.getElementById('submit');
let form = document.forms.form;
let table = document.getElementById('table');

//first we render the existing entries to the table.
let guests = JSON.parse(localStorage.getItem('guestList')) || []; //creates a new array if no guestList is found
filltable()//calls the function to render the table (give the table data)

//handle the input to save to the guest array
submitbtn.addEventListener('click', (e) => {
    e.preventDefault(); //prevents the default submit action 

    let nameInput = form.elements.name.value.trim(); //gets name value from the input element
    let relationshipInput = form.elements.relationship.value.trim();

    if (guests.length >= 10) { //limits the entries to 10  
        alert('list is full');
        return;
    }
    if (!nameInput) { //validate if the user has added a name 
        alert('input name to add');
        return;
    }
    if (guests.find(guest => guest.name.toLowerCase() === nameInput.toLowerCase())) { //checks if name already exists
        alert('guest already exists');
        return;
    }

    //create a new object to handle the input
    const newGuest = {
        name : nameInput,
        relationship : relationshipInput,
        date: `${new Date().getDate()}, ${new Date().getMonth() + 1}, ${new Date().getFullYear()} ; ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        attendance: 'attend'
    }

    guests.push(newGuest); //adds the newGuest object ot the guests array
    savetoLocalStorage(); //saves the data to the local storage
    filltable();
    form.reset(); //resets the form 
});

//saves the entries in guest to the local storage
function savetoLocalStorage() { //local storage stores data in quotes (as strings) thus the JSON (JavaScript Object Notation: format to represent values and objects) method call.
    localStorage.setItem('guestList', JSON.stringify(guests));
}

//this function filltable updates the values of the table row by row from the guests array
function filltable() {
    while(table.rows.length > 1) table.deleteRow(1); //clears the previous table on load.

    guests.forEach((guest, index) => { //used forEach method to get individual entries(objects) and their indexes 
        let newRow = table.insertRow(-1); //creates a new row for each entry 

        newRow.insertCell(0).textContent = guest.name;
        newRow.insertCell(1).textContent = guest.relationship;
        newRow.insertCell(2).textContent = guest.date;

        //attendance select
        let select = document.createElement('select');
        select.appendChild(new Option ('attend', 'attend'));
        select.appendChild(new Option('not attend', 'notAttend'));
        select.value = guest.attendance;
        select.classList.add('select');
        //this eventlistner updates the value of attendance when changed by the select
        select.addEventListener('change', () => {
            guest.attendance = select.value;
            savetoLocalStorage()
        });
        newRow.insertCell(3).appendChild(select);

        //delete button
        let deleter = document.createElement('img');
        deleter.setAttribute('src', 'src/trash3.svg');
        deleter.classList.add('deleter');
        //deletes the row once clicked
        deleter.addEventListener('click', () => {
            guests.splice(index, 1)
            savetoLocalStorage();
            filltable();
        });
        newRow.insertCell(4).appendChild(deleter);

        //this changes the color of the relationship text according to value passed
        let tags = newRow.children[1]
        if(guest.relationship === 'friend') {
            tags.style.color = 'blue'
        }else if(guest.relationship === 'family') {
            tags.style.color = 'aqua'
        }else{
            tags.style.color = 'greenyellow'
        }
    });
}
// this filters the guest that are attending and not attending and displays them in the paragraph element.
let logAttending = document.getElementById('attending');
let logNotAttending = document.getElementById('notAttending');

const attendingGuests = guests.filter(guest => guest.attendance === 'attend').map(guest => guest.name);
const notAttendingGuests = guests.filter(guest => guest.attendance === 'notAttend').map(guest => guest.name) 

logAttending.textContent = `Attending guests: ${attendingGuests.join(', ')}`
logNotAttending.textContent = `Guests not attending: ${notAttendingGuests.join(', ')}`