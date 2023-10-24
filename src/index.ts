import { server } from './server';

server
  .listen({
    host: '0.0.0.0',
    port: 3040,
  })
  .catch(() => {
    process.exit(1);
  });
