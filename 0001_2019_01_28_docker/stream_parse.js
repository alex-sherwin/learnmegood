const myname = process.argv[2];
console.error(`stream_parse [${myname}]`);

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    const obj = JSON.parse(chunk);
    console.error(`parsed object`, obj);
  }
});
