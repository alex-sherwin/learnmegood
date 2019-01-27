## cat - concatenate streams
```bash
cat REFERENCES.md
cat REFERENCES.md > test1
cat REFERENCES.md REFERENCES.md > test2
```

## less - view data

* `q` to quit
* arrows, page up/down to navigate
* `/` to regex search
* `shift + f` for follow mode
* `ctrl + c` to quit follow mode

## vi
```bash
vimtutor
```

```bash
less REFERENCES.md
```

## Standard Stream piping
```bash
echo '{"hello": "world"}' | node stream_pipe.js a | node stream_pipe.js b | node stream_parse.js c
```

## POSIX signals

```bash
# run program
node posix_signals.js

# signal to do custom behaviors
pkill -USR1 -f posix_signals.js
pkill -USR2 -f posix_signals.js

# request to exit
pkill -INT -f posix_signals.js
pkill -TERM -f posix_signals.js

# force exit
pkill -KILL -f posix_signals.js
```