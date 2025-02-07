 // server/pythonApi.js
const { spawn } = require('child_process');

// Function to call Python script and process answers
const processAnswers = (answers, callback) => {
  // Spawn a Python process
  const pythonProcess = spawn('python', ['./server/aiScript.py', JSON.stringify(answers)]);

  pythonProcess.stdout.on('data', (data) => {
    const result = JSON.parse(data.toString());
    callback(result);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error('Python Error:', data.toString());
    callback({ success: false, message: 'Error processing answers with AI' });
  });
};

module.exports = { processAnswers };

