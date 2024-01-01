const twilio = require('twilio');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/mobileLoginSchema');

// Twilio setup
// const accountSid = 'your-twilio-account-sid';
// const authToken = 'your-twilio-auth-token';
// const client = new twilio(accountSid, authToken);

// Textlocal credentials
const apiKey='NmY0MzMzNjQzNTUwNGE0YzU0NmY2YzQ0NzA0NzRiNTc=';
const sender='WAYWHL'; // Your registered sender name

// Textlocal API endpoint
// const textlocalEndpoint = 'https://api.textlocal.in/send/';

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
    // Prepare data for sending SMS
    let message = `Your OTP is: ${otp}`;
    const data = {
      apiKey:'NmY0MzMzNjQzNTUwNGE0YzU0NmY2YzQ0NzA0NzRiNTc=',
      numbers: mobileNumber,
      message: message,
      sender:'WAYWHL'
    };

    // const textlocalEndpoint = `https://api.textlocal.in/send/?apiKey=NmY0MzMzNjQzNTUwNGE0YzU0NmY2YzQ0NzA0NzRiNTc=&sender=TXTLCL&numbers=919760492063&message=${message}`;
    const textlocalEndpoint = `https://api.textlocal.in/send/?apiKey=NmY0MzMzNjQzNTUwNGE0YzU0NmY2YzQ0NzA0NzRiNTc=&sender=WAYWHL&numbers=${mobileNumber}&message=Greetings%20from%20WayWheel,%20Your%20Login%20OTP%20is%20${otp}.`;


    // Sending the SMS
    axios.post(textlocalEndpoint, data)
      .then(response => {
        if (response.data.status === 'failure') {
          console.error('Error sending SMS:', response.data.errors[0].message);
          res.status(500).json({ success: false, error: response.data.errors[0].message });
        } else {
          // console.log('SMS sent successfully:', response.data);
          res.json({ success: true, message: 'SMS sent successfully' });
        }
      })
      .catch(error => {
        console.error('Error sending SMS:', error);
        res.status(500).json({ success: false, error: 'Failed to send SMS' });
      });

    // res.json({ success: true, message: 'OTP sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  requestOTP,
};
