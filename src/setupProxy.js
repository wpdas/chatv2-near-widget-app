module.exports = function (app) {
  app.use(function (req, res, next) {
    res.setHeader("Bypass-Tunnel-Reminder", "");
    res.setHeader("User-Agent", "foo");
    next();
  });
};
