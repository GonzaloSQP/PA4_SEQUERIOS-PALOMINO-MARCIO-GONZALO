let userProfile = {
  id: 1,
  name: 'John Doe',
  email: 'user@example.com',
  studentId: '123456789'
};

class ProfileService {
  static getProfile() {
    return userProfile;
  }

  static updateProfile(updatedData) {
    userProfile = { ...userProfile, ...updatedData };
    return userProfile;
  }
}

module.exports = ProfileService;