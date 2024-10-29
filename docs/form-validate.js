// Email form 

document.getElementById('emailForm').addEventListener('submit', function(event) {
  const emailInput = document.getElementById('email');
  const errorMessage = document.getElementById('error-message');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailInput.value)) {
    errorMessage.textContent = 'Please enter a valid email address.';
    event.preventDefault();
  } else {
    errorMessage.textContent = '';
  }
});

// handle destionation

const destinations = [
  "Ha Long Bay", "Phong Nha-Ke Bang National Park", "Hoan Kiem Lake", "My Son Sanctuary",
  "Complex of Hue Monuments", "Hoi An Ancient Town", "Cu Chi Tunnels", "Mekong Delta",
  "Sapa Terraces", "Ban Gioc Waterfall", "Mui Ne Sand Dunes", "Ninh Binh", "Son Doong Cave",
  "Cat Ba Island", "Da Lat", "Pu Luong Nature Reserve", "Phu Quoc Island", "Con Dao Islands",
  "Ba Na Hills", "Lang Co Beach", "Trang An Landscape Complex", "Tam Coc", "Ba Be Lake",
  "Doc Let Beach", "Cham Island", "Cao Bang", "Ba Na National Park", "Nam Cat Tien National Park",
  "Y Ty", "Tam Dao", "Ly Son Island", "Son Tra Peninsula", "Bac Ha", "Dong Van Karst Plateau Geopark",
  "Ho Tram"
];

const destinationInput = document.getElementById('destination');
const suggestionsContainer = document.getElementById('suggestions');
const emailForm = document.getElementById('emailForm');
const errorMessage = document.getElementById('error-message');

destinationInput.addEventListener('focus', function() {
  showSuggestions(destinations);
});

destinationInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  if (query) {
    const filteredDestinations = destinations.filter(destination =>
      destination.toLowerCase().includes(query)
    );
    showSuggestions(filteredDestinations);
  } else {
    showSuggestions(destinations);
  }
});

document.addEventListener('click', function(event) {
  if (!suggestionsContainer.contains(event.target) && event.target !== destinationInput) {
    suggestionsContainer.innerHTML = '';
  }
});

function showSuggestions(list) {
  suggestionsContainer.innerHTML = '';
  list.forEach(destination => {
    const suggestionDiv = document.createElement('div');
    suggestionDiv.textContent = destination;
    suggestionDiv.addEventListener('click', function() {
      destinationInput.value = destination;
      suggestionsContainer.innerHTML = '';
    });
    suggestionsContainer.appendChild(suggestionDiv);
  });
}

emailForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const phoneInput = document.getElementById('phone');
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phoneInput.value)) {
    errorMessage.textContent = 'Please enter a valid 10-digit phone number.';
    return;
  }
  
  if (emailForm.checkValidity()) {
    errorMessage.textContent = '';
    alert('Form submitted successfully!');
    emailForm.reset(); 
    suggestionsContainer.innerHTML = ''; 
  } else {
    errorMessage.textContent = 'Please fill out all required fields correctly.';
  }
});


