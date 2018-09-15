const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
  res.sendFile('.\\index.html')
});

const buffer = (req, res) => {
  const path = '.\\thor.mp4'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
};

app.get('/video', buffer);

const server = app.listen(8089,'0.0.0.0',function(){
	const host = server.address().address;
	const port = server.address().port;

	console.log("Video Streaming app running at http://%s:%s",host, port);
});
