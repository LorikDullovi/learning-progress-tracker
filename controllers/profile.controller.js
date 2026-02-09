const profileService = require('../services/profile.service');

const createMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = req.body;
        const profile = await profileService.createProfile(userId, data);
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await profileService.getProfile(userId);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = req.body;
        const profile = await profileService.updateProfile(userId, data);
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllProfiles = async (req, res) => {
    try {
        const profiles = await profileService.getAllProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProfileByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const profile = await profileService.getProfile(userId);
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createMyProfile,
    getMyProfile,
    updateMyProfile,
    getAllProfiles,
    getProfileByUserId
};
