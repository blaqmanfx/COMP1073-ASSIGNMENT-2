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

