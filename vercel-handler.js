const app = require('./backend/server');

module.exports = path => (req, res) => {
    req.url = path;
    return app(req, res);
};
