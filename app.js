const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true,
  auth: {
    user: "devriousteam@gmail.com",
    pass: "xsmtpsib-59d53fdf227388f930c459c42860c2db0473309c91d978c2a4ac189f2f48db0b-9nP4F0Wby8G2OqHV",
  },
});

app.use('/assets', express.static('assets'));

app.post("/sendmail", async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  const mailOptions = {
    from: email,
    to: "info@devrious.lk",
    subject: `New Service Inquiry from ${name}`,
    text: `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Service Interested: ${service}
    
    Project Details: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.get('/sitemap', function (req, res) {
  res.sendFile(__dirname + '/assets/sitemap.xml');
});

app.get('/robots.txt', (req, res) => {
  const filePath = path.join(__dirname, 'robots.txt');
  res.sendFile(filePath);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/assets/index.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname + '/assets/404-v2.html'));
});


app.listen(process.env.PORT || 3000);