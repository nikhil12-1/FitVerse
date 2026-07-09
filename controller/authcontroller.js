const user = require("../model/user.js");
const logger = require("../configs/logger.js");
const mailSender = require("../configs/sendEmail.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const buildWelcomeEmailHtml = (name) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to FitVerse</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:620px;margin:32px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.08);">
        <div style="background:linear-gradient(135deg,#2563eb,#7c3aed);padding:32px 24px;text-align:center;color:#ffffff;">
          <h1 style="margin:0 0 8px;font-size:28px;">Welcome to FitVerse</h1>
          <p style="margin:0;font-size:16px;opacity:0.95;">Your fitness journey starts here.</p>
        </div>

        <div style="padding:32px 24px;color:#1f2937;">
          <p style="margin:0 0 12px;font-size:18px;">Hi ${name || "there"},</p>
          <p style="margin:0 0 16px;line-height:1.7;">
            Thanks for joining FitVerse. We are excited to help you build strength,
            stay consistent, and reach your goals with confidence.
          </p>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 18px;margin:20px 0;">
            <p style="margin:0 0 8px;font-weight:700;">What you can do next:</p>
            <ul style="margin:0;padding-left:18px;line-height:1.7;">
              <li>Explore workout plans tailored to your goals</li>
              <li>Track your progress and stay motivated</li>
              <li>Join a community that keeps you moving</li>
            </ul>
          </div>

          <a href="https://example.com" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:700;">
            Start Exploring
          </a>
        </div>

        <div style="padding:0 24px 24px;text-align:center;color:#64748b;font-size:12px;">
          <p style="margin:0;">This email was sent from FitVerse.</p>
        </div>
      </div>
    </body>
  </html>
`;

module.exports = {
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const existing = await user.findOne({ email: email });
      const passwordMatch = await bcrypt.compare(password, existing.password);
      if (existing && passwordMatch) {
        const token = jwt.sign(
          { id: existing._id, role: existing.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          },
        );
        return res
          .status(200)
          .json({ message: "Login successful", token: token });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      logger.error("Error occurred while logging in:", error);
      res.status(500).json({ error: error.message });
    }
  },
  Register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await user.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash_register = bcrypt.hashSync(password, salt);
      const newUser = await user.create({
        name: name,
        email: email,
        password: hash_register,
      });
      logger.info(`User registered successfully: ${newUser.email}`);

      const info = await mailSender.sendMail({
        from: process.env.SMTP_FROM || "nikhil120820@gmail.com",
        to: email,
        subject: "Welcome to FitVerse",
        text: `Hi ${name || "there"}, welcome to FitVerse!`,
        html: buildWelcomeEmailHtml(name),
      });
      logger.info(`Email Sent: ${info.messageId}`);
      res.status(200).json({ message: "Register successfully", data: newUser });
    } catch (error) {
      logger.error("Error occurred while registering user:", error);
      res.status(500).json({ error: error.message });
    }
  },
  Search: async (req, res) => {
    try {
      const email = req.query.email;
      const existing = await user.findOne({ email: email });
      if (existing) {
        res.status(200).json({ message: existing });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
