// Build and host a REST API (Method: POST) using any online code editor (codesandbox.io) that takes
// in an array and returns the following:
// 1. Status
// 2. User ID
// 3. Email ID
// 4. College Roll Number
// 5. Array for even numbers
// 6. Array for odd numbers
// 7. Array for alphabets, converted to uppercase
// Your API will accept the array, filter the odd numbers, even numbers and alphabet as mentioned in the
// examples, and should always return is_success, user_id, roll_number and email.

// Insert the code here
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port
app.use(express.json()); // Middleware for parsing JSON data
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded data
app.use(express.static('public')); // Middleware for serving static files

// Replace with your actual user ID and details (optional)
const userId = "Bikramjeet Singh";
const email = "bikramjeet1671.be21@chitkara.edu.in";
const rollNumber = "2110991671";

app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data;

    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid request: data is missing or not an array');
    }

    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];

    for (const item of data) {
      if (typeof item === 'string') {
        alphabets.push(item.toUpperCase());
      } else if (typeof item === 'number') {
        if (item % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }
      } else {
        throw new Error('Invalid data type in array');
      }
    }

    const response = {
      is_success: true,
      user_id: userId,
      email: email,
      roll_number: rollNumber,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ is_success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
