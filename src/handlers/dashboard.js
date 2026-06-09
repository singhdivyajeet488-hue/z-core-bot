module.exports = (client) => {
  const express = require('express');
  const app = express();
  const port = process.env.PORT || 3000;

  app.get('/', (req, res) => {
    res.send('Z-Core Bot is running!');
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`Dashboard running on port ${port}`);
  });
};
