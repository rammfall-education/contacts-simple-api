import fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { contactsController } from './routes/contacts';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
};

export const server = fastify({
  logger: envToLogger['development'],
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifyCors);
server.register(fastifySwagger);
server.register(fastifySwaggerUi);

server.register(contactsController, {
  prefix: '/api/v1/contacts',
});
