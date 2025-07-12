// server.js - Main entry point for the backend server

// Import necessary modules
const express = require('express'); // Web framework for Node.js
const mongoose = require('mongoose'); // MongoDB object modeling tool
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for creating and verifying JSON Web Tokens
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const dotenv = require('dotenv'); // Loads environment variables from a .env file

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware
// Enable CORS for all origins (you might want to restrict this in production)
app.use(cors());
// Parse JSON bodies of incoming requests
app.use(express.json());

// --- MongoDB Connection ---
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rewear_db';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- User Model (Mongoose Schema) ---
// This defines the structure of documents in the 'users' collection
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email addresses are unique
        lowercase: true, // Stores emails in lowercase
        trim: true // Removes whitespace from both ends of a string
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Enforces a minimum password length
    },
    points: {
        type: Number,
        default: 0 // New users start with 0 points
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the creation timestamp
    }
});

// Pre-save hook to hash the password before saving a new user
UserSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }
    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10); // 10 rounds of salting
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error); // Pass any error to the next middleware
    }
});

// Create the User model from the schema
const User = mongoose.model('User', UserSchema);

// --- Item Model (Mongoose Schema) ---
// This defines the structure of clothing items in the 'items' collection
const ItemSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    condition: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }], // Array of strings for tags
    points: { type: Number, required: true, min: 1 },
    imageUrl: { type: String, default: 'https://placehold.co/600x400/E0E7FF/3B82F6?text=Clothing+Item' },
    uploader: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User',
        required: true
    },
    uploaderEmail: { type: String, required: true }, // Store email for easier display
    status: {
        type: String,
        enum: ['available', 'pending', 'swapped', 'redeemed'], // Possible statuses
        default: 'available'
    },
    acquiredBy: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User who acquired it
        ref: 'User',
        default: null
    },
    acquiredAt: {
        type: Date,
        default: null
    },
    createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', ItemSchema);

// --- Authentication Middleware ---
// This middleware protects routes that require a logged-in user
const authMiddleware = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use a strong secret from .env
        req.user = decoded.user; // Attach user payload to the request object
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// --- API Routes ---

// @route   POST /api/register
// @desc    Register a new user
// @access  Public
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    if (password.length < 6) {
        return res.status(400).json({ msg: 'Password should be at least 6 characters' });
    }

    try {
        // Check for existing user
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user instance
        user = new User({
            email,
            password // Password will be hashed by the pre-save hook
        });

        // Save user to database
        await user.save();

        // Create and return JWT
        const payload = {
            user: {
                id: user.id // MongoDB's _id is converted to 'id' by Mongoose
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ msg: 'User registered successfully', token, userId: user.id });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during registration');
    }
});

// @route   POST /api/login
// @desc    Authenticate user & get token
// @access  Public
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare provided password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create and return JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ msg: 'Login successful', token, userId: user.id });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during login');
    }
});

// @route   GET /api/auth
// @desc    Get logged in user data (protected route)
// @access  Private
app.get('/api/auth', authMiddleware, async (req, res) => {
    try {
        // Find user by ID from the token payload, exclude password
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/users/:id/points
// @desc    Get user's points
// @access  Private (or Public if you want to show other users' points)
app.get('/api/users/:id/points', authMiddleware, async (req, res) => {
    try {
        // Ensure the requested ID matches the authenticated user's ID for private data
        if (req.params.id !== req.user.id) {
            return res.status(403).json({ msg: 'Unauthorized access to points' });
        }
        const user = await User.findById(req.params.id).select('points');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({ points: user.points });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error fetching points');
    }
});

// @route   POST /api/items
// @desc    Add a new clothing item
// @access  Private
app.post('/api/items', authMiddleware, async (req, res) => {
    const { title, description, category, type, size, condition, tags, points, imageUrl } = req.body;

    // Basic validation
    if (!title || !description || !category || !type || !size || !condition || !points) {
        return res.status(400).json({ msg: 'Please enter all required item fields' });
    }
    if (isNaN(points) || points < 1) {
        return res.status(400).json({ msg: 'Points must be a positive number' });
    }

    try {
        const user = await User.findById(req.user.id).select('email');
        if (!user) {
            return res.status(404).json({ msg: 'Uploader user not found' });
        }

        // Process tags:
        let processedTags = [];
        if (typeof tags === 'string' && tags.trim() !== '') {
            processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        } else if (Array.isArray(tags)) {
            processedTags = tags.map(tag => String(tag).trim()).filter(tag => tag); // Ensure array elements are strings
        }
        // If tags is null/undefined/empty string, processedTags will be an empty array.

        const newItem = new Item({
            title,
            description,
            category,
            type,
            size,
            condition,
            tags: processedTags, // Use the processedTags array
            points,
            imageUrl: imageUrl || `https://placehold.co/600x400/E0E7FF/3B82F6?text=${title ? encodeURIComponent(title) : 'Clothing+Item'}`, // Encode title for URL
            uploader: req.user.id, // Associate item with the authenticated user's ID
            uploaderEmail: user.email,
            status: 'available'
        });

        const item = await newItem.save();

        // Award points to the uploader (e.g., 10 points per listing)
        user.points += 10;
        await user.save();

        res.status(201).json({ msg: 'Item listed successfully!', item, newPoints: user.points });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error when adding item');
    }
});

// @route   GET /api/items
// @desc    Get all available clothing items (excluding current user's)
// @access  Public (but filtered by current user if logged in)
app.get('/api/items', authMiddleware, async (req, res) => {
    try {
        let items = await Item.find({ status: 'available' }).populate('uploader', 'email'); // Populate uploader email
        // Filter out items uploaded by the current user if logged in
        if (req.user && req.user.id) {
            items = items.filter(item => item.uploader.toString() !== req.user.id);
        }
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error fetching items');
    }
});

// @route   GET /api/items/:id
// @desc    Get single item by ID
// @access  Public
app.get('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('uploader', 'email');
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        console.error(err.message);
        // Handle invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Item not found' });
        }
        res.status(500).send('Server error fetching item');
    }
});

// @route   GET /api/users/:userId/listings
// @desc    Get items listed by a specific user
// @access  Private (only for authenticated user's own listings)
app.get('/api/users/:userId/listings', authMiddleware, async (req, res) => {
    try {
        // Ensure the requested userId matches the authenticated user's ID
        if (req.params.userId !== req.user.id) {
            return res.status(403).json({ msg: 'Unauthorized access to listings' });
        }
        const listings = await Item.find({ uploader: req.params.userId }).sort({ createdAt: -1 });
        res.json(listings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error fetching user listings');
    }
});

// @route   POST /api/items/:id/redeem
// @desc    Redeem an item via points
// @access  Private
app.post('/api/items/:id/redeem', authMiddleware, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        if (item.uploader.toString() === req.user.id) {
            return res.status(400).json({ msg: 'You cannot redeem your own item' });
        }
        if (item.status !== 'available') {
            return res.status(400).json({ msg: 'Item is not available for redemption' });
        }

        const buyer = await User.findById(req.user.id);
        if (!buyer) {
            return res.status(404).json({ msg: 'Buyer user not found' });
        }
        if (buyer.points < item.points) {
            return res.status(400).json({ msg: `Insufficient points. You need ${item.points} points.` });
        }

        const uploader = await User.findById(item.uploader);
        if (!uploader) {
            return res.status(404).json({ msg: 'Uploader user not found' });
        }

        // Deduct points from buyer
        buyer.points -= item.points;
        await buyer.save();

        // Add points to uploader
        uploader.points += item.points;
        await uploader.save();

        // Update item status
        item.status = 'redeemed';
        item.acquiredBy = buyer._id;
        item.acquiredAt = new Date();
        await item.save();

        // Optionally, record the transaction in a separate collection if needed
        // For now, we'll consider it done by updating item and user points

        res.json({ msg: `Successfully redeemed "${item.title}" for ${item.points} points!`, item, buyerPoints: buyer.points });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during item redemption');
    }
});


// @route   GET /api/users/:userId/purchases
// @desc    Get items acquired by a specific user
// @access  Private (only for authenticated user's own purchases)
app.get('/api/users/:userId/purchases', authMiddleware, async (req, res) => {
    try {
        // Ensure the requested userId matches the authenticated user's ID
        if (req.params.userId !== req.user.id) {
            return res.status(403).json({ msg: 'Unauthorized access to purchases' });
        }
        // Find items that were acquired by this user
        const purchases = await Item.find({ acquiredBy: req.params.userId }).sort({ acquiredAt: -1 });
        res.json(purchases);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error fetching user purchases');
    }
});


// --- Server Listening ---
const PORT = process.env.PORT || 5000; // Use port from environment variable or default to 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// --- Important Notes for Setup ---
// 1. Create a .env file in the same directory as server.js
//    Add the following variables:
//    MONGODB_URI=your_mongodb_connection_string_here (e.g., mongodb://localhost:27017/rewear_db or your Atlas URI)
//    JWT_SECRET=a_very_strong_random_secret_key (e.g., generated by a password generator)
//
// 2. Install dependencies:
//    npm init -y
//    npm install express mongoose bcryptjs jsonwebtoken cors dotenv
//
// 3. To run the server:
//    node server.js
//
// 4. For development, consider using nodemon for automatic restarts:
//    npm install -g nodemon
//    nodemon server.js
