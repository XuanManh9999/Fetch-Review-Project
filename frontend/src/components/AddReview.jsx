import React, { useState } from 'react'
import './AddReview.css'

const AddReview = ({ products, onAddReview, loading }) => {
  const [formData, setFormData] = useState({
    product_id: '',
    user_name: '',
    rating: 5,
    comment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' || name === 'product_id' ? parseInt(value) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.product_id || !formData.user_name) {
      alert('Please fill in all required fields!')
      return
    }

    setIsSubmitting(true)
    const success = await onAddReview(formData)

    if (success) {
      // Reset form
      setFormData({
        product_id: '',
        user_name: '',
        rating: 5,
        comment: ''
      })
      alert('✅ Review added successfully!')
    }

    setIsSubmitting(false)
  }

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <div className="add-review-container">
      <h2>✍️ Add New Review</h2>

      <form onSubmit={handleSubmit} className="add-review-form">
        <div className="form-group">
          <label htmlFor="product_id">Product *</label>
          <select
            id="product_id"
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            required
            disabled={loading || isSubmitting}
          >
            <option value="">-- Select a product --</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="user_name">Your Name *</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            disabled={loading || isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">
            Rating: {renderStars(formData.rating)} ({formData.rating}/5)
          </label>
          <input
            type="range"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            disabled={loading || isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Share your experience with this product..."
            rows="4"
            disabled={loading || isSubmitting}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success"
          disabled={loading || isSubmitting}
        >
          {isSubmitting ? '⏳ Submitting...' : '✅ Submit Review'}
        </button>
      </form>
    </div>
  )
}

export default AddReview

