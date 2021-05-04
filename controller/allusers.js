const handleAllUsers = (req, res, pgDatabase) => {
    pgDatabase
        .select('*')
        .from('users')
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.code }));
}

module.exports = {
    handleAllUsers : handleAllUsers
};