
document.addEventListener('DOMContentLoaded', () => {
    const addItemForm = document.getElementById('addItemForm');
    const itemList = document.getElementById('itemList');

    // Function to fetch items and display them
    const fetchAndDisplayItems = async () => {
        try {
            const response = await fetch('/api/items');
            const items = await response.json();

            itemList.innerHTML = ''; // Clear the list

            items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item.name;

                // Add edit and delete buttons
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => editItem(item._id));

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteItem(item._id));

                listItem.appendChild(editButton);
                listItem.appendChild(deleteButton);

                itemList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching items:', error.message);
        }
    };

    // Function to add a new item
    const addItem = async (itemName) => {
        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: itemName }),
            });

            if (response.ok) {
                fetchAndDisplayItems();
            } else {
                const error = await response.json();
                console.error('Error adding item:', error.error);
            }
        } catch (error) {
            console.error('Error adding item:', error.message);
        }
    };

    // Function to edit an item
    const editItem = (itemId) => {
        // Implement the edit functionality
        console.log(`Edit item with ID: ${itemId}`);
    };

    // Function to delete an item
    const deleteItem = async (itemId) => {
        try {
            const response = await fetch(`/api/items/${itemId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchAndDisplayItems();
            } else {
                const error = await response.json();
                console.error('Error deleting item:', error.error);
            }
        } catch (error) {
            console.error('Error deleting item:', error.message);
        }
    };

    // Event listener for the form submission
    addItemForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const itemName = document.getElementById('itemName').value.trim();
        if (itemName) {
            addItem(itemName);
        }
    });

    // Fetch and display items on page load
    fetchAndDisplayItems();
});
