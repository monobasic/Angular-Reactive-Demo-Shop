const child_process = require('child_process');

const user = process.env.DB_USER;
const pw = process.env.DB_PASS;
const host = process.env.DB_HOST;

const upload = child_process.spawn('mongoimport', ['-h', 'ds121118.mlab.com:21118', '-d', 'cas-fee-project-2', '-u', user, '-p', pw, '--collection', 'products', '--drop', '--file', './server/ts-source/mockdata/products.json', '--jsonArray']);

upload.stderr.on('data', (data) => {
  console.log(`${data}`);
});

upload.on('close', (code) => {
  if (code === 1) {
    console.log('error restoring database')
    return
  }
  console.log('restoring database succeeded!')
});
