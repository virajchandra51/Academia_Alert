const app = require('./app');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("Radhe Radhe!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});