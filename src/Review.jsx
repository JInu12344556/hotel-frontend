import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const [newReview, setNewReview] = useState({ name: '', title: '', content: '', rating: 0 });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/reviews'); // Adjust port as per your backend server
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error.message);
    }
  };

  const saveReview = async (review) => {
    try {
      const response = await axios.post('http://localhost:3000/api/reviews', review);
      console.log('Review saved successfully', response);
      fetchReviews(); // Refresh reviews after saving
    } catch (error) {
      console.error('Error saving review:', error.message);
    }
  };
  
  const submitReview = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.title && newReview.content && newReview.rating > 0 && newReview.rating <= 5) {
      const review = { ...newReview, id: Math.floor(Math.random() * 1000000) };
      saveReview(review);
      setNewReview({ name: '', title: '', content: '', rating: 0 });
    } else {
      console.error('Please fill all fields and provide a valid rating (1-5).');
    }
  };
  

  return (
    <div>
      <form className="form-container" onSubmit={submitReview}>
        <input
          type="text"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          placeholder="Your Name"
          required
        />
        <input
          type="text"
          value={newReview.title}
          onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
          placeholder="Review Title"
          required
        />
        <textarea
          value={newReview.content}
          onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
          placeholder="Your Review"
          required
        />
        <input
          type="number"
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          required
        />
        <button type="submit">Submit Review</button>
      </form>

      <div>
  <h2>Existing Reviews:</h2>
  {reviews === null ? (
    <p>Loading reviews...</p>
  ) : reviews.length === 0 ? (
    <p>No reviews yet.</p>
  ) : (
    reviews.map((review) => (
      <div className="review" key={review.id}> {/* Assign unique key here */}
        <h3>{review.title}</h3>
        <p>{review.content}</p>
        <p className="rating">Rating: {review.rating}</p>
        <p className="name">By: {review.name}</p>
      </div>
    ))
  )}
</div>
</div>
  );
};

export default Reviews;
