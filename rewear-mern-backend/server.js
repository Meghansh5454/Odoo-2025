// server.js - Main entry point for the backend server

// Import necessary modules
const express = require('express'); // Web framework for Node.js
const mongoose = require('mongoose'); // MongoDB object modeling tool
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for creating and verifying JSON Web Tokens
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const dotenv = require('dotenv'); // Loads environment variables from a .env file
const multer = require('multer');
const path = require('path');

// Set up Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

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
    name: { // Added for profile editing
        type: String,
        default: '',
        trim: true
    },
    phone: { // Added for profile editing
        type: String,
        default: '',
        trim: true
    },
    bio: { // Added for profile editing
        type: String,
        default: '',
        trim: true,
        maxlength: 300
    },
    location: { // Added for profile editing
        type: String,
        default: '',
        trim: true
    },
    avatar: { // Added for profile editing (URL to avatar image)
        type: String,
        default: '' // Can be a placeholder URL or empty
    },
    preferences: { // Added for user preferences
        notifications: { type: Boolean, default: true },
        publicProfile: { type: Boolean, default: true },
        showLocation: { type: Boolean, default: true }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
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
    size: { type: String, required: true, trim: true }, // Remains String for text input
    condition: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }], // Array of strings for tags
    points: { type: Number, required: true, min: 1 },
    imageUrl: { type: String, default: 'https://placehold.co/600x400/E0E7FF/3B82F6?text=Clothing+Item' },
    // You can add an array of images for a gallery if needed:
    // images: [{ type: String }],
    uploader: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User',
        required: true
    },
    uploaderEmail: { type: String, required: true }, // Store email for easier display
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'redeemed'],
        default: 'pending'
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

// --- Rating Model (Mongoose Schema) ---
const RatingSchema = new mongoose.Schema({
    rater: { // User who gave the rating
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ratedUser: { // User who received the rating
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    swapId: { // Reference to the swap transaction (if applicable)
        type: String, // Or mongoose.Schema.Types.ObjectId if you have a Swap model
        required: false // Not all ratings might be tied to a formal swap ID
    },
    itemId: { // Reference to the item involved in the swap
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: false
    },
    rating: { // Star rating (e.g., 1 to 5)
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        trim: true,
        maxlength: 500
    },
    type: { // 'given' by current user, 'received' by current user
        type: String,
        enum: ['given', 'received'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Rating = mongoose.model('Rating', RatingSchema);

// --- Notification Model (Mongoose Schema) ---
const NotificationSchema = new mongoose.Schema({
    userId: { // The user who should receive this notification
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: { // e.g., 'swap_accepted', 'item_redeemed', 'new_rating', 'message'
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    link: { // Optional link to a relevant page (e.g., swap details, item details)
        type: String,
        default: ''
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Notification = mongoose.model('Notification', NotificationSchema);

const PendingRatingSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    createdAt: { type: Date, default: Date.now }
});
const PendingRating = mongoose.model('PendingRating', PendingRatingSchema);

// --- PendingItem Model (Mongoose Schema) ---
const PendingItemSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    condition: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    points: { type: Number, required: true, min: 1 },
    imageUrl: { type: String, default: 'https://placehold.co/600x400/E0E7FF/3B82F6?text=Clothing+Item' },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    uploaderEmail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const PendingItem = mongoose.model('PendingItem', PendingItemSchema);


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

    // Static admin check
    if (email === 'admin@example.com' && password === 'admin1') {
        const payload = {
            user: {
                id: 'static-admin-id',
                role: 'admin'
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ 
                    msg: 'Admin login successful', 
                    token, 
                    userId: 'static-admin-id', 
                    role: 'admin' 
                });
            }
        );
        return;
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
                id: user.id,
                role: user.role // Include role in payload
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ msg: 'Login successful', token, userId: user.id, role: user.role });
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
    if (req.user.id === 'static-admin-id') {
        return res.json({
            _id: 'static-admin-id',
            email: 'admin@example.com',
            role: 'admin',
            points: 0,
            createdAt: new Date(0)
        });
    }
    try {
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

// @route   GET /api/users/:id
// @desc    Get user profile by ID (for profile page, could be public or private)
// @access  Public (or Private if you only want authenticated users to see full profiles)
app.get('/api/users/:id', async (req, res) => {
    if (req.params.id === 'static-admin-id') {
        return res.json({
            _id: 'static-admin-id',
            email: 'admin@example.com',
            role: 'admin',
            points: 0,
            createdAt: new Date(0)
        });
    }
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server error fetching user profile');
    }
});

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private
app.put('/api/users/:id', authMiddleware, async (req, res) => {
    // Ensure the requested ID matches the authenticated user's ID
    if (req.params.id !== req.user.id) {
        return res.status(403).json({ msg: 'Unauthorized: You can only update your own profile' });
    }

    const { name, phone, bio, location, avatar, preferences } = req.body;
    const updateFields = { name, phone, bio, location, avatar, preferences };

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true, runValidators: true, select: '-password' } // Return updated doc, run schema validators, exclude password
        );

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({ msg: 'Profile updated successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error updating profile');
    }
});


// @route   GET /api/users/:id/points
// @desc    Get user's points
// @access  Private (or Public if you want to show other users' points)
app.get('/api/users/:id/points', authMiddleware, async (req, res) => {
    if (req.params.id === 'static-admin-id') {
        return res.json({ points: 0 });
    }
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
// @desc    Add a new clothing item (pending approval)
// @access  Private
app.post('/api/items', authMiddleware, async (req, res) => {
    const { title, description, category, type, size, condition, tags, points, imageUrl } = req.body;
    if (!title || !description || !category || !type || !size || !condition || !points) {
        return res.status(400).json({ msg: 'Please enter all required item fields' });
    }
    if (isNaN(points) || points < 1) {
        return res.status(400).json({ msg: 'Points must be a positive number' });
    }
    try {
        const user = await User.findById(req.user.id).select('email points');
        if (!user) {
            return res.status(404).json({ msg: 'Uploader user not found' });
        }
        let processedTags = [];
        if (typeof tags === 'string' && tags.trim() !== '') {
            processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        } else if (Array.isArray(tags)) {
            processedTags = tags.map(tag => String(tag).trim()).filter(tag => tag);
        }
        const newPendingItem = new PendingItem({
            title,
            description,
            category,
            type,
            size,
            condition,
            tags: processedTags,
            points,
            imageUrl: imageUrl || `https://placehold.co/600x400/E0E7FF/3B82F6?text=${title ? encodeURIComponent(title) : 'Clothing+Item'}`,
            uploader: req.user.id,
            uploaderEmail: user.email
        });
        await newPendingItem.save();
        res.status(201).json({ msg: 'Item submitted for admin approval!' });
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
        let items = await Item.find({ status: 'approved' }).populate('uploader', 'email'); // Populate uploader email
        // Filter out items uploaded by the current user if logged in
        if (req.user && req.user.id) {
            items = items.filter(item => item.uploader._id.toString() !== req.user.id); // Use _id from populated uploader
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
            console.error('Redemption failed: Item not found');
            return res.status(404).json({ msg: 'Item not found' });
        }
        if (item.uploader.toString() === req.user.id) {
            console.error('Redemption failed: User is uploader', { uploader: item.uploader, user: req.user.id });
            return res.status(400).json({ msg: 'You cannot redeem your own item' });
        }
        if (item.status !== 'approved') {
            console.error('Redemption failed: Item status not approved', { status: item.status });
            return res.status(400).json({ msg: 'Item is not available for redemption' });
        }

        const buyer = await User.findById(req.user.id);
        if (!buyer) {
            console.error('Redemption failed: Buyer user not found', { userId: req.user.id });
            return res.status(404).json({ msg: 'Buyer user not found' });
        }
        if (buyer.points < item.points) {
            console.error('Redemption failed: Insufficient points', { buyerPoints: buyer.points, itemPoints: item.points });
            return res.status(400).json({ msg: `Insufficient points. You need ${item.points} points.` });
        }

        const uploader = await User.findById(item.uploader);
        if (!uploader) {
            console.error('Redemption failed: Uploader user not found', { uploaderId: item.uploader });
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

        // --- Create Notification for Uploader ---
        if (uploader.preferences.notifications) {
            const notification = new Notification({
                userId: uploader._id,
                type: 'item_redeemed',
                message: `Your item "${item.title}" was redeemed by ${buyer.email} for ${item.points} points!`,
                link: `/item-detail/${item._id}`
            });
            await notification.save();
            console.log(`Notification created for ${uploader.email}: Item Redeemed`);
        }

        // Create a pending rating record
        await PendingRating.create({
            buyer: buyer._id,
            seller: uploader._id,
            item: item._id
        });

        res.json({ msg: `Successfully redeemed "${item.title}" for ${item.points} points!`, item, buyerPoints: buyer.points });

    } catch (err) {
        console.error('Server error during item redemption:', err);
        res.status(500).json({ msg: 'Server error during item redemption', error: err.message });
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

// --- Ratings API Endpoints ---

// @route   POST /api/ratings
// @desc    Submit a new rating
// @access  Private
app.post('/api/ratings', authMiddleware, async (req, res) => {
    const { ratedUserId, swapId, itemId, rating, comment, type } = req.body;

    if (!ratedUserId || !rating || !type) {
        return res.status(400).json({ msg: 'Rated user ID, rating, and type are required.' });
    }
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ msg: 'Rating must be between 1 and 5.' });
    }
    if (req.user.id === ratedUserId) {
        return res.status(400).json({ msg: 'You cannot rate yourself.' });
    }

    try {
        const newRating = new Rating({
            rater: req.user.id,
            ratedUser: ratedUserId,
            swapId,
            itemId,
            rating,
            comment,
            type // 'given' or 'received' from the perspective of the rater
        });

        await newRating.save();

        // Optionally, update the average rating for the ratedUser here
        // This would involve fetching all ratings for ratedUser, calculating average, and updating User model.
        // For simplicity, we'll skip average calculation for now.

        // --- Create Notification for Rated User ---
        const ratedUser = await User.findById(ratedUserId);
        if (ratedUser && ratedUser.preferences.notifications) {
            const notification = new Notification({
                userId: ratedUser._id,
                type: 'new_rating',
                message: `You received a ${rating}-star rating from ${req.user.email}!`,
                link: `/ratings` // Link to the ratings page
            });
            await notification.save();
            console.log(`Notification created for ${ratedUser.email}: New Rating`);
        }

        // Remove the pending rating after submission
        await PendingRating.deleteOne({ buyer: req.user.id, seller: ratedUserId, item: itemId });

        res.status(201).json({ msg: 'Rating submitted successfully!', rating: newRating });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error submitting rating');
    }
});

// @route   GET /api/users/:userId/ratings/history
// @desc    Get a user's rating history (given and received)
// @access  Private (only for authenticated user's own ratings)
app.get('/api/users/:userId/ratings/history', authMiddleware, async (req, res) => {
    if (req.params.userId !== req.user.id) {
        return res.status(403).json({ msg: 'Unauthorized access to ratings history' });
    }
    try {
        // Find ratings where current user is either the rater or the rated user
        const ratings = await Rating.find({
            $or: [
                { rater: req.user.id },
                { ratedUser: req.user.id }
            ]
        })
        .populate('rater', 'email avatar') // Populate rater's email and avatar
        .populate('ratedUser', 'email avatar') // Populate rated user's email and avatar
        .populate('itemId', 'title') // Populate item title if available
        .sort({ createdAt: -1 });

        // Adjust 'type' based on current user's perspective for frontend display
        const formattedRatings = ratings.map(rating => ({
            ...rating._doc,
            type: rating.rater._id.toString() === req.user.id ? 'given' : 'received',
            userName: rating.rater._id.toString() === req.user.id ? rating.ratedUser.email : rating.rater.email,
            userAvatar: rating.rater._id.toString() === req.user.id ? rating.ratedUser.avatar : rating.rater.avatar,
            itemName: rating.itemId ? rating.itemId.title : 'N/A'
        }));

        res.json(formattedRatings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error fetching ratings history');
    }
});

// @route   GET /api/users/:userId/ratings/pending
// @desc    Get pending ratings for a user (where they are the buyer)
// @access  Private
app.get('/api/users/:userId/ratings/pending', authMiddleware, async (req, res) => {
    if (req.params.userId !== req.user.id) {
        return res.status(403).json({ msg: 'Unauthorized access to pending ratings' });
    }
    try {
        const pending = await PendingRating.find({ buyer: req.user.id })
            .populate('seller', 'email avatar')
            .populate('item', 'title');
        res.json(pending);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error fetching pending ratings');
    }
});

// --- Notifications API Endpoints ---

// @route   GET /api/users/:userId/notifications
// @desc    Get all notifications for a user
// @access  Private
app.get('/api/users/:userId/notifications', authMiddleware, async (req, res) => {
    if (req.params.userId !== req.user.id) {
        return res.status(403).json({ msg: 'Unauthorized access to notifications' });
    }
    try {
        const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error fetching notifications');
    }
});

// @route   PUT /api/notifications/:id/read
// @desc    Mark a notification as read
// @access  Private
app.put('/api/notifications/:id/read', authMiddleware, async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ msg: 'Notification not found' });
        }
        // Ensure the notification belongs to the authenticated user
        if (notification.userId.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Unauthorized to mark this notification as read' });
        }

        notification.read = true;
        await notification.save();
        res.json({ msg: 'Notification marked as read', notification });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error marking notification as read');
    }
});

// --- Admin Middleware ---
const adminMiddleware = (req, res, next) => {
    if (!req.user) return res.status(401).json({ msg: 'Not authenticated' });
    
    // Check for static admin
    if (req.user.id === 'static-admin-id' && req.user.role === 'admin') {
        return next();
    }
    
    // Check database admin
    User.findById(req.user.id).then(user => {
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Admin only.' });
        }
        next();
    }).catch(err => {
        console.error(err.message);
        res.status(500).send('Server error');
    });
};

// --- Admin API Endpoints ---

// @route   GET /api/admin/items/pending
// @desc    Get all pending items for admin approval
// @access  Private (Admin only)
app.get('/api/admin/items/pending', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const items = await PendingItem.find({})
            .populate('uploader', 'email name')
            .sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error fetching pending items');
    }
});

// @route   GET /api/admin/items/all
// @desc    Get all items for admin oversight
// @access  Private (Admin only)
app.get('/api/admin/items/all', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const items = await Item.find({})
            .populate('uploader', 'email name')
            .sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error fetching all items');
    }
});

// @route   PUT /api/admin/items/:id/approve
// @desc    Approve a pending item (move to Item collection)
// @access  Private (Admin only)
app.put('/api/admin/items/:id/approve', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const pendingItem = await PendingItem.findById(req.params.id);
        if (!pendingItem) {
            return res.status(404).json({ msg: 'Pending item not found' });
        }
        // Move to Item collection
        const item = new Item({
            title: pendingItem.title,
            description: pendingItem.description,
            category: pendingItem.category,
            type: pendingItem.type,
            size: pendingItem.size,
            condition: pendingItem.condition,
            tags: pendingItem.tags,
            points: pendingItem.points,
            imageUrl: pendingItem.imageUrl,
            uploader: pendingItem.uploader,
            uploaderEmail: pendingItem.uploaderEmail,
            status: 'approved',
            createdAt: pendingItem.createdAt
        });
        await item.save();
        await PendingItem.findByIdAndDelete(req.params.id);
        // Optionally notify uploader here
        res.json({ msg: 'Item approved and published!', item });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error approving item');
    }
});

// @route   PUT /api/admin/items/:id/reject
// @desc    Reject a pending item (delete from PendingItem)
// @access  Private (Admin only)
app.put('/api/admin/items/:id/reject', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const pendingItem = await PendingItem.findByIdAndDelete(req.params.id);
        if (!pendingItem) {
            return res.status(404).json({ msg: 'Pending item not found' });
        }
        // Optionally notify uploader here
        res.json({ msg: 'Item rejected and removed.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error rejecting item');
    }
});

// @route   DELETE /api/admin/items/:id
// @desc    Delete an item (admin only)
// @access  Private (Admin only)
app.delete('/api/admin/items/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item not found' });
        }

        await Item.findByIdAndDelete(req.params.id);

        // Create notification for uploader if item was approved/rejected
        if (item.status !== 'pending') {
            const notification = new Notification({
                userId: item.uploader,
                type: 'item_removed',
                message: `Your item "${item.title}" has been removed by an administrator.`,
                link: `/dashboard`
            });
            await notification.save();
        }

        res.json({ msg: 'Item deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error deleting item');
    }
});

// @route   POST /api/upload
// @desc    Upload an image
// @access  Private
app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    // Return the URL to the uploaded image
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


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
//    npm install express mongoose bcryptjs jsonwebtoken cors dotenv multer path
//
// 3. To run the server:
//    node server.js
//
// 4. For development, consider using nodemon for automatic restarts:
//    npm install -g nodemon
//    nodemon server.js
