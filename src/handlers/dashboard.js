module.exports = (client) => {
  const app = require('express')();
  const port = process.env.PORT || 3000;

  app.get('/', (req, res) => {
    res.send('Z-Core Bot is running!');
  });

  app.listen(port, () => {
    console.log(`Dashboard running on port ${port}`);
  });
};
