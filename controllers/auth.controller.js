const authService = require('../services/auth.service');

const registerUser = async (req, res) => {
  try {
    const { username, email, password, age, profilePicture, role } = req.body;
    const user = await authService.register(username, email, age, password, role, profilePicture);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await authService.findUser(email);
    if (!userExists) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const user = await authService.login(email, password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    const result = await authService.changePassword(userId, oldPassword, newPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, changePassword };



