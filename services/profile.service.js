const Profile = require('../models/Profile');
const User = require('../models/Users');

const createProfile = async (userId, data) => {
    try {
        const existingProfile = await Profile.findOne({ userId });
        if (existingProfile) {
            throw new Error('Profile already exists for this user');
        }
        const profile = new Profile({ userId, ...data });
        await profile.save();
        return profile;
    } catch (error) {
        throw error;
    }
};

const getProfile = async (userId) => {
    try {
        const profile = await Profile.findOne({ userId });
        if (!profile) return null;
        return profile;
    } catch (error) {
        throw error;
    }
};

const updateProfile = async (userId, data) => {
    try {
        const profile = await Profile.findOneAndUpdate(
            { userId },
            data,
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return profile;
    } catch (error) {
        throw error;
    }
};

const getAllProfiles = async () => {
    try {
        const profiles = await Profile.find().populate('userId', 'email role name surname age');
        return profiles;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createProfile,
    getProfile,
    updateProfile,
    getAllProfiles
};
