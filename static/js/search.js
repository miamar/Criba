const tabs = document.querySelectorAll('.tabs_bar .tab');

tabs.forEach(clickedTab => {
    // Add onClick event listener on each tab
    clickedTab.addEventListener('click', () => {
        // Remove the active class from all the tabs (this acts as a "hard" reset)
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Add the active class on the clicked tab
        clickedTab.classList.add('active');

        // Get the ID of the associated content div
        const contentId = clickedTab.getAttribute('href');

        // Show the associated content div
        const contentDiv = document.querySelector(contentId);
        contentDiv.classList.add('show');

        // Hide other content divs
        tabs.forEach(tab => {
            const otherContentId = tab.getAttribute('href');
            if (otherContentId !== contentId) {
                const otherContentDiv = document.querySelector(otherContentId);
                otherContentDiv.classList.remove('show');
            }
        });
    });
});


// Get the checkbox and the table cells containing the "Cartella" column
const checkbox = document.querySelector('.form-check-input.cartella');
const cartellaTHead = document.querySelector('.cartella-column');
const cartellaCells = document.querySelectorAll('.cell-cartella');

// Add an event listener to the checkbox
checkbox.addEventListener('change', () => {
    // If the checkbox is checked, hide the "Cartella" column cells
    if (checkbox.checked) {
        cartellaCells.forEach(cell => {
            cell.style.display = '';
        });

        cartellaTHead.classList.remove('hidden-column');

    } else {
        // If the checkbox is unchecked, show the "Cartella" column cells
        cartellaCells.forEach(cell => {
            cell.style.display = 'none';
        });

        cartellaTHead.classList.add('hidden-column');
        
    }
});




