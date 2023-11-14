const twilio = require('twilio');

const User = require('../models/mobileLoginSchema');

// Twilio setup
// const accountSid = 'your-twilio-account-sid';
// const authToken = 'your-twilio-auth-token';
// const client = new twilio(accountSid, authToken);

// Generate OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const requestOTP = async (req, res) => {
  const { mobileNumber } = req.body;

  const otp = generateOTP();

  try {
    // Save mobile number and OTP in the database
    await User.findOneAndUpdate(
      { mobileNumber },
      { $set: { mobileNumber, otp } },
      { upsert: true, new: true }
    );

    // Send OTP via SMS using Twilio
    // await client.messages.create({
    //   body: `Your OTP is: ${otp}`,
    //   to: `+${mobileNumber}`,
    //   from: 'your-twilio-phone-number',
    // });

    res.json({ success: true, message: 'OTP sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  requestOTP,
};
