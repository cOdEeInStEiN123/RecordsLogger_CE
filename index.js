// list of lead links 
let myRecords = [] 
let myCategories = ["all"] 

const recordsLS = JSON.parse(localStorage.getItem("myRecords"))
const categoriesLS = JSON.parse(localStorage.getItem("myCategories"))

const inputEl = document.getElementById("input-el");
const inputNameEl = document.getElementById("inputName-el");
const inputCategoriesEl = document.getElementById("inputCategory-el");
const inputNoteEl = document.getElementById("inputNote-el");

const inputBtn = document.getElementById("input-btn");
const urlBtn = document.getElementById("url-btn");
const exportBtn = document.getElementById("export-btn");
const exportRecordBtn = document.getElementById("exportRecord-btn");
const deleteAllBtn = document.getElementById("deleteAll-btn");

const ulEl = document.getElementById("ul-el");
const pEl = document.getElementById("p-el");
const listEl = document.getElementById("myList");

// Populate from localStorage "myRecords"
if (recordsLS) {
    myRecords = recordsLS
    renderRecords(myRecords)
}

// Populate from localStorage "myCategories"
if (categoriesLS) {
    myCategories = categoriesLS 
    
    // populate  Category dropdown list 
    listEl.options.length = 0
    for (let i = 0; i < myCategories.length; i++) { 
        
        let option = listEl.querySelector('[value="' + myCategories[i] + '"]'); 

        if (option) {

        } else {
            listEl.options[listEl.options.length] = new Option(myCategories[i].trim(), myCategories[i].trim());
        }
    }
    renderRecords(myRecords)
}


// Records renedering function 
function renderRecords(records) {
    let listItems = ""
    ulEl.innerHTML = ""

    for (let i = 0; i < records.length; i++) { 
        listItems += 
        `
            <li>
                <h5> ${ records[i][1] } - ${ records[i][2] } </h5>
                <h6> ${ records[i][3] } </h6>
                <h6> <a href=" ${ records[i][0] } " target='_blank'> ${ records[i][0] } </a></h6>
                <button id='export-btn' value='${records.indexOf(records[i])}' class='BTN' >EXPORT</button>
                <button id='edit-btn' value='${records.indexOf(records[i])}' class='BTN' >EDIT</button>
                <button id='delete-btn' value='${records.indexOf(records[i]) }' class='BTN' >DELETE</button>
                
            </li> 
        `
    }
    ulEl.innerHTML = (listItems)
    inputEl.focus()
}

document.addEventListener('click', function (event) {
        
    if (event.target.matches('#export-btn')) {
        let clickedElem = event.target.value 
        exportFunction(clickedElem)
        renderRecords(myRecords)
    }

    if (event.target.matches('#edit-btn')) {
        let clickedElem = event.target.value 
        editFunction(clickedElem)
        renderRecords(myRecords)
    }

    if (event.target.matches('#delete-btn')) {
        let clickedElem = event.target.value
        deleteFunction(clickedElem)
        renderRecords(myRecords)
    }

}, false)

// Input Button event listener 
inputBtn.addEventListener("click", function() {
    for (let i=0; i < myRecords.length; i++) {
        var inputToLowerCase = myRecords[i][0].includes(inputEl.value.trim().toLowerCase()); }

        if (inputToLowerCase) {
            pEl.textContent = `Record "${ inputEl.value }" is already in the list! You can "Edit" or "Delete" it.`
            inputEl.value = ""
            inputNameEl.value = ""
            inputCategoriesEl.value = ""
            inputNoteEl.value = ""
            inputEl.focus();
        } else if (inputEl.value === "" || inputEl.value === " ") {
            pEl.textContent = "No Record was added! Please type in a Record." 
            inputEl.focus()
        } else {
            myRecords.push([inputEl.value.trim().toLowerCase(), inputNameEl.value.trim(), inputCategoriesEl.value.trim(), inputNoteEl.value.trim()])

            // Saving myRecords to localStorage 
            localStorage.setItem("myRecords", JSON.stringify(myRecords));

            // Category update  
            for (let i=0; i < myCategories.length; i++) {
                var categoriesToLowerCase = myCategories.includes(inputCategoriesEl.value.trim().toLowerCase()) 
            }

            if (categoriesToLowerCase) {
            } else {
                myCategories.push(inputCategoriesEl.value.trim().toLowerCase())
            }

            inputEl.value = ""
            inputNameEl.value = ""
            inputCategoriesEl.value = ""
            inputNoteEl.value = ""
            pEl.textContent = ""

            // Saving myCategories to localStorage 
            localStorage.setItem("myCategories", JSON.stringify(myCategories));

            renderRecords(myRecords)
            inputEl.focus()
                
        // populate  Category dropdown list 
        listEl.options.length = 0
        for (let i = 0; i < myCategories.length; i++) { 
            
            let option = listEl.querySelector('[value="' + myCategories[i] + '"]'); 

            if (option) {
            } else {
                listEl.options[listEl.options.length] = new Option(myCategories[i].trim(), myCategories[i].trim());
            }
        }
    }
})


urlBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs)
        let activeTab = tabs[0].url
    inputEl.value = activeTab
    console.log(inputEl.value)
    inputNameEl.focus()
    }) 
})

// Delete All event listner 
deleteAllBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myRecords = []

    // renderRecords()
    ulEl.innerHTML = ""
    console.log("localStorage value is: ", localStorage)
})

// Category select 
function catFunction() {
    let selectedOption = listEl.value.trim().toLowerCase()
    let listItems = ""
    ulEl.innerHTML = ""
    for (let i = 0; i < myRecords.length; i++) {

        if (selectedOption === myRecords[i][2].toLowerCase()) { 
            listItems += `
                <li>
                    <h5> ${ myRecords[i][1] } - ${ myRecords[i][2] } </h5>
                    <h6> ${ myRecords[i][3] } </h6>
                    <h6> <a href=' ${ myRecords[i][0] } ' target='_blank'> ${ myRecords[i][0] } </a></h6>
                    <button id='export-btn' class='BTN' onclick='exportFunction( ${ (myRecords[i][2]) })'>EXPORT</button>
                    <button id='edit-btn' class='BTN' onclick='editFunction( ${ (myRecords[i][2]) } )'>EDIT</button>
                    <button id='delete-btn' class='BTN' onclick='deleteFunction( ${ (myRecords[i][2]) } )'>DELETE</button>
                </li> `
        } else if (selectedOption == "all") {
            listItems += `
                <li>
                    <h5> ${ myRecords[i][1] } - ${ myRecords[i][2] } </h5>
                    <h6> ${ myRecords[i][3] } </h6>
                    <h6> <a href=' ${ myRecords[i][0] } ' target='_blank'> ${ myRecords[i][0]} </a></h6>
                    <button id='export-btn' class='BTN' onclick='exportFunction( ${ (myRecords.indexOf(myRecords[i])) } )'>EXPORT</button>
                    <button id='edit-btn' class='BTN' onclick='editFunction( ${ (myRecords.indexOf(myRecords[i])) } )'>EDIT</button>
                    <button id='delete-btn' class='BTN' onclick='deleteFunction( ${ (myRecords.indexOf(myRecords[i])) } )'>DELETE</button>
                </li> `
        }
    }
    ulEl.innerHTML = (listItems)
    inputEl.focus()
}

// Edit Button function 
function editFunction(value) {
    let recordIndex = value
    inputEl.value = myRecords[recordIndex][0]
    inputNameEl.value = myRecords[recordIndex][1]
    inputCategoriesEl.value = myRecords[recordIndex][2]
    inputNoteEl.value = myRecords[recordIndex][3]
    deleteFunction(recordIndex)
}

// Delete Button function 
function deleteFunction(value) {
    myRecords.splice(value, 1)
    console.log("Deleted record: ", value)

    // Saving myRecords to localStorage 
    localStorage.setItem("myRecords", JSON.stringify(myRecords))
}

// Export Single Record
function exportFunction(value) {
    let recordIndex = value 
    // CREATE BLOB OBJECT
    var myBlob = new Blob(["Record: ", myRecords[recordIndex][1], "\n", "Category: ", myRecords[recordIndex][2], "\n", "Record Notes: ", myRecords[recordIndex][3], "\n", "Record URL: ", myRecords[recordIndex][0], "\n"], {type: "text/plain"})

    // CREATE DOWNLOAD LINK
    var url = window.URL.createObjectURL(myBlob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = myRecords[recordIndex][1] + ".txt"
        
    // FORCE DOWNLOAD
    anchor.click();
    window.URL.revokeObjectURL(url);
}

// Export list Selected 
exportBtn.addEventListener("click", function() {
    // CREATE BLOB OBJECT
    let blobContent = "" 

    let selectedOption = listEl.value
    let listItemsExport = ""
    ulEl.innerHTML = ""
    for (let i = 0; i < myRecords.length; i++) {

        if (selectedOption === myRecords[i][2].toLowerCase()) { 
            listItemsExport += `
            <li>
                <h5> ${ myRecords[i][1] } - ${ myRecords[i][2] } </h5>
                <h6> ${ myRecords[i][3]} </h6>
                <h6><a href=' ${ myRecords[i][0] } ' target='_blank'> ${ myRecords[i][0] } </a></h6>
            </li> 
            <br>`
        } else if (selectedOption == "all") {
            listItemsExport += `
            <li>
                <h5> ${ myRecords[i][1] } - ${ myRecords[i][2] } </h5>
                <h6> ${ myRecords[i][3] } </h6>
                <h6><a href=" ${ myRecords[i][0] } " target='_blank'> ${ myRecords[i][0] } </a></h6>
            </li> 
            <br>`
        }
    }
    ulEl.innerHTML = (listItemsExport)
    blobContent = ulEl.innerText
    var myBlob = new Blob([blobContent], {type: "text/plain"});

    // CREATE DOWNLOAD LINK
    var url = window.URL.createObjectURL(myBlob);
    var anchor = document.createElement("a");
    anchor.href = url;
    let datetime = Date.now();
    anchor.download = "RL_" + datetime + ".txt";
        
    // FORCE DOWNLOAD
    anchor.click();
    window.URL.revokeObjectURL(url);
    renderRecords(myRecords); 
}) 
