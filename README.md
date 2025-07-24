# Testimonials Web Application

A modern web application for collecting and displaying customer testimonials built with Node.js, Express, Handlebars, and MongoDB.

## Features

- **Submit Testimonials**: Users can submit testimonials with ratings, personal details, and feedback
- **Display Testimonials**: Public page showing approved testimonials with ratings and statistics
- **Form Validation**: Client-side and server-side validation for data integrity
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Rating System**: 5-star rating system with interactive UI
- **Data Persistence**: MongoDB integration for storing testimonials
- **Professional UI**: Clean, modern design with smooth animations

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Templating**: Handlebars (express-handlebars)
- **Styling**: Tailwind CSS
- **Validation**: express-validator
- **Icons**: Font Awesome

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)
- npm (comes with Node.js)

## Installation & Setup

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   
   **On Windows:**
   ```bash
   mongod
   ```
   
   **On macOS (with Homebrew):**
   ```bash
   brew services start mongodb-community
   ```
   
   **On Linux:**
   ```bash
   sudo systemctl start mongod
   ```

4. **Environment Configuration (Optional)**
   
   The app will use the default MongoDB connection (`mongodb://localhost:27017/testimonials_db`).
   
   To use a different MongoDB URI, set the environment variable:
   ```bash
   export MONGODB_URI="your_mongodb_connection_string"
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```
This starts the server with nodemon for automatic restarts during development.

### Production Mode
```bash
npm start
```

The application will be available at: **http://localhost:3000**

## Application Structure

```
testimonials-app/
├── models/
│   └── Testimonial.js          # MongoDB schema and model
├── routes/
│   └── testimonials.js         # Route handlers
├── views/
│   ├── layouts/
│   │   └── main.handlebars     # Main layout template
│   ├── home.handlebars         # Homepage (display testimonials)
│   ├── submit.handlebars       # Testimonial submission form
│   ├── success.handlebars      # Success page
│   ├── error.handlebars        # Error page
│   └── 404.handlebars          # 404 page
├── public/
│   ├── css/
│   │   └── styles.css          # Custom CSS styles
│   └── js/
│       └── app.js              # Client-side JavaScript
├── server.js                   # Main server file
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## API Endpoints

- `GET /` - Homepage displaying all approved testimonials
- `GET /submit` - Testimonial submission form
- `POST /submit` - Handle testimonial submission with validation

## Database Schema

### Testimonial Model
```javascript
{
  name: String (required, 2-100 characters)
  email: String (required, valid email format)
  company: String (optional, max 100 characters)
  position: String (optional, max 100 characters)
  rating: Number (required, 1-5)
  message: String (required, 10-1000 characters)
  isApproved: Boolean (default: true)
  createdAt: Date (default: now)
}
```

## Validation Rules

### Client-side Validation
- Name: 2-100 characters
- Email: Valid email format
- Company: Max 100 characters (optional)
- Position: Max 100 characters (optional)
- Rating: 1-5 stars (required)
- Message: 10-1000 characters

### Server-side Validation
- All client-side rules enforced
- Email normalization
- HTML escaping for security
- MongoDB schema validation

## Features in Detail

### Star Rating System
- Interactive 5-star rating with hover effects
- Visual feedback with color changes
- Required field validation

### Form Validation
- Real-time character counting for message field
- Comprehensive error handling and display
- Form data persistence on validation errors

### Responsive Design
- Mobile-first approach
- Tailwind CSS for consistent styling
- Smooth animations and transitions

### Statistics Dashboard
- Total testimonials count
- Average rating calculation
- Visual indicators and icons

## Customization

### Styling
- Modify `public/css/styles.css` for custom styles
- Update Tailwind classes in templates
- Customize color scheme and animations

### Database Configuration
- Change `MONGODB_URI` environment variable
- Modify schema in `models/Testimonial.js`
- Adjust validation rules as needed

### Content Moderation
- Set `isApproved: false` in the model for manual approval
- Add admin routes for testimonial management
- Implement user authentication if needed

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string format
   - Verify firewall settings

2. **Port Already in Use**
   - Change PORT environment variable
   - Kill process using the port: `lsof -ti:3000 | xargs kill -9`

3. **Dependencies Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

4. **Validation Errors**
   - Check field requirements in the model
   - Verify client-side JavaScript is loading
   - Review server logs for detailed errors

## Production Deployment

### Environment Variables
```bash
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
PORT=3000
```

### Recommended Hosting
- **Backend**: Heroku, DigitalOcean, AWS EC2
- **Database**: MongoDB Atlas, mLab
- **Static Files**: AWS S3, Cloudflare

### Performance Optimization
- Enable gzip compression
- Use MongoDB indexes for better query performance
- Implement caching for frequently accessed data
- Minify CSS and JavaScript files

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section
2. Review MongoDB and Node.js documentation
3. Check server logs for error details
4. Ensure all dependencies are properly installed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Coding!** 🚀