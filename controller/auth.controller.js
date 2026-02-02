//here his the controller i want to make for registering and logging please dont make the logic because we make in auth.service.js

const authService = require('../services/auth.service');

const registerUser = async (req, res) => {
  try {
    const{username, email, password, age, profilePicture} = req.body;
    const user = await authService.register({username, email, password, age, profilePicture});
    res.status(201).json(user);
  }
    catch (error) {
    res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
    const {email, password} = req.body;
    const userExists = await authService.findUserByEmail(email);
    if (!userExists) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
   const user = await userService.login(email, password);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "Invalid credentials" });
        }
    }
    catch (error) {
    res.status(400).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };



    