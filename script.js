var temp = document.getElementById("cont");

function add() {
    var x = document.getElementById("input");

    if (x.value.trim() !== "") { // Prevent empty input
        var list = document.createElement("ol");
        var node = document.createElement('li');
        var span = document.createElement('span');

        span.innerHTML = '&#10006'; // Cross mark for deletion
        span.classList.add('delete-btn'); // Class for styling

        node.append(x.value);
        list.appendChild(node);
        list.appendChild(span); // Append span to the list item

        temp.appendChild(list);
        save(); // Save to localStorage
    } else {
        alert("Please provide input");
    }

    x.value = ""; // Clear input
}

temp.addEventListener('click', function(e) {
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); // Remove the list item
        save();
    }
});

function save() {
    localStorage.setItem('data', temp.innerHTML); // Save to localStorage
}

function display() {
    temp.innerHTML = localStorage.getItem('data'); // Load from localStorage
}

document.getElementById('input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        add(); // Trigger add on pressing Enter
    }
});

// Function to filter tasks based on search query and return the first matching task
function filterTasks() {
    var searchValue = document.getElementById('search').value.toLowerCase();
    var tasks = document.querySelectorAll('ol li'); // Select all task items

    let firstMatch = null;

    tasks.forEach(function(task) {
        var listItem = task.parentElement; // Get the <ol> containing the task

        if (task.textContent.toLowerCase().includes(searchValue)) {
            if (!firstMatch) {
                firstMatch = listItem; // Store the first matching task
            }
        }
    });

    return firstMatch; // Return the first matched task (or null if no match)
}

// Scroll to and focus on the first matching task when pressing Enter in the search box
document.getElementById('search').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        var firstMatch = filterTasks(); // Get the first matching task

        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth' }); // Scroll to the first match
            firstMatch.classList.add('focus-task'); // Add the focus styling
            setTimeout(() => {
                firstMatch.classList.remove('focus-task'); // Remove the focus styling
                document.getElementById('search').value = ''; // Clear the search input
            }, 2000); // Delay of 2 seconds
        } else {
            alert('No matching tasks found');
        }
    }
});

// Clear all tasks
function clearAll() {
    if (confirm('Are you sure you want to clear all tasks?')) {
        temp.innerHTML = ''; // Clear the task container
        save(); // Save the empty state to localStorage
    }
}

// Initialize display on page load
display();

