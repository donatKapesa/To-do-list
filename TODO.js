var input = document.getElementsByTagName("input")[0];

// everytime I add a new item, need to manually change input

function addItem (event) {
    if(event.key === 'Enter') {

        toDoItems = document.getElementsByClassName("todo-item");
        var text = event.target.value;
        itemNumber = this.getAttribute("itemNumber");

        // add class 'toDoShowing to .parentElement.parentElement
        this.parentElement.parentElement.classList.add('toDoShowing'); // bit tricky if I add HTML and might need to change the number of times I add .parentElement
        this.outerHTML = '<p>' + text + '</p>'

        var lastToDoItem = toDoItems[toDoItems.length - 1];

        var newDiv = document.createElement("div");
        newDiv.setAttribute('class', 'todo-item');

        // adding new div in the end
        lastToDoItem.parentElement.insertBefore(newDiv, lastToDoItem.nextSibling);
        var x = Number(itemNumber) + 1;
        var n = x.toString();
        newDiv.innerHTML = ''+
            '<button class="plus-button plus-button--small"></button>'+
                '<span>'+
                    '<input type="filled" itemNumber=' + n + ' placeholder="Enter something to do"></input>'+ // FIX THIS LINE
                '</span>';


        // call event listener again cause we created a new div
        var newInput = document.getElementsByTagName("input")[0];
        newInput.addEventListener('keydown', addItem);

    }

}

input.addEventListener('keydown', addItem);


// Now taking care of completing items
// everytime DOM changes, update
function timeOut(func) {
    setTimeout(func, 2000)
}

function onClickHandler() { // can't use arrow fn because 'this' will refer to window object
    var toRemove = this.querySelector('span p');
    var text = toRemove.innerText;
    toRemove.innerHTML = '<s>' + text + '</s>';

    // add a 2 second delay
    // console.log(this);
    var self = this;
    // console.log(self);
    window.setTimeout(function() {self.style.display = 'none'}, 1000); // why doesn't it work when I use 'this' instead of p
} // try to do this by changing toDoShowing to toDoHidden and adding a transition delay through CSS






toDoShowings = document.getElementsByClassName('toDoShowing');

// Select the node that will be observed for mutations
// var targetNode = document.getElementsByClassName('toDoShowing');
var targetNode = document.getElementById('todo-list');

// Options for the observer (which mutations to observe)
var config = { 
    attributes: false, 
    childList: true, 
    subtree: true };

// Callback function to execute when mutations are observed
var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'childList') {
            // console.log('A child node has been added or removed.');
            for(let i = 0; i < toDoShowings.length; i++) {
                toDoShowings[i].addEventListener('click', onClickHandler);
            }
        }
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);