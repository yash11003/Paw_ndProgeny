const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const multer = require('multer');
const uploadMiddleware = multer({
    dest: 'uploads/',
    limits: { fileSize: 20 * 1024 * 1024 } 
});

const path = require('path');
const fs = require('fs');
const PetModel = require('./models/PetDetails');
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'astrhdgew13';


app.use(cors({"origin": "*"}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose.connect('mongodb+srv://srvyk3:BIPB6RQsOLXhUNXq@cluster0.3yxt3iy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        req.user = user;
        next();
    });
};

app.post('/SignUp', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }
});

app.post('/SignIn', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
        return res.status(400).json('Username not found');
    }
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.json({
                token,
                id: userDoc._id,
                username,
            });
        });
    } else {
        res.status(400).json('Password does not match');
    }
});

app.get('/profile', verifyToken, (req, res) => {
    res.json(req.user);
});

app.post('/Signout', (req, res) => {
    res.json('ok');
});

app.post('/upload', uploadMiddleware.single('file'),verifyToken, async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log(req.file);
    

    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    
    try {
        fs.renameSync(path, newPath);

        const { user } = req;
        const { name, age, gender, breed, email, city } = req.body;

        const petDoc = await PetModel.create({
            name,
            age, email, gender, breed, city,
            cover: newPath,
            owner: user.id,
        });

        res.json(petDoc);
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/myPets', verifyToken, async (req, res) => {
    try {
        const pets = await PetModel.find({ owner: req.user.id }).populate('owner', ['username']).sort({ createdAt: -1 });
        res.json(pets);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/upload/:id', async (req, res) => {
    const id = req.params.id;
    const pet = await PetModel.findById(id).populate('owner', ['username']);
    res.json(pet);
});

app.put('/upload', uploadMiddleware.single('file'), verifyToken, async (req, res) => {
    const { name, age, gender, breed, email, city, id } = req.body;
    const petDoc = await PetModel.findById(id);
    const isOwner = petDoc.owner.toString() === req.user.id.toString();
    if (!isOwner) return res.status(403).json({ message: 'Forbidden' });

    let newCoverPath = petDoc.cover;
    if (req.file) {
        const { originalname, path } = req.file;
        const ext = originalname.split('.').pop();
        newCoverPath = path + '.' + ext;
        fs.renameSync(path, newCoverPath);
    }
    await petDoc.updateOne({ name, age, email, gender, breed, city, cover: newCoverPath });
    res.json(petDoc);
});

app.delete('/delete/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const petDoc = await PetModel.findById(id);
    const isOwner = petDoc.owner.toString() === req.user.id.toString();
    if (!isOwner) return res.status(403).json({ message: 'Forbidden' });

    await petDoc.deleteOne();
    res.json({ message: 'Pet deleted successfully' });
});

app.get('/search', async (req, res) => {
    const { breed, place, gender, age } = req.query;
    const query = {};

    if (place) query.place = { $regex: `^${place}$`, $options: 'i' };
    if (breed) query.breed = { $regex: `^${breed}$`, $options: 'i' };
    if (gender) query.gender = { $regex: `^${gender}$`, $options: 'i' };
    if (age) query.age = age;

    try {
        const pets = await PetModel.find(query).populate('owner', ['username']);
        res.json(pets);
    } catch (error) {
        console.error('Error fetching pets:', error);
        res.status(500).send('Server error');
    }
});

app.listen(4000, () => {
    console.log(`Server is running`);
});
