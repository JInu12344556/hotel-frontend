import React, { useState } from 'react';

const generateRandomAmenities = () => {
  const amenities = ['Free Wi-Fi', 'Breakfast', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking', 'Room Service', 'Bar'];
  const randomAmenities = [];
  const numAmenities = Math.floor(Math.random() * (amenities.length - 1)) + 1; // Random number of amenities between 1 and the length of amenities
  for (let i = 0; i < numAmenities; i++) {
    const randomIndex = Math.floor(Math.random() * amenities.length);
    randomAmenities.push(amenities[randomIndex]);
  }
  return randomAmenities;
};

const generateRandomPrice = () => {
  return `${Math.floor(Math.random() * 10000)}rs`; // Random price up to 10000
};

const generateRandomHotel = (id, location) => {
  return {
    id,
    location,
    details: {
      Hotelname: `${location} Hotel ${id}`,
      amenities: generateRandomAmenities(),
      price: generateRandomPrice()
    }
  };
};

const HotelList = () => {
  // Sample hotel data
  const [hotels] = useState(() => {
    const locations = ['Egmore', 'Santhome', 'Nungambakkam'];
    const generatedHotels = [];
    for (let location of locations) {
      for (let i = 1; i <= 5; i++) {
        generatedHotels.push(generateRandomHotel(i, location));
      }
    }
    return generatedHotels;
  });

  // State to store search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State to store search result
  const [searchResult, setSearchResult] = useState(null);

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handler for search button click
  const handleSearchClick = () => {
    // Filter hotels based on search query
    const result = hotels.filter(hotel => hotel.location.toLowerCase() === searchQuery.toLowerCase()).slice(0, 5);
    if (result.length === 0) {
      // If no hotels found, set searchResult to the message
      setSearchResult("We don't have hotels for the location you have entered");
    } else {
      // Otherwise, set searchResult to the filtered hotels
      setSearchResult(result);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-box"
        placeholder="Search hotels by location..."
      />
      <button className="search-button" onClick={handleSearchClick}>Search</button>

      {/* Render hotel details */}
      {searchResult && typeof searchResult === 'string' ? (
        <div>{searchResult}</div>
      ) : (
        searchResult && searchResult.map(hotel => (
          <div key={hotel.id} className="hotel-result">
            <h2>{hotel.details.Hotelname}</h2>
            <p>Location: {hotel.location}</p>
            <p>Amenities: {hotel.details.amenities.join(', ')}</p>
            <p>Price: {hotel.details.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default HotelList;
