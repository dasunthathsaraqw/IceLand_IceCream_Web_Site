const mongoose = require('mongoose');
const Admin = require('./models/Admin'); // Adjust the path

mongoose.connect('mongodb+srv://collectionfactor:kRlVFWPutDofTr4W@iceland.bmwjywq.mongodb.net/?retryWrites=true&w=majority&appName=iceLand', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const newAdmin = new Admin({
  email: 'admin@example.com',
  password: '123456',  
  name: 'Super Admin'
});

newAdmin.save()
  .then(() => {
    console.log('Admin created successfully');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error creating admin:', err);
    mongoose.disconnect();
  });