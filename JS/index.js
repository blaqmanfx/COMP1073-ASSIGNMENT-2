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

    // Function to process smoothie order
        function processSmoothieOrder(formData) {
            const size = document.getElementById('size');
            const base = document.getElementById('base');
            const sweetener = document.getElementById('sweetener');
           
            
             // Get selected options with prices
        const sizeOption = size.options[size.selectedIndex];
        const baseOption = base.options[base.selectedIndex];
        const sweetenerOption = sweetener.options[sweetener.selectedIndex];
        
        // Calculate base price
        let totalPrice = parseFloat(sizeOption.dataset.price);
        totalPrice += parseFloat(baseOption.dataset.price);

        // Get fruits
        const fruits = [];
        document.querySelectorAll('input[name="fruits"]:checked').forEach(fruit => {
            fruits.push({
                name: capitalizeWords(fruit.value),
                price: parseFloat(fruit.dataset.price)
            });
            totalPrice += parseFloat(fruit.dataset.price);
        });
        
        // Get boosts
        const boosts = [];
        document.querySelectorAll('input[name="boosts"]:checked').forEach(boost => {
            boosts.push({
                name: capitalizeWords(boost.value),
                price: parseFloat(boost.dataset.price)
            });
            totalPrice += parseFloat(boost.dataset.price);
        });

         // Add sweetener price if not "none"
        if (sweetener.value !== 'none') {
            totalPrice += parseFloat(sweetenerOption.dataset.price);
        }
        
        // Get ice level
        const iceLevel = document.querySelector('input[name="ice"]:checked').value;

          // Get customer name
        const customerName = formData.get('customerName');
        
        return {
            customerName: customerName,
            size: capitalizeWords(size.value),
            sizePrice: parseFloat(sizeOption.dataset.price),
            base: capitalizeWords(base.value),
            basePrice: parseFloat(baseOption.dataset.price),
            fruits: fruits,
            boosts: boosts,
            sweetener: sweetener.value === 'none' ? 'None' : capitalizeWords(sweetener.value),
            sweetenerPrice: sweetener.value === 'none' ? 0 : parseFloat(sweetenerOption.dataset.price),
            iceLevel: capitalizeWords(iceLevel),
            totalPrice: totalPrice
        };
    }

    // Display the smoothie order
    function displaySmoothieOrder(order) {
        const fruitsList = order.fruits.map(f => `${f.name} (+$${f.price.toFixed(2)})`).join(', ');
        const boostsList = order.boosts.length > 0 
            ? order.boosts.map(b => `${b.name} (+$${b.price.toFixed(2)})`).join(', ')
            : 'None';
        
        const orderHTML = `
            <div class="smoothie-details">
                <h3>🥤 Order for: ${order.customerName}</h3>
                
                <div class="detail-item">
                    <strong>Size:</strong> ${order.size} - $${order.sizePrice.toFixed(2)}
                </div>
                
                <div class="detail-item">
                    <strong>Base:</strong> ${order.base} - $${order.basePrice.toFixed(2)}
                </div>
                
                <div class="detail-item">
                    <strong>Fruits:</strong> ${fruitsList}
                </div>
                
                <div class="detail-item">
                    <strong>Protein & Boosts:</strong> ${boostsList}
                </div>
                
                <div class="detail-item">
                    <strong>Sweetener:</strong> ${order.sweetener} ${order.sweetenerPrice > 0 ? '- $' + order.sweetenerPrice.toFixed(2) : ''}
                </div>
                
                <div class="detail-item">
                    <strong>Ice Level:</strong> ${order.iceLevel}
                </div>
                
                <div class="price-summary">
                    <h4>Total Price</h4>
                    <div class="total-price">$${order.totalPrice.toFixed(2)}</div>
                </div>
            </div>
        `;
        
        smoothieOutput.innerHTML = orderHTML;
    }

    // Helper function to capitalize words
    function capitalizeWords(str) {
        return str.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
});