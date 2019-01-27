process.on("SIGUSR1", (signal) => {
  console.error(`caught ${signal}, rotating my logs`);
});

process.on("SIGUSR2", (signal) => {
  console.error(`caught ${signal}, reloading my config files`);
});

process.on("SIGTERM", (signal) => {
  console.error(`caught ${signal}, shutting down gracefully in 3 seconds`);
  setTimeout(() => {
    clearInterval(interval);
  }, 3000);
});

process.on("SIGINT", (signal) => {
  console.error(`caught ${signal}, shutting down gracefully in 3 seconds`);
  setTimeout(() => {
    clearInterval(interval);
  }, 3000);
});

const interval = setInterval(() => {
  console.error(new Date() + ` - still running...`);
}, 1000);