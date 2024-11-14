require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req, res) => {
  const responseHTML = `
    <html>
      <head><title>Our Project</title></head>
      <body>
        <h1>Welcome to Our Project</h1>
        <table border="1">
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Roll NO</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Hafiz Syed Abdul Rehman</td>
            <td>BsCS_F20_379</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Shayan Tahir</td>
            <td>BsCS_F20_312</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Huzaifa Hanif</td>
            <td>BsCS_F20_360</td>
          </tr>
        </table>
      </body>
    </html>
  `;
  res.send(responseHTML);
});

app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
