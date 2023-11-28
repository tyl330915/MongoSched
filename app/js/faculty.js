window.onload = function() {
    fetch('/faculty')
        .then(response => response.json())
        .then(data => displayFacData(data))
        .catch(error => console.error('Error:', error));
};

function displayFacData(data) {
    // Select the element where you want to display the data
    const dataElement = document.getElementById('data');

    data.forEach(doc => {
        // Create a new div for each document
        const div = document.createElement('div');

        // Convert the document object to a JSON string for display
        const text = document.createTextNode(JSON.stringify(doc, null, 2));

        // Add the text to the div
        div.appendChild(text);

        // Add the div to the data element
        dataElement.appendChild(div);
    });
    console.log(data);
}