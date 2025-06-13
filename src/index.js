let submitbtn = document.getElementById('submit');
let form = document.forms.form;
let table = document.getElementById('table');


submitbtn.addEventListener('click', (e) => {
    e.preventDefault();

    let newRow = table.insertRow(-1);
    
    let date = `${new Date().getDate()}, ${new Date().getMonth() + 1}, ${new Date().getFullYear()} ; ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    
    const select = document.createElement('select');
    select.appendChild(new Option('attend'));
    select.appendChild(new Option('not attend'));

    let deleter = document.createElement('button');
    deleter.textContent = 'del';

    newRow.insertCell(0).textContent = form.elements.name.value;
    newRow.insertCell(1).textContent = form.elements.relationship.value;
    newRow.insertCell(2).textContent = date;
    newRow.insertCell(3).appendChild(select);
    newRow.insertCell(4).appendChild(deleter);

    deleter.addEventListener('click' , () => {
        table.deleteRow(newRow.rowIndex)
    });
})