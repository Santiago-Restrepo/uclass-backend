const parseGoogleProfile = profile => {
    const { id, displayName, emails, photos, provider } = profile;
    const [email] = emails;
    const [photo] = photos;
    return {
        googleId: id,
        username: displayName,
        email: email.value,
        photo: photo.value,
        provider
    };
}

module.exports = {
    parseGoogleProfile
};