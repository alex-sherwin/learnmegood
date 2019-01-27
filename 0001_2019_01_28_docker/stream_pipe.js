const myname = process.argv[2];
console.error(`stream_pipe [${myname}]`);

process.stdin.pipe(process.stdout);
