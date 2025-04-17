// Simulated database with image URLs (using Unsplash placeholders)
const meatProducts = [
    { 
        id: 1, 
        type: "Beef", 
        cut: "Sirloin", 
        origin: "USA", 
        protein: "25g", 
        fat: "10g", 
        calories: "200kcal", 
        seasonality: "Year-round", 
        image: "../images/beef_png.png" 
    },
    { 
        id: 2, 
        type: "Chicken", 
        cut: "Breast", 
        origin: "Brazil", 
        protein: "30g", 
        fat: "3g", 
        calories: "165kcal", 
        seasonality: "Year-round", 
        image: "../images/chicken_png.jpg" 
    },
    { 
        id: 3, 
        type: "Mutton", 
        cut: "Loin", 
        origin: "Canada", 
        protein: "22g", 
        fat: "12g", 
        calories: "190kcal", 
        seasonality: "Fall-Winter", 
        image: "../images/mutton_png.jpg" 
    }
];

let clients = [
    { 
        id: 1, 
        name: "Ashik", 
        goal: "Weight Loss", 
        preference: "Chicken", 
        region: "Bangladesh", 
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
    },
    { 
        id: 2, 
        name: "Ananaya", 
        goal: "Muscle Gain", 
        preference: "Beef", 
        region: "Canada", 
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
    }
];

const demandTrends = [
    { meatType: "Beef", region: "USA", demand: "High", seasonality: "Year-round", priceTrend: "Stable" },
    { meatType: "Chicken", region: "Brazil", demand: "Moderate", seasonality: "Year-round", priceTrend: "Rising" },
    { meatType: "Mutton", region: "Canada", demand: "Low", seasonality: "Fall-Winter", priceTrend: "Declining" }
];

// DOM elements
const contentDiv = document.getElementById('content');
const meatLookupLink = document.getElementById('meatLookupLink');
const demandTrendsLink = document.getElementById('demandTrendsLink');
const clientsLink = document.getElementById('clientsLink');
const logoutLink = document.getElementById('logoutLink');

// Logout functionality
function logout() {
    alert('You have been logged out.');
    // In a real app, clear auth tokens and redirect to login page
    // For demo, reset to homepage
    contentDiv.innerHTML = `
        <h2>Welcome to the Meat Product Dashboard</h2>
        <p class="welcome-text">Explore meat product data, analyze consumer demand trends, or manage your clients with ease.</p>
        <div class="homepage-grid">
            <div class="homepage-card">
                <img src="https://images.unsplash.com/photo-1585931451828-a7fdbb0f4930?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&q=80" alt="Beef">
            </div>
            <div class="homepage-card">
                <img src="https://images.unsplash.com/photo-1615937691194-97ddec1e5f8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&q=80" alt="Chicken">
            </div>
            <div class="homepage-card">
                <img src="https://images.unsplash.com/photo-1625631987369-54b9e6f5c39c?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&q=80" alt="Pork">
            </div>
            <div class="homepage-card">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&q=80" alt="Nutritionist">
            </div>
        </div>
    `;
}

// Feature 1: Meat Product Nutritional Lookup
function showMeatLookup() {
    contentDiv.innerHTML = `
        <h2>Meat Product Nutritional Lookup</h2>
        <input type="text" id="searchBar" class="search-bar" placeholder="Search by meat type or cut...">
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Type</th>
                    <th>Cut</th>
                    <th>Origin</th>
                    <th>Protein</th>
                    <th>Fat</th>
                    <th>Calories</th>
                    <th>Seasonality</th>
                </tr>
            </thead>
            <tbody id="meatTableBody">
                ${meatProducts.map(product => `
                    <tr>
                        <td><img src="${product.image}" alt="${product.type}" class="meat-img"></td>
                        <td>${product.type}</td>
                        <td>${product.cut}</td>
                        <td>${product.origin}</td>
                        <td>${product.protein}</td>
                        <td>${product.fat}</td>
                        <td>${product.calories}</td>
                        <td>${product.seasonality}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    document.getElementById('searchBar').addEventListener('input', searchMeat);
}

function searchMeat() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredProducts = meatProducts.filter(product => 
        product.type.toLowerCase().includes(searchTerm) || 
        product.cut.toLowerCase().includes(searchTerm)
    );
    const meatTableBody = document.getElementById('meatTableBody');
    meatTableBody.innerHTML = filteredProducts.map(product => `
        <tr>
            <td><img src="${product.image}" alt="${product.type}" class="meat-img"></td>
            <td>${product.type}</td>
            <td>${product.cut}</td>
            <td>${product.origin}</td>
            <td>${product.protein}</td>
            <td>${product.fat}</td>
            <td>${product.calories}</td>
            <td>${product.seasonality}</td>
        </tr>
    `).join('');
}

// Feature 2: Demand Trend Insights
function showDemandTrends() {
    contentDiv.innerHTML = `
        <h2>Consumer Demand Trends</h2>
        <table>
            <thead>
                <tr>
                    <th>Meat Type</th>
                    <th>Region</th>
                    <th>Demand Level</th>
                    <th>Seasonality</th>
                    <th>Price Trend</th>
                </tr>
            </thead>
            <tbody>
                ${demandTrends.map(trend => `
                    <tr>
                        <td>${trend.meatType}</td>
                        <td>${trend.region}</td>
                        <td>${trend.demand}</td>
                        <td>${trend.seasonality}</td>
                        <td>${trend.priceTrend}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <p class="welcome-text">Use these trends to tailor dietary recommendations based on popular and cost-effective meat products in specific regions.</p>
    `;
}

// Feature 3: Client Management
function showClients() {
    contentDiv.innerHTML = `
        <h2>Client Management</h2>
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Goal</th>
                    <th>Preference</th>
                    <th>Region</th>
                </tr>
            </thead>
            <tbody>
                ${clients.map(client => `
                    <tr>
                        <td><img src="${client.image}" alt="${client.name}" class="client-img"></td>
                        <td>${client.name}</td>
                        <td>${client.goal}</td>
                        <td>${client.preference}</td>
                        <td>${client.region}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <div>
            <h3>Add New Client</h3>
            <div class="form-group">
                <input id="clientName" type="text" placeholder="Name">
                <input id="clientGoal" type="text" placeholder="Goal">
                <select id="clientPreference">
                    <option value="">Select Meat Preference</option>
                    ${meatProducts.map(product => `<option value="${product.type}">${product.type}</option>`).join('')}
                </select>
                <input id="clientRegion" type="text" placeholder="Region">
                <input id="clientImage" type="text" placeholder="Image URL (optional)">
                <button class="add-btn" onclick="addClient()">Add</button>
            </div>
        </div>
    `;
}

function addClient() {
    const name = document.getElementById('clientName').value;
    const goal = document.getElementById('clientGoal').value;
    const preference = document.getElementById('clientPreference').value;
    const region = document.getElementById('clientRegion').value;
    const image = document.getElementById('clientImage').value || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80";
    if (name && goal && preference && region) {
        clients.push({ id: clients.length + 1, name, goal, preference, region, image });
        showClients();
    } else {
        alert('Please fill in all required fields');
    }
}

// Event listeners
meatLookupLink.addEventListener('click', showMeatLookup);
demandTrendsLink.addEventListener('click', showDemandTrends);
clientsLink.addEventListener('click', showClients);
logoutLink.addEventListener('click', logout);