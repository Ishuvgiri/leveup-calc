// Session Tracker Application
/*
=== LEVELUP GAMING CENTER PRICING & UNITS ===

GAMING UNITS:
- PlayStation: PS5-1, PS5-2, PS5-3, PS5-4, PS5-5, PS5-6 (6 units total)
- PC Gaming: PC-1, PC-2, PC-3, PC-4, PC-5, PC-6 (6 units total)  
- Netflix Rooms: Netflix-1, Netflix-2 (2 units total)

PRICING STRUCTURE (Updated with Grace Period Billing):
- PC Gaming: ₹100 per hour
- PlayStation (PS5): ₹300 per hour  
- Netflix Rooms: ₹500 per hour
- Extra Controllers: ₹80 per hour per controller

SNACKS MENU:
- 🍿 Popcorn: ₹30
- 🥔 Chips: ₹20
- 🥤 Cold Drink: ₹25
- 💧 Water: ₹15
- ⚡ Energy Drink: ₹50
- 🍦 Ice Cream: ₹40

CALCULATION NOTES:
- Grace period billing: ≤5 minutes over hour = no extra charge
- >5 minutes over hour = round up to next full hour  
- Gaming cost = Platform rate × Grace period duration
- Controller cost = Controller rate × Grace period duration × Number of controllers
- Total cost = Gaming cost + Controller cost + Snacks cost
- Duration calculated from start time to end time (or current time if active)

LAST UPDATED: July 2025
*/

// Pricing constants
const RATES = {
    ps: 300,    // PlayStation 5
    pc: 100,    // PC Gaming  
    netflix: 500, // Netflix Room
    controller: 80 // Controller per hour
};

// Food Menu Items
const FOOD_MENU = [
  { name: "Aalu Chupp", price: 120 },
  { name: "Aloo Paratha", price: 70 },
  { name: "Banana Lassi", price: 90 },
  { name: "Black Coffee", price: 60 },
  { name: "Black Tea", price: 20 },
  { name: "Bread Jam", price: 130 },
  { name: "Bread Pizza", price: 250 },
  { name: "Bring Your Own Chips", price: 40 },
  { name: "Buff Chowmein", price: 140 },
  { name: "Buff Chilli", price: 240 },
  { name: "Buff Fried Rice", price: 140 },
  { name: "Buff Momo", price: 130 },
  { name: "Buff Sausage", price: 60 },
  { name: "Buff Sadeko", price: 160 },
  { name: "Butter Bread", price: 100 },
  { name: "Chicken - Fries - Momo - Chicken Chilli Combo", price: 450 },
  { name: "Chicken -15", price: 230 },
  { name: "Chicken -65", price: 250 },
  { name: "Chicken Burger", price: 140 },
  { name: "Chicken Cheese Ball", price: 370 },
  { name: "Chicken Cheese Burger", price: 170 },
  { name: "Chicken Cheese Paratha", price: 180 },
  { name: "Chicken Cheese Pasta", price: 250 },
  { name: "Chicken Chilly Lollipop", price: 320 },
  { name: "Chicken Chilli", price: 270 },
  { name: "Chicken Chowmein", price: 150 },
  { name: "Chicken Fried Rice", price: 150 },
  { name: "Chicken Leg Piece", price: 270 },
  { name: "Chicken Lollipop", price: 270 },
  { name: "Chicken Nuggets", price: 250 },
  { name: "Chicken Nuffets", price: 230 },
  { name: "Chicken Pakaunda", price: 260 },
  { name: "Chicken Paratha", price: 130 },
  { name: "Chicken Pate", price: 140 },
  { name: "Chicken Ring", price: 250 },
  { name: "Chicken Roll", price: 150 },
  { name: "Chicken Sausage", price: 70 },
  { name: "Chicken Soup", price: 160 },
  { name: "Chicken Wings", price: 270 },
  { name: "Chow Chow Sadeko", price: 140 },
  { name: "Cold Lemon", price: 25 },
  { name: "Current", price: 170 },
  { name: "DairyMilk Lassi", price: 140 },
  { name: "Egg Cheese Pasta", price: 230 },
  { name: "Egg Chowmein", price: 140 },
  { name: "Egg Fried Rice", price: 140 },
  { name: "Egg Roll", price: 140 },
  { name: "Extra Chicken Cheese Pasta", price: 350 },
  { name: "Finger Chatt", price: 120 },
  { name: "Finger Chatt (Special)", price: 140 },
  { name: "French Fries", price: 140 },
  { name: "Fruit Lassi", price: 120 },
  { name: "Ginger Tea", price: 30 },
  { name: "Hot Dog", price: 160 },
  { name: "Hot Lemon", price: 25 },
  { name: "Hot Lemon With Honey", price: 80 },
  { name: "Haluwa Pouroti", price: 110 },
  { name: "Hookah", price: 400 },
  { name: "Jhol Momo", price: 200 },
  { name: "Kit Kat Lassi", price: 130 },
  { name: "Lemon Tea", price: 25 },
  { name: "Masala Tea", price: 45 },
  { name: "Milk Coffee", price: 80 },
  { name: "Milk Tea", price: 30 },
  { name: "Mix Chowmein", price: 200 },
  { name: "Mix Fried Rice", price: 200 },
  { name: "Mix Pasta", price: 230 },
  { name: "Mix Roll", price: 200 },
  { name: "Mix Soup", price: 190 },
  { name: "Mix Lassi", price: 190 },
  { name: "Mushroom Soup", price: 140 },
  { name: "Mustang Aalu", price: 200 },
  { name: "Onion Rings", price: 190 },
  { name: "Oreo Lassi", price: 140 },
  { name: "Papdi Chatt", price: 140 },
  { name: "Pani Puri", price: 75 },
  { name: "Peri Peri Fries", price: 160 },
  { name: "Piro Aalu", price: 140 },
  { name: "Plain Lassi", price: 70 },
  { name: "Potato Chatt", price: 80 },
  { name: "Potato Chilly", price: 210 },
  { name: "Potato Chilly Lollipop", price: 270 },
  { name: "Potato Fry - Chow Chow Sadeko Combo", price: 400 },
  { name: "Potato Lollipop", price: 190 },
  { name: "Potato Roll", price: 140 },
  { name: "Sausage Chilli", price: 210 },
  { name: "Sausage - Popcorn - Buff Fries Combo", price: 450 },
  { name: "Sausage - Popcorn - Chicken Fry Combo", price: 450 },
  { name: "Steam + Fry + Chilly + Sadeko + KFC Momo Platter", price: 380 },
  { name: "Stick Potato", price: 150 },
  { name: "Super Combo (Veg + Fries + Momo + Potato Chilli)", price: 400 },
  { name: "Veg Burger", price: 120 },
  { name: "Veg Cheese Burger", price: 170 },
  { name: "Veg Chowmein", price: 110 },
  { name: "Veg Fried Rice", price: 110 },
  { name: "Veg Momo", price: 110 },
  { name: "Veg Roll", price: 110 },
  { name: "Veg Soup", price: 140 }
];

// Snacks Menu Items  
const SNACK_MENU = [
  { name: "Mad Angle", price: 70 },
  { name: "Calvin Can", price: 130 },
  { name: "Calvin Bottle", price: 110 },
  { name: "Calvin Normal", price: 100 },
  { name: "Evil Energy", price: 140 },
  { name: "Joiner", price: 150 },
  { name: "Lemon Fanta", price: 60 },
  { name: "Sprite", price: 80 },
  { name: "Coke", price: 80 },
  { name: "Fanta", price: 80 }
];

class SessionTracker {
    constructor() {
        this.API_BASE_URL = 'http://localhost/Levelup_app/api/';
        this.sessions = [];
        this.currentSnacks = [];
        this.currentFood = [];
        this.editingSession = null;
        this.editSnacks = [];
        this.editFood = [];
        this.init();
    }

    // Pricing calculation methods
    timeToMinutes(timeStr) {
        if (!timeStr) return null;
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    // 5-minute grace period billing system
    // If usage exceeds hour by ≤5 minutes, don't charge extra
    // If usage exceeds hour by >5 minutes, round up to next hour
    roundWithGracePeriod(minutes) {
        if (minutes <= 0) return 0;
        
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        
        // If within 5-minute grace period, round down to the hour
        if (remainingMinutes <= 5) {
            return hours * 60;
        } else {
            // If beyond 5 minutes, round up to next hour
            return (hours + 1) * 60;
        }
    }

    // Keep old function for comparison
    roundUp15(minutes) {
        if (minutes <= 0) return 0;
        return Math.ceil(minutes / 15) * 15;
    }

    // Calculate billing with grace period and show both before/after
    calculateBillingWithGrace(actualMinutes) {
        const graceMinutes = this.roundWithGracePeriod(actualMinutes);
        const oldRoundingMinutes = this.roundUp15(actualMinutes);
        
        return {
            actual: actualMinutes,
            withGrace: graceMinutes,
            oldRounding: oldRoundingMinutes,
            savings: oldRoundingMinutes - graceMinutes
        };
    }

    // Calculate price for service
    calculateServicePrice(service, minutes) {
        let perMinuteRate = RATES[service] / 60;
        return Math.ceil(minutes * perMinuteRate - 1e-9);
    }

    // Calculate controller price
    calculateControllerPrice(controllerCount, minutes) {
        if (controllerCount <= 0) return 0;
        let perMinuteRate = RATES.controller / 60;
        return Math.ceil(minutes * perMinuteRate * controllerCount - 1e-9);
    }

    formatMinutesToHours(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }

    init() {
        this.updateCurrentDate();
        this.setupEventListeners();
        this.addTestData();
        this.loadSessions();
        this.setupPlatformDependentFields();
        this.renderSnacksList();
        this.renderFoodList();
        this.populateSnackItems();
        this.populateFoodItems();
    }

    // Populate snack dropdown with search functionality
    populateSnackItems() {
        const snackSelect = document.getElementById('snack-item');
        const editSnackSelect = document.getElementById('edit-snack-item');
        
        snackSelect.innerHTML = '<option value="">-- Select Item --</option>';
        editSnackSelect.innerHTML = '<option value="">-- Select Item --</option>';
        
        SNACK_MENU.forEach(item => {
            const option = `<option value="${item.name} - ₹${item.price}">🍿 ${item.name} - ₹${item.price}</option>`;
            snackSelect.innerHTML += option;
            editSnackSelect.innerHTML += option;
        });
    }

    // Populate food dropdown with search functionality  
    populateFoodItems() {
        const foodSelect = document.getElementById('food-item');
        const editFoodSelect = document.getElementById('edit-food-item');
        
        foodSelect.innerHTML = '<option value="">-- Select Food Item --</option>';
        editFoodSelect.innerHTML = '<option value="">-- Select Food Item --</option>';
        
        FOOD_MENU.forEach(item => {
            const option = `<option value="${item.name} - ₹${item.price}">🍔 ${item.name} - ₹${item.price}</option>`;
            foodSelect.innerHTML += option;
            editFoodSelect.innerHTML += option;
        });
    }

    // Live search for food items
    showFoodSearchResults() {
        const searchTerm = document.getElementById('food-search').value.toLowerCase();
        const resultsContainer = document.getElementById('food-search-results');
        
        if (searchTerm.length === 0) {
            resultsContainer.classList.add('hidden');
            return;
        }
        
        const filteredItems = FOOD_MENU.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );
        
        if (filteredItems.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result-item">No items found</div>';
        } else {
            resultsContainer.innerHTML = filteredItems.map(item => `
                <div class="search-result-item" onclick="app.addFoodFromSearch('${item.name}', ${item.price})">
                    <span class="search-result-name">� ${item.name}</span>
                    <span class="search-result-price">₹${item.price}</span>
                </div>
            `).join('');
        }
        
        resultsContainer.classList.remove('hidden');
    }

    // Live search for edit food items
    showEditFoodSearchResults() {
        const searchTerm = document.getElementById('edit-food-search').value.toLowerCase();
        const resultsContainer = document.getElementById('edit-food-search-results');
        
        if (searchTerm.length === 0) {
            resultsContainer.classList.add('hidden');
            return;
        }
        
        const filteredItems = FOOD_MENU.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );
        
        if (filteredItems.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result-item">No items found</div>';
        } else {
            resultsContainer.innerHTML = filteredItems.map(item => `
                <div class="search-result-item" onclick="app.addEditFoodFromSearch('${item.name}', ${item.price})">
                    <span class="search-result-name">🍔 ${item.name}</span>
                    <span class="search-result-price">₹${item.price}</span>
                </div>
            `).join('');
        }
        
        resultsContainer.classList.remove('hidden');
    }

    // Live search for snack items
    showSnackSearchResults() {
        const searchTerm = document.getElementById('snack-search').value.toLowerCase();
        const resultsContainer = document.getElementById('snack-search-results');
        
        if (searchTerm.length === 0) {
            resultsContainer.classList.add('hidden');
            return;
        }
        
        const filteredItems = SNACK_MENU.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );
        
        if (filteredItems.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result-item">No items found</div>';
        } else {
            resultsContainer.innerHTML = filteredItems.map(item => `
                <div class="search-result-item" onclick="app.addSnackFromSearch('${item.name}', ${item.price})">
                    <span class="search-result-name">🍿 ${item.name}</span>
                    <span class="search-result-price">₹${item.price}</span>
                </div>
            `).join('');
        }
        
        resultsContainer.classList.remove('hidden');
    }

    // Live search for edit snack items
    showEditSnackSearchResults() {
        const searchTerm = document.getElementById('edit-snack-search').value.toLowerCase();
        const resultsContainer = document.getElementById('edit-snack-search-results');
        
        if (searchTerm.length === 0) {
            resultsContainer.classList.add('hidden');
            return;
        }
        
        const filteredItems = SNACK_MENU.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );
        
        if (filteredItems.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result-item">No items found</div>';
        } else {
            resultsContainer.innerHTML = filteredItems.map(item => `
                <div class="search-result-item" onclick="app.addEditSnackFromSearch('${item.name}', ${item.price})">
                    <span class="search-result-name">� ${item.name}</span>
                    <span class="search-result-price">₹${item.price}</span>
                </div>
            `).join('');
        }
        
        resultsContainer.classList.remove('hidden');
    }

    // Add food item directly from search
    addFoodFromSearch(name, price) {
        const quantity = parseInt(document.getElementById('food-quantity').value) || 1;
        const foodItem = {
            name: name,
            price: price,
            quantity: quantity,
            total: price * quantity
        };
        
        this.currentFood.push(foodItem);
        this.renderFoodList();
        
        // Clear search and hide results
        document.getElementById('food-search').value = '';
        document.getElementById('food-search-results').classList.add('hidden');
        document.getElementById('food-quantity').value = 1;
        
        this.showNotification(`Added ${quantity}x ${name}`, 'success');
    }

    // Add edit food item directly from search
    addEditFoodFromSearch(name, price) {
        const quantity = parseInt(document.getElementById('edit-food-quantity').value) || 1;
        const foodItem = {
            name: name,
            price: price,
            quantity: quantity,
            total: price * quantity
        };
        
        this.editFood.push(foodItem);
        this.renderEditFoodList();
        
        // Clear search and hide results
        document.getElementById('edit-food-search').value = '';
        document.getElementById('edit-food-search-results').classList.add('hidden');
        document.getElementById('edit-food-quantity').value = 1;
        
        this.showNotification(`Added ${quantity}x ${name}`, 'success');
    }

    // Add snack item directly from search
    addSnackFromSearch(name, price) {
        const quantity = parseInt(document.getElementById('snack-quantity').value) || 1;
        const snackItem = {
            name: name,
            price: price,
            quantity: quantity,
            total: price * quantity
        };
        
        this.currentSnacks.push(snackItem);
        this.renderSnacksList();
        
        // Clear search and hide results
        document.getElementById('snack-search').value = '';
        document.getElementById('snack-search-results').classList.add('hidden');
        document.getElementById('snack-quantity').value = 1;
        
        this.showNotification(`Added ${quantity}x ${name}`, 'success');
    }

    // Add edit snack item directly from search
    addEditSnackFromSearch(name, price) {
        const quantity = parseInt(document.getElementById('edit-snack-quantity').value) || 1;
        const snackItem = {
            name: name,
            price: price,
            quantity: quantity,
            total: price * quantity
        };
        
        this.editSnacks.push(snackItem);
        this.renderEditSnacksList();
        
        // Clear search and hide results
        document.getElementById('edit-snack-search').value = '';
        document.getElementById('edit-snack-search-results').classList.add('hidden');
        document.getElementById('edit-snack-quantity').value = 1;
        
        this.showNotification(`Added ${quantity}x ${name}`, 'success');
    }

    addTestData() {
        // Test data disabled - no automatic test sessions will be created
        console.log('Test data creation disabled');
    }

    async loadSessions() {
        console.log('Loading sessions...');
        try {
            const today = new Date().toISOString().split('T')[0];
            
            // Try API first
            const response = await fetch(`${this.API_BASE_URL}sessions/read.php?date=${today}`);
            if (response.ok) {
                const data = await response.json();
                this.sessions = data.records || [];
                console.log('✓ Loaded from API:', this.sessions.length, 'sessions');
            } else {
                throw new Error('API failed');
            }
        } catch (error) {
            console.log('API failed, using localStorage:', error.message);
            this.loadSessionsFromStorage();
        }
        
        this.renderSessions();
    }

    loadSessionsFromStorage() {
        const allSessions = JSON.parse(localStorage.getItem('gamingSessions') || '[]');
        // Convert localStorage format to match current format
        this.sessions = allSessions.map(session => ({
            id: session.id,
            name: session.name || session.customer_name,
            platform: session.platform,
            unit: session.unit || session.unit_name,
            startTime: session.startTime || session.start_time,
            endTime: session.endTime || session.end_time,
            controllerCount: session.controllerCount || session.controller_count || 0,
            controllerStartTime: session.controllerStartTime || session.controller_start_time,
            controllerEndTime: session.controllerEndTime || session.controller_end_time,
            paid: session.paid || session.is_paid || false,
            snacks: session.snacks || [],
            createdAt: session.createdAt,
            isActive: session.isActive !== undefined ? session.isActive : !session.endTime
        }));
        console.log('✓ Loaded from localStorage:', this.sessions.length, 'sessions');
    }

    updateCurrentDate() {
        const currentDateInput = document.getElementById('current-date-input');
        const now = new Date();
        // Set the date input to today's date in YYYY-MM-DD format
        const today = now.toISOString().split('T')[0];
        currentDateInput.value = today;
    }

    setupEventListeners() {
        const form = document.getElementById('session-form');
        const platformSelect = document.getElementById('platform-select');
        const editForm = document.getElementById('edit-form');
        const snackForm = document.getElementById('snack-form');
        const editSnackForm = document.getElementById('edit-snack-form');
        const foodForm = document.getElementById('food-form');
        const editFoodForm = document.getElementById('edit-food-form');

        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        platformSelect.addEventListener('change', (e) => this.handlePlatformChange(e));
        editForm.addEventListener('submit', (e) => this.handleEditSubmit(e));
        snackForm.addEventListener('submit', (e) => this.handleSnackSubmit(e));
        editSnackForm.addEventListener('submit', (e) => this.handleEditSnackSubmit(e));
        foodForm.addEventListener('submit', (e) => this.handleFoodSubmit(e));
        editFoodForm.addEventListener('submit', (e) => this.handleEditFoodSubmit(e));
    }

    setupPlatformDependentFields() {
        const platformSelect = document.getElementById('platform-select');
        this.handlePlatformChange({ target: platformSelect });
    }

    handlePlatformChange(e) {
        const platform = e.target.value;
        const platformUnits = document.getElementById('platform-units');
        const controllerSection = document.getElementById('controller-section');

        // Clear previous content
        platformUnits.innerHTML = '';
        platformUnits.classList.add('hidden');
        controllerSection.classList.add('hidden');

        if (platform === 'ps' || platform === 'pc') {
            this.showPlatformUnits(platform, platformUnits);
            controllerSection.classList.remove('hidden');
        } else if (platform === 'netflix') {
            this.showNetflixUnits(platformUnits);
        }
    }

    showPlatformUnits(platform, container) {
        container.classList.remove('hidden');
        const unitLabel = platform === 'ps' ? 'PS Unit' : 'PC Unit';
        const units = platform === 'ps' ? 
            ['PS-1', 'PS-2', 'PS-3', 'PS-4', 'PS-5', 'PS-6'] : 
            ['PC-1', 'PC-2', 'PC-3', 'PC-4', 'PC-5', 'PC-6'];

        container.innerHTML = `
            <div class="form-group">
                <label>${unitLabel}:</label>
                <select name="unit" required>
                    <option value="">-- Select ${unitLabel} --</option>
                    ${units.map(unit => `<option value="${unit}">${unit}</option>`).join('')}
                </select>
            </div>
        `;
    }

    showNetflixUnits(container) {
        container.classList.remove('hidden');
        container.innerHTML = `
            <div class="form-group">
                <label>Netflix Room:</label>
                <select name="unit" required>
                    <option value="">-- Select Room --</option>
                    <option value="Netflix Room 1">Netflix Room 1</option>
                    <option value="Netflix Room 2">Netflix Room 2</option>
                </select>
            </div>
        `;
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const sessionData = this.extractSessionData(formData);
        
        if (this.validateSession(sessionData)) {
            this.addSession(sessionData);
            e.target.reset();
            this.setupPlatformDependentFields(); // Reset platform fields
            this.showNotification('Session added successfully!', 'success');
        }
    }

    // Edit modal methods
    showEditModal(sessionId) {
        const session = this.sessions.find(s => s.id === sessionId);
        if (session) {
            this.editingSession = session;
            this.editSnacks = session.snacks ? [...session.snacks] : [];
            this.editFood = session.food ? [...session.food] : [];
            
            document.getElementById('edit-session-id').value = session.id;
            document.getElementById('edit-name').value = session.name;
            document.getElementById('edit-platform').value = session.platform;
            document.getElementById('edit-start-time').value = session.startTime || '';
            document.getElementById('edit-end-time').value = session.endTime || '';
            document.getElementById('edit-controller-start-time').value = session.controllerStartTime || '';
            document.getElementById('edit-controller-end-time').value = session.controllerEndTime || '';
            document.getElementById('edit-controller-count').value = session.controllerCount || 0;
            document.getElementById('edit-paid').value = session.paid.toString();
            
            this.handleEditPlatformChange();
            this.renderEditSnacksList();
            this.renderEditFoodList();
            document.getElementById('edit-modal').classList.add('active');
        }
    }

    handleEditPlatformChange() {
        const platform = document.getElementById('edit-platform').value;
        const unitSection = document.getElementById('edit-unit-section');
        const unitSelect = document.getElementById('edit-unit');
        const unitLabel = document.getElementById('edit-unit-label');
        const controllerSection = document.getElementById('edit-controller-section');
        
        // Clear previous options
        unitSelect.innerHTML = '<option value="">-- Select Unit --</option>';
        
        if (platform === 'ps') {
            unitLabel.textContent = 'PS Unit:';
            const units = ['PS-1', 'PS-2', 'PS-3', 'PS-4', 'PS-5', 'PS-6'];
            units.forEach(unit => {
                const option = document.createElement('option');
                option.value = unit;
                option.textContent = unit;
                unitSelect.appendChild(option);
            });
            unitSection.style.display = 'flex';
            controllerSection.style.display = 'flex';
        } else if (platform === 'pc') {
            unitLabel.textContent = 'PC Unit:';
            const units = ['PC-1', 'PC-2', 'PC-3', 'PC-4', 'PC-5', 'PC-6'];
            units.forEach(unit => {
                const option = document.createElement('option');
                option.value = unit;
                option.textContent = unit;
                unitSelect.appendChild(option);
            });
            unitSection.style.display = 'flex';
            controllerSection.style.display = 'flex';
        } else if (platform === 'netflix') {
            unitLabel.textContent = 'Netflix Room:';
            const units = ['Netflix Room 1', 'Netflix Room 2'];
            units.forEach(unit => {
                const option = document.createElement('option');
                option.value = unit;
                option.textContent = unit;
                unitSelect.appendChild(option);
            });
            unitSection.style.display = 'flex';
            controllerSection.style.display = 'none';
        }
        
        // Set current unit if editing existing session
        if (this.editingSession && this.editingSession.unit) {
            unitSelect.value = this.editingSession.unit;
        }
    }

    renderEditSnacksList() {
        const container = document.getElementById('edit-snacks-list');
        if (this.editSnacks.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.875rem; text-align: center;">No snacks added</p>';
            return;
        }

        container.innerHTML = this.editSnacks.map((snack, index) => `
            <div class="snack-item">
                <span>${snack.quantity}x ${snack.name}</span>
                <button class="snack-remove" onclick="app.removeEditSnack(${index})">&times;</button>
            </div>
        `).join('');
    }

    showEditSnackModal() {
        document.getElementById('edit-snack-modal').classList.add('active');
    }

    closeEditSnackModal() {
        document.getElementById('edit-snack-modal').classList.remove('active');
        document.getElementById('edit-snack-form').reset();
    }

    handleEditSnackSubmit(e) {
        e.preventDefault();
        const item = document.getElementById('edit-snack-item').value;
        const quantity = parseInt(document.getElementById('edit-snack-quantity').value);
        
        if (item && quantity > 0) {
            const [name, priceStr] = item.split(' - ₹');
            const price = parseInt(priceStr);
            
            this.editSnacks.push({
                name: name,
                price: price,
                quantity: quantity,
                total: price * quantity
            });
            
            this.renderEditSnacksList();
            this.closeEditSnackModal();
            this.showNotification(`Added ${quantity}x ${name} to session`, 'success');
        }
    }

    removeEditSnack(index) {
        this.editSnacks.splice(index, 1);
        this.renderEditSnacksList();
    }

    closeEditModal() {
        document.getElementById('edit-modal').classList.remove('active');
        document.getElementById('edit-form').reset();
        this.editingSession = null;
        this.editSnacks = [];
        this.editFood = [];
    }

    handleEditSubmit(e) {
        e.preventDefault();
        const sessionId = parseInt(document.getElementById('edit-session-id').value);
        const session = this.sessions.find(s => s.id === sessionId);
        
        if (session) {
            // Update basic info
            session.name = document.getElementById('edit-name').value;
            session.platform = document.getElementById('edit-platform').value;
            session.unit = document.getElementById('edit-unit').value;
            session.controllerCount = parseInt(document.getElementById('edit-controller-count').value) || 0;
            session.paid = document.getElementById('edit-paid').value === 'true';
            session.snacks = [...this.editSnacks];
            session.food = [...this.editFood];
            
            // Update timing
            const newStartTime = document.getElementById('edit-start-time').value;
            const newEndTime = document.getElementById('edit-end-time').value;
            const newControllerStartTime = document.getElementById('edit-controller-start-time').value;
            const newControllerEndTime = document.getElementById('edit-controller-end-time').value;
            
            if (newStartTime) {
                session.startTime = newStartTime;
            }
            
            if (newEndTime) {
                session.endTime = newEndTime;
                session.isActive = false;
            }
            
            if (newControllerStartTime) {
                session.controllerStartTime = newControllerStartTime;
            }
            
            if (newControllerEndTime) {
                session.controllerEndTime = newControllerEndTime;
            }
            
            this.saveToStorageAndAPI();
            this.renderSessions();
            this.closeEditModal();
            this.showNotification('Session updated successfully!', 'success');
        }
    }

    extractSessionData(formData) {
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return {
            id: Date.now(),
            name: data.name,
            platform: data.platform,
            unit: data.unit || '',
            startTime: data.startTime,
            endTime: data.endTime || null,
            controllerCount: parseInt(data.controllerCount) || 0,
            controllerStartTime: data.controllerStartTime || null,
            controllerEndTime: data.controllerEndTime || null,
            paid: data.paid === 'true',
            snacks: [...this.currentSnacks],
            food: [...this.currentFood],
            createdAt: new Date().toISOString(),
            isActive: !data.endTime
        };
    }

    validateSession(data) {
        if (!data.name || !data.platform || !data.startTime) {
            this.showNotification('Please fill in all required fields', 'error');
            return false;
        }

        if (data.platform !== 'netflix' && !data.unit) {
            this.showNotification('Please select a unit', 'error');
            return false;
        }

        return true;
    }

    addSession(sessionData) {
        this.sessions.unshift(sessionData);
        this.currentSnacks = []; // Clear current snacks after adding session
        this.currentFood = []; // Clear current food after adding session
        this.renderSnacksList();
        this.renderFoodList();
        this.saveSession(sessionData);
        this.renderSessions();
    }

    async saveSession(sessionData) {
        try {
            // Convert to API format
            const apiData = {
                customer_name: sessionData.name,
                platform: sessionData.platform,
                unit_name: sessionData.unit,
                start_time: sessionData.startTime,
                end_time: sessionData.endTime,
                controller_count: sessionData.controllerCount || 0,
                controller_start_time: sessionData.controllerStartTime,
                controller_end_time: sessionData.controllerEndTime,
                is_paid: sessionData.paid,
                session_date: new Date().toISOString().split('T')[0],
                snacks: sessionData.snacks,
                food: sessionData.food
            };

            const response = await fetch(`${this.API_BASE_URL}sessions/create.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(apiData)
            });
            
            if (response.ok) {
                console.log('✓ Session saved via API');
            } else {
                throw new Error('API save failed');
            }
        } catch (error) {
            console.log('API save failed, using localStorage');
            this.saveToStorage();
        }
    }

    // Snack management methods
    renderSnacksList() {
        const container = document.getElementById('snacks-list');
        if (this.currentSnacks.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.875rem; text-align: center;">No snacks added</p>';
            return;
        }

        container.innerHTML = this.currentSnacks.map((snack, index) => `
            <div class="snack-item">
                <span>${snack.quantity}x ${snack.name}</span>
                <button class="snack-remove" onclick="app.removeSnack(${index})">&times;</button>
            </div>
        `).join('');
    }

    showSnackModal() {
        document.getElementById('snack-modal').classList.add('active');
    }

    closeSnackModal() {
        document.getElementById('snack-modal').classList.remove('active');
        document.getElementById('snack-form').reset();
    }

    handleSnackSubmit(e) {
        e.preventDefault();
        const item = document.getElementById('snack-item').value;
        const quantity = parseInt(document.getElementById('snack-quantity').value);
        
        if (item && quantity > 0) {
            const [name, priceStr] = item.split(' - ₹');
            const price = parseInt(priceStr);
            
            this.currentSnacks.push({
                name: name,
                price: price,
                quantity: quantity,
                total: price * quantity
            });
            
            this.renderSnacksList();
            this.closeSnackModal();
            this.showNotification(`Added ${quantity}x ${name}`, 'success');
        }
    }

    removeSnack(index) {
        this.currentSnacks.splice(index, 1);
        this.renderSnacksList();
    }

    // Food management methods
    renderFoodList() {
        const container = document.getElementById('food-list');
        if (this.currentFood.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.875rem; text-align: center;">No food added</p>';
            return;
        }

        container.innerHTML = this.currentFood.map((food, index) => `
            <div class="food-item">
                <span>${food.quantity}x ${food.name}</span>
                <button class="food-remove" onclick="app.removeFood(${index})">&times;</button>
            </div>
        `).join('');
    }

    showFoodModal() {
        document.getElementById('food-modal').classList.add('active');
    }

    closeFoodModal() {
        document.getElementById('food-modal').classList.remove('active');
        document.getElementById('food-form').reset();
    }

    handleFoodSubmit(e) {
        e.preventDefault();
        const item = document.getElementById('food-item').value;
        const quantity = parseInt(document.getElementById('food-quantity').value);
        
        if (item && quantity > 0) {
            const [name, priceStr] = item.split(' - ₹');
            const price = parseInt(priceStr);
            
            this.currentFood.push({
                name: name,
                price: price,
                quantity: quantity,
                total: price * quantity
            });
            
            this.renderFoodList();
            this.closeFoodModal();
            this.showNotification(`Added ${quantity}x ${name}`, 'success');
        }
    }

    removeFood(index) {
        this.currentFood.splice(index, 1);
        this.renderFoodList();
    }

    // Edit Food methods
    renderEditFoodList() {
        const container = document.getElementById('edit-food-list');
        if (this.editFood.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.875rem; text-align: center;">No food added</p>';
            return;
        }

        container.innerHTML = this.editFood.map((food, index) => `
            <div class="food-item">
                <span>${food.quantity}x ${food.name}</span>
                <button class="food-remove" onclick="app.removeEditFood(${index})">&times;</button>
            </div>
        `).join('');
    }

    showEditFoodModal() {
        document.getElementById('edit-food-modal').classList.add('active');
    }

    closeEditFoodModal() {
        document.getElementById('edit-food-modal').classList.remove('active');
        document.getElementById('edit-food-form').reset();
    }

    handleEditFoodSubmit(e) {
        e.preventDefault();
        const item = document.getElementById('edit-food-item').value;
        const quantity = parseInt(document.getElementById('edit-food-quantity').value);
        
        if (item && quantity > 0) {
            const [name, priceStr] = item.split(' - ₹');
            const price = parseInt(priceStr);
            
            this.editFood.push({
                name: name,
                price: price,
                quantity: quantity,
                total: price * quantity
            });
            
            this.renderEditFoodList();
            this.closeEditFoodModal();
            this.showNotification(`Added ${quantity}x ${name} to session`, 'success');
        }
    }

    removeEditFood(index) {
        this.editFood.splice(index, 1);
        this.renderEditFoodList();
    }

    renderSessions() {
        const container = document.getElementById('sessions-list');
        
        if (this.sessions.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No active sessions</h3>
                    <p>Add a new session using the form on the left to get started.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.sessions
            .map(session => this.createSessionCard(session))
            .join('');
    }

    createSessionCard(session) {
        const duration = this.calculateDuration(session.startTime, session.endTime);
        
        // Calculate controller duration more flexibly
        let controllerDuration = null;
        if (session.controllerCount > 0) {
            if (session.controllerStartTime && session.controllerEndTime) {
                // Both start and end times specified
                controllerDuration = this.calculateDuration(session.controllerStartTime, session.controllerEndTime);
            } else if (session.controllerStartTime && !session.controllerEndTime) {
                // Only start time specified (ongoing controller usage)
                controllerDuration = this.calculateDuration(session.controllerStartTime, null);
            } else if (!session.controllerStartTime) {
                // No specific controller times, assume full session
                controllerDuration = duration;
            }
        }
        
        // Calculate costs with grace period pricing
        const costBreakdown = this.calculateCost(session);
        const gamingCost = this.calculateGameCost(session);
        const controllerCost = this.calculateControllerCostOnly(session);
        const totalServiceCost = gamingCost + controllerCost;
        const snacksTotal = session.snacks ? session.snacks.reduce((total, snack) => total + snack.total, 0) : 0;
        const foodTotal = session.food ? session.food.reduce((total, food) => total + food.total, 0) : 0;
        const totalCost = costBreakdown.currentPrice;
        const oldTotalCost = costBreakdown.oldPrice;
        const savings = costBreakdown.savings;
        
        return `
            <div class="session-card" data-session-id="${session.id}">
                <h3>${session.name} - ${this.formatPlatform(session.platform, session.unit)}</h3>
                <div class="session-info">
                    <div class="info-item">
                        <span class="info-label">Start Time:</span>
                        <span class="info-value">${this.formatTime(session.startTime)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">End Time:</span>
                        <span class="info-value">${session.endTime ? this.formatTime(session.endTime) : '<span style="color: var(--warning-color); font-weight: bold;">● ACTIVE</span>'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Duration:</span>
                        <span class="info-value">${duration}</span>
                    </div>
                    ${session.controllerCount > 0 ? `
                    <div class="info-item">
                        <span class="info-label">Controllers:</span>
                        <span class="info-value">${session.controllerCount}</span>
                    </div>
                    ${session.controllerStartTime ? `
                    <div class="info-item">
                        <span class="info-label">Controller Start:</span>
                        <span class="info-value">${this.formatTime(session.controllerStartTime)}</span>
                    </div>
                    ` : ''}
                    ${controllerDuration ? `
                    <div class="info-item">
                        <span class="info-label">Controller Duration:</span>
                        <span class="info-value">${controllerDuration}</span>
                    </div>
                    ` : ''}
                    ` : ''}
                    <div class="info-item">
                        <span class="info-label">Gaming Cost:</span>
                        <span class="info-value">₹${gamingCost}</span>
                    </div>
                    ${session.controllerCount > 0 && controllerCost > 0 ? `
                    <div class="info-item">
                        <span class="info-label">Controller Cost:</span>
                        <span class="info-value">₹${controllerCost}</span>
                    </div>
                    ` : ''}
                    ${session.snacks && session.snacks.length > 0 ? `
                    <div class="info-item">
                        <span class="info-label">Snacks Cost:</span>
                        <span class="info-value">₹${snacksTotal}</span>
                    </div>
                    ` : ''}
                    ${session.food && session.food.length > 0 ? `
                    <div class="info-item">
                        <span class="info-label">Food Cost:</span>
                        <span class="info-value">₹${foodTotal}</span>
                    </div>
                    ` : ''}
                    <div class="info-item">
                        <span class="info-label">Total Cost:</span>
                        <span class="info-value" style="font-weight: bold; color: var(--primary-purple-light);">₹${totalCost}</span>
                    </div>
                    ${savings > 0 ? `
                    <div class="info-item" style="background: rgba(16, 185, 129, 0.1); padding: 8px; border-radius: 6px; margin: 8px 0;">
                        <div style="font-size: 0.85rem; color: var(--success-color); font-weight: 600; margin-bottom: 4px;">
                            💰 Grace Period Billing
                        </div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 2px;">
                            <span style="text-decoration: line-through;">Old Price: ₹${oldTotalCost}</span>
                        </div>
                        <div style="font-size: 0.8rem; color: var(--success-color); font-weight: 600;">
                            You Saved: ₹${savings}
                        </div>
                    </div>
                    ` : ''}
                    <div class="info-item">
                        <span class="info-label">Status:</span>
                        <span class="status-badge ${session.isActive ? 'status-active' : (session.paid ? 'status-paid' : 'status-unpaid')}">
                            ${session.isActive ? 'Active' : (session.paid ? 'Paid' : 'Unpaid')}
                        </span>
                    </div>
                </div>
                ${session.snacks && session.snacks.length > 0 ? `
                <div style="margin-top: 12px; padding: 12px; background: rgba(16, 185, 129, 0.05); border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.2);">
                    <h5 style="color: var(--success-color); margin-bottom: 8px; font-size: 0.875rem;">🍿 Snacks & Drinks:</h5>
                    ${session.snacks.map(snack => `<div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 4px;">${snack.quantity}x ${snack.name} - ₹${snack.total}</div>`).join('')}
                </div>
                ` : ''}
                ${session.food && session.food.length > 0 ? `
                <div style="margin-top: 12px; padding: 12px; background: rgba(245, 158, 11, 0.05); border-radius: 8px; border: 1px solid rgba(245, 158, 11, 0.2);">
                    <h5 style="color: var(--warning-color); margin-bottom: 8px; font-size: 0.875rem;">🍔 Food:</h5>
                    ${session.food.map(food => `<div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 4px;">${food.quantity}x ${food.name} - ₹${food.total}</div>`).join('')}
                </div>
                ` : ''}
                <div class="session-actions">
                    ${session.isActive ? `
                        <button onclick="app.endSession(${session.id})" class="action-btn btn-end">End Session</button>
                    ` : ''}
                    <button onclick="app.showEditModal(${session.id})" class="action-btn btn-edit">Edit</button>
                    <button onclick="app.togglePaid(${session.id})" class="action-btn ${session.paid ? 'btn-unpaid' : 'btn-paid'}">
                        ${session.paid ? 'Mark Unpaid' : 'Mark Paid'}
                    </button>
                    <button onclick="app.deleteSession(${session.id})" class="action-btn btn-delete">Delete</button>
                </div>
            </div>
        `;
    }

    formatPlatform(platform, unit) {
        const platforms = {
            ps: 'PlayStation 5',
            pc: 'PC Gaming',
            netflix: 'Netflix Room'
        };
        return unit ? `${platforms[platform]} (${unit})` : platforms[platform];
    }

    // Method to get current pricing info (for reference)
    getPricingInfo() {
        return {
            platforms: {
                ps: { name: 'PlayStation 5', rate: 300, units: ['PS5-1', 'PS5-2', 'PS5-3', 'PS5-4', 'PS5-5', 'PS5-6'] },
                pc: { name: 'PC Gaming', rate: 100, units: ['PC-1', 'PC-2', 'PC-3', 'PC-4', 'PC-5', 'PC-6'] },
                netflix: { name: 'Netflix Room', rate: 500, units: ['Netflix-1', 'Netflix-2'] }
            },
            controllers: { rate: 80 },
            snacks: [
                { name: 'Popcorn', price: 30 },
                { name: 'Chips', price: 20 },
                { name: 'Cold Drink', price: 25 },
                { name: 'Water', price: 15 },
                { name: 'Energy Drink', price: 50 },
                { name: 'Ice Cream', price: 40 }
            ],
            billing: {
                roundingInterval: 15, // minutes
                roundingMethod: 'UP' // Always round up to next interval
            }
        };
    }

    formatTime(timeString) {
        return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    calculateDuration(startTime, endTime) {
        const startMinutes = this.timeToMinutes(startTime);
        let endMinutes;
        
        if (!endTime) {
            const now = new Date();
            const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            endMinutes = this.timeToMinutes(currentTimeStr);
        } else {
            endMinutes = this.timeToMinutes(endTime);
        }
        
        // Handle overnight sessions
        if (endMinutes <= startMinutes) {
            endMinutes += 24 * 60;
        }
        
        const actualDuration = endMinutes - startMinutes;
        const billing = this.calculateBillingWithGrace(actualDuration);
        
        const actualFormatted = this.formatMinutesToHours(billing.actual);
        const graceFormatted = this.formatMinutesToHours(billing.withGrace);
        const oldFormatted = this.formatMinutesToHours(billing.oldRounding);
        
        let displayText = `${actualFormatted} → ${graceFormatted}`;
        
        if (billing.savings > 0) {
            const savingsFormatted = this.formatMinutesToHours(billing.savings);
            displayText += ` (saved ${savingsFormatted} vs old billing)`;
        }
        
        if (!endTime) {
            displayText += ' (ongoing)';
        }
        
        return displayText;
    }

    calculateCost(session) {
        const startTime = this.timeToMinutes(session.startTime);
        let endTime;
        
        if (session.endTime) {
            endTime = this.timeToMinutes(session.endTime);
        } else {
            const now = new Date();
            const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            endTime = this.timeToMinutes(currentTimeStr);
        }
        
        // Handle overnight sessions
        if (endTime <= startTime) {
            endTime += 24 * 60;
        }
        
        const sessionDuration = endTime - startTime;
        const sessionBilling = this.calculateBillingWithGrace(sessionDuration);
        
        // Calculate main service cost with grace period
        let totalCost = this.calculateServicePrice(session.platform, sessionBilling.withGrace);
        let oldTotalCost = this.calculateServicePrice(session.platform, sessionBilling.oldRounding);
        
        // Add controller costs if applicable
        if (session.controllerCount > 0) {
            let controllerStart, controllerEnd;
            
            // If controller times are specified, use them
            if (session.controllerStartTime && session.controllerEndTime) {
                controllerStart = this.timeToMinutes(session.controllerStartTime);
                controllerEnd = this.timeToMinutes(session.controllerEndTime);
                
                // Handle overnight controller usage
                if (controllerEnd <= controllerStart) {
                    controllerEnd += 24 * 60;
                }
            } 
            // If only start time is specified (active controller session)
            else if (session.controllerStartTime && !session.controllerEndTime) {
                controllerStart = this.timeToMinutes(session.controllerStartTime);
                controllerEnd = endTime; // Use session end time (current time for active sessions)
                
                // Handle overnight controller usage
                if (controllerEnd <= controllerStart) {
                    controllerEnd += 24 * 60;
                }
            }
            // If no controller times specified, assume full session duration
            else {
                controllerStart = startTime;
                controllerEnd = endTime;
            }
            
            // Clamp controller usage within session time
            if (controllerStart < startTime) controllerStart = startTime;
            if (controllerEnd > endTime) controllerEnd = endTime;
            
            const controllerDuration = Math.max(0, controllerEnd - controllerStart);
            const controllerBilling = this.calculateBillingWithGrace(controllerDuration);
            
            // Add controller cost with grace period
            const controllerCost = this.calculateControllerPrice(session.controllerCount, controllerBilling.withGrace);
            const oldControllerCost = this.calculateControllerPrice(session.controllerCount, controllerBilling.oldRounding);
            
            totalCost += controllerCost;
            oldTotalCost += oldControllerCost;
        }
        
        // Add snacks and food cost
        const snacksCost = session.snacks ? session.snacks.reduce((total, snack) => total + (snack.total || 0), 0) : 0;
        const foodCost = session.food ? session.food.reduce((total, food) => total + (food.total || 0), 0) : 0;
        totalCost += snacksCost + foodCost;
        oldTotalCost += snacksCost + foodCost;
        
        // Return both new grace pricing and old pricing for comparison
        return {
            currentPrice: totalCost,
            oldPrice: oldTotalCost,
            savings: oldTotalCost - totalCost,
            sessionBilling: sessionBilling,
            snacksCost: snacksCost,
            foodCost: foodCost
        };
    }

    // Calculate only the gaming cost (platform cost)
    calculateGameCost(session) {
        const startTime = this.timeToMinutes(session.startTime);
        let endTime;
        
        if (session.endTime) {
            endTime = this.timeToMinutes(session.endTime);
        } else {
            const now = new Date();
            const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            endTime = this.timeToMinutes(currentTimeStr);
        }
        
        // Handle overnight sessions
        if (endTime <= startTime) {
            endTime += 24 * 60;
        }
        
        const sessionDuration = endTime - startTime;
        const roundedSessionDuration = this.roundUp15(sessionDuration);
        
        return this.calculateServicePrice(session.platform, roundedSessionDuration);
    }

    // Calculate only the controller cost
    calculateControllerCostOnly(session) {
        if (session.controllerCount <= 0) return 0;
        
        const startTime = this.timeToMinutes(session.startTime);
        let endTime;
        
        if (session.endTime) {
            endTime = this.timeToMinutes(session.endTime);
        } else {
            const now = new Date();
            const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            endTime = this.timeToMinutes(currentTimeStr);
        }
        
        // Handle overnight sessions
        if (endTime <= startTime) {
            endTime += 24 * 60;
        }
        
        let controllerStart, controllerEnd;
        
        // If controller times are specified, use them
        if (session.controllerStartTime && session.controllerEndTime) {
            controllerStart = this.timeToMinutes(session.controllerStartTime);
            controllerEnd = this.timeToMinutes(session.controllerEndTime);
            
            // Handle overnight controller usage
            if (controllerEnd <= controllerStart) {
                controllerEnd += 24 * 60;
            }
        } 
        // If only start time is specified (active controller session)
        else if (session.controllerStartTime && !session.controllerEndTime) {
            controllerStart = this.timeToMinutes(session.controllerStartTime);
            controllerEnd = endTime; // Use session end time (current time for active sessions)
            
            // Handle overnight controller usage
            if (controllerEnd <= controllerStart) {
                controllerEnd += 24 * 60;
            }
        }
        // If no controller times specified, assume full session duration
        else {
            controllerStart = startTime;
            controllerEnd = endTime;
        }
        
        // Clamp controller usage within session time
        if (controllerStart < startTime) controllerStart = startTime;
        if (controllerEnd > endTime) controllerEnd = endTime;
        
        const controllerDuration = Math.max(0, controllerEnd - controllerStart);
        const roundedControllerDuration = this.roundUp15(controllerDuration);
        
        return this.calculateControllerPrice(session.controllerCount, roundedControllerDuration);
    }

    endSession(sessionId) {
        const session = this.sessions.find(s => s.id === sessionId);
        if (session) {
            const now = new Date();
            session.endTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            session.isActive = false;
            
            if (session.controllerCount > 0 && session.controllerStartTime && !session.controllerEndTime) {
                session.controllerEndTime = session.endTime;
            }
            
            this.saveToStorageAndAPI();
            this.renderSessions();
            this.showNotification('Session ended successfully!', 'success');
        }
    }

    togglePaid(sessionId) {
        const session = this.sessions.find(s => s.id === sessionId);
        if (session) {
            session.paid = !session.paid;
            this.saveToStorageAndAPI();
            this.renderSessions();
            this.showNotification(`Session marked as ${session.paid ? 'paid' : 'unpaid'}`, 'success');
        }
    }

    async deleteSession(sessionId) {
        if (confirm('Are you sure you want to delete this session?')) {
            try {
                // Try API delete first
                const response = await fetch(`${this.API_BASE_URL}sessions/delete.php`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: sessionId })
                });
                
                if (response.ok) {
                    console.log('✓ Session deleted via API');
                } else {
                    throw new Error('API delete failed');
                }
            } catch (error) {
                console.log('API delete failed, deleting from localStorage');
            }
            
            // Always remove from local sessions array
            this.sessions = this.sessions.filter(s => s.id !== sessionId);
            this.saveToStorage();
            this.renderSessions();
            this.showNotification('Session deleted successfully!', 'success');
        }
    }

    saveToStorage() {
        // Save to localStorage in both formats for compatibility
        localStorage.setItem('sessions', JSON.stringify(this.sessions));
        
        // Also save in API format for PHP compatibility
        const apiFormatSessions = this.sessions.map(session => ({
            id: session.id,
            customer_name: session.name,
            platform: session.platform,
            unit_name: session.unit,
            start_time: session.startTime,
            end_time: session.endTime,
            controller_count: session.controllerCount || 0,
            controller_start_time: session.controllerStartTime,
            controller_end_time: session.controllerEndTime,
            is_paid: session.paid,
            session_date: new Date().toISOString().split('T')[0],
            snacks: session.snacks || [],
            snacks_total: session.snacks ? session.snacks.reduce((sum, snack) => sum + snack.total, 0) : 0
        }));
        localStorage.setItem('gamingSessions', JSON.stringify(apiFormatSessions));
    }

    async saveToStorageAndAPI() {
        // Save to localStorage immediately
        this.saveToStorage();
        
        // Try to sync with API in background
        try {
            // This would sync all sessions to API if needed
            console.log('Sessions saved to localStorage and syncing with API...');
        } catch (error) {
            console.log('API sync failed, continuing with localStorage');
        }
    }

    // Enhanced localStorage management functions
    clearStorage() {
        try {
            localStorage.removeItem('sessions');
            localStorage.removeItem('gamingSessions');
            this.sessions = [];
            this.renderSessions();
            this.showNotification('All sessions cleared from storage', 'success');
            console.log('✓ Storage cleared');
        } catch (error) {
            console.error('Failed to clear storage:', error);
            this.showNotification('Failed to clear storage', 'error');
        }
    }

    exportToFile() {
        try {
            const data = {
                sessions: this.sessions,
                exportDate: new Date().toISOString(),
                version: '1.0',
                totalSessions: this.sessions.length,
                metadata: {
                    exportedBy: 'LevelUp Gaming Lounge',
                    platform: 'Session Tracker'
                }
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `levelup-sessions-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification(`Exported ${this.sessions.length} sessions successfully`, 'success');
        } catch (error) {
            console.error('Export failed:', error);
            this.showNotification('Export failed', 'error');
        }
    }

    importFromFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.sessions && Array.isArray(data.sessions)) {
                    if (confirm(`Import ${data.sessions.length} sessions? This will replace current data.`)) {
                        this.sessions = data.sessions;
                        this.saveToStorage();
                        this.renderSessions();
                        this.showNotification(`Imported ${data.sessions.length} sessions successfully`, 'success');
                    }
                } else {
                    throw new Error('Invalid file format');
                }
            } catch (error) {
                console.error('Import failed:', error);
                this.showNotification('Import failed: Invalid file format', 'error');
            }
        };
        
        reader.readAsText(file);
        event.target.value = ''; // Clear file input
    }

    getStorageInfo() {
        try {
            const sessions = localStorage.getItem('sessions') || '[]';
            const gamingSessions = localStorage.getItem('gamingSessions') || '[]';
            
            const sessionsSize = new Blob([sessions]).size;
            const gamingSessionsSize = new Blob([gamingSessions]).size;
            const totalSize = sessionsSize + gamingSessionsSize;
            
            return {
                sessionsCount: JSON.parse(sessions).length,
                gamingSessionsCount: JSON.parse(gamingSessions).length,
                totalSize: this.formatBytes(totalSize),
                lastModified: localStorage.getItem('lastModified') || 'Unknown',
                availableSpace: this.getAvailableStorage()
            };
        } catch (error) {
            console.error('Failed to get storage info:', error);
            return null;
        }
    }

    getAvailableStorage() {
        try {
            // Estimate localStorage usage
            let totalUsed = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    totalUsed += localStorage[key].length;
                }
            }
            const totalAvailable = 5 * 1024 * 1024; // ~5MB typical limit
            return {
                used: this.formatBytes(totalUsed),
                available: this.formatBytes(totalAvailable - totalUsed),
                percentage: Math.round((totalUsed / totalAvailable) * 100)
            };
        } catch (error) {
            return { used: 'Unknown', available: 'Unknown', percentage: 0 };
        }
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    showStorageInfo() {
        const info = this.getStorageInfo();
        if (info) {
            const message = `
📊 LEVELUP STORAGE INFO

📁 Sessions Data:
   • Sessions: ${info.sessionsCount}
   • Gaming Sessions: ${info.gamingSessionsCount}
   • Storage Size: ${info.totalSize}

💾 Storage Usage:
   • Used: ${info.availableSpace.used}
   • Available: ${info.availableSpace.available}
   • Usage: ${info.availableSpace.percentage}%

🕒 Last Modified: ${info.lastModified}
            `;
            alert(message);
        } else {
            this.showNotification('Failed to get storage information', 'error');
        }
    }

    backupToCloud() {
        // Simple backup functionality
        try {
            const backupData = {
                sessions: this.sessions,
                timestamp: new Date().toISOString(),
                version: '1.0'
            };
            
            // For now, just download as backup file
            const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `levelup-backup-${new Date().toISOString().split('T')[0]}-${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification('Backup created successfully', 'success');
        } catch (error) {
            console.error('Backup failed:', error);
            this.showNotification('Backup failed', 'error');
        }
    }

    syncWithAPI() {
        // Manual sync function for when API is available
        this.saveToStorageAndAPI();
        this.showNotification('Syncing with API...', 'info');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        // Set background color based on type
        const colors = {
            success: 'var(--success-color)',
            error: 'var(--error-color)',
            warning: 'var(--warning-color)',
            info: 'var(--primary-purple)'
        };
        notification.style.background = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Simple search functions that work
    showFoodSearchResults() {
        this.updateFoodDropdown();
    }

    showEditFoodSearchResults() {
        this.updateEditFoodDropdown(); 
    }

    showSnackSearchResults() {
        this.updateSnackDropdown();
    }

    showEditSnackSearchResults() {
        this.updateEditSnackDropdown();
    }

    updateFoodDropdown() {
        const searchTerm = document.getElementById('food-search').value.toLowerCase();
        const foodSelect = document.getElementById('food-item');
        
        foodSelect.innerHTML = '<option value="">-- Select Food Item --</option>';
        
        const filteredItems = FOOD_MENU.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );
        
        filteredItems.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.name} - ₹${item.price}`;
            option.textContent = `🍔 ${item.name} - ₹${item.price}`;
            foodSelect.appendChild(option);
        });
    }

    updateEditFoodDropdown() {
        const searchTerm = document.getElementById('edit-food-search').value.toLowerCase();
        const foodSelect = document.getElementById('edit-food-item');
        
        foodSelect.innerHTML = '<option value="">-- Select Food Item --</option>';
        
        const filteredItems = FOOD_MENU.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );
        
        filteredItems.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.name} - ₹${item.price}`;
            option.textContent = `🍔 ${item.name} - ₹${item.price}`;
            foodSelect.appendChild(option);
        });
    }

    updateSnackDropdown() {
        const searchTerm = document.getElementById('snack-search').value.toLowerCase();
        const snackSelect = document.getElementById('snack-item');
        
        snackSelect.innerHTML = '<option value="">-- Select Item --</option>';
        
        const filteredItems = SNACK_MENU.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );
        
        filteredItems.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.name} - ₹${item.price}`;
            option.textContent = `🍿 ${item.name} - ₹${item.price}`;
            snackSelect.appendChild(option);
        });
    }

    updateEditSnackDropdown() {
        const searchTerm = document.getElementById('edit-snack-search').value.toLowerCase();
        const snackSelect = document.getElementById('edit-snack-item');
        
        snackSelect.innerHTML = '<option value="">-- Select Item --</option>';
        
        const filteredItems = SNACK_MENU.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );
        
        filteredItems.forEach(item => {
            const option = document.createElement('option');
            option.value = `${item.name} - ₹${item.price}`;
            option.textContent = `🍿 ${item.name} - ₹${item.price}`;
            snackSelect.appendChild(option);
        });
    }
}

// Initialize the application
const app = new SessionTracker();

// Auto-refresh active sessions every minute
setInterval(() => {
    if (app.sessions.some(s => s.isActive)) {
        app.renderSessions();
    }
}, 60000);
