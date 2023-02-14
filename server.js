const express = require('express');
const child_process = require('child_process');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/compile', (req, res) => {
  const code = req.body.code;
  const language = req.body.language;
  
  let command;
  
  if (language === 'python') {
    command = `python -c "${code}"`;
  } else if (language === 'node') {
    command = `node -e "${code}"`;
  } else {
    res.send({
      error: 'Invalid language'
    });
    return;
  }
  
  child_process.exec(command, (error, stdout, stderr) => {
    if (error) {
      res.send({
        error: stderr
      });
    } else {
      res.send({
        output: stdout
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
