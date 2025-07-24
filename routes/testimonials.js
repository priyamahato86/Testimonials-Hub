
const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Testimonial = require('../models/Testimonial');

const router = express.Router();

// Home page 
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection not available');
    }
    
    const testimonials = await Testimonial.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    const stats = {
      total: testimonials.length,
      averageRating: testimonials.length > 0
        ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
        : 0
    };

    res.render('home', {
      title: 'Customer Testimonials',
      testimonials,
      stats
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    const errMsg = error.message.includes('Database') 
      ? 'Database connection unavailable. Please make sure MongoDB is running.' 
      : 'Unable to load testimonials at this time.';
    res.status(500).render('error', { message: errMsg });
  }
});

// Show the testimonial form
router.get('/submit', (req, res) => {
  res.render('submit', {
    title: 'Share Your Experience',
    errors: [],
    formData: {}
  });
});

// Validation & sanitization rules
const testimonialValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),

  body('company')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters')
    .escape(),

  body('position')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Position cannot exceed 100 characters')
    .escape(),

  body('rating')
    .exists()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5')
    .toInt(),

  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
    .escape()
];

// Handle testimonial submission
router.post('/submit', testimonialValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    return res.render('submit', {
      title: 'Share Your Experience',
      errors: errors.array(),
      formData: req.body
    });
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection not available');
    }

    const testimonial = new Testimonial({
      name: req.body.name,
      email: req.body.email,
      company: req.body.company || '',
      position: req.body.position || '',
      rating: req.body.rating,
      message: req.body.message
    });

    await testimonial.save();

    // Option A: render a success page
    return res.render('success', {
      title: 'Thank You!',
      message: 'Your testimonial has been submitted successfully!'
    });

    // Option B (PRG pattern):
  
  } catch (error) {
    console.error('Error saving testimonial:', error);

    if (error.name === 'ValidationError') {
      const mongoErrors = Object.values(error.errors).map(err => ({
        param: err.path,
        msg: err.message
      }));
      return res.render('submit', {
        title: 'Share Your Experience',
        errors: mongoErrors,
        formData: req.body
      });
    }

    const isConnErr = error.message.includes('Database');
    res.status(isConnErr ? 500 : 500).render('error', {
      message: isConnErr
        ? 'Database connection unavailable. Please make sure MongoDB is running.'
        : 'Unable to submit testimonial at this time.'
    });
  }
});

module.exports = router;
