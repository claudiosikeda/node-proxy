const http = require('http');
const axios = require('axios');

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');

  const headers = {
    Authorization: 'api-key'
  }

  const { url, method } = req;
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const domain = 'http://replace-api-url.com';
  const endpoint = `${domain}${url}`;

  console.log(`requesting ${endpoint}...`);
  axios.get(endpoint, { headers })
    .then(response => {
      console.log('finished successfully');
      res.write(JSON.stringify(response.data));
      res.end();
    })
    .catch((error) => {
      console.log('finished with error');
      res.write(JSON.stringify(error));
      res.end();
    })
});

server.listen(4200);
