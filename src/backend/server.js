require('dotenv').config();

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASSWORD);

const express = require('express');
const cors = require('cors');

const sendReportEmail = require('./sendReportEmail');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/send-report-email', async (req, res) => {
  try {
    const { to, subject, htmlContent } =
      req.body;

    if (!to || !to.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email',
      });
    }

    const result = await sendReportEmail({
      to,
      subject,
      htmlContent,
    });

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error,
      });
    }

    return res.json({
      success: true,
      messageId: result.messageId,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log(
    'Server running on port 5000'
  );
});