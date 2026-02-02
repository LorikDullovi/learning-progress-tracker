const Users = require('../models/Users');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}


const register = async (username, email, age, password, role, profilePicture) => {
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      throw new Error("This user already exists");
    }

    const hashedPass = await bcrypt.hash(password, 12);

    const newUser = new Users({
      username,
      email,
      password: hashedPass,
      age,
      profilePicture,
      role
    });

    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword;

  } catch (err) {
    throw err;
  }
}

const login = async (email, password) => { 
  try {
    const user = await findUser(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user.toObject();

    return {
      user: userWithoutPassword,
      accessToken: token
    };

  } catch (err) {
    throw err;
  }
}


const findUser = async (email) => {
  const user = await Users.findOne({ email });
  return user;
}

module.exports = {
  generateToken,
  register,
  login,
  findUser
}
