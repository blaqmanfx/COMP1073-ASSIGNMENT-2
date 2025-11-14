document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('smoothieForm');
    const smoothieOutput = document.getElementById('smoothieOutput');
    const fruitCheckboxes = document.querySelectorAll('input[name="fruits"]');

    // Limit fruit selection to 4
    fruitCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedFruits = document.querySelectorAll('input[name="fruits"]:checked');
            
            if (checkedFruits.length > 4) {
                this.checked = false;
                alert('You can only select up to 4 fruits!');
            }
        });
    }); 
 // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate that at least one fruit is selected
        const checkedFruits = document.querySelectorAll('input[name="fruits"]:checked');
        if (checkedFruits.length === 0) {
            alert('Please select at least one fruit!');
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const smoothieOrder = processSmoothieOrder(formData);
        
        // Display the order
        displaySmoothieOrder(smoothieOrder);
        
        // Scroll to output section on mobile
        smoothieOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
