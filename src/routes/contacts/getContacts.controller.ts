import { FastifyPluginCallback, RouteHandler } from 'fastify';
import { contactsService } from '../../models/contacts';
import { Type } from '@sinclair/typebox';
import { schema } from './schema';

export const getContactsHandler: RouteHandler = (request, reply) => {
  reply.status(200).send(contactsService.getContacts());
};

export const getContactsController: FastifyPluginCallback = (
  instance,
  opts,
  done,
) => {
  instance.get(
    '',
    {
      schema: {
        tags: ['Contact'],
        summary: 'Get all contacts',
        description: 'Get all contacts',
        response: {
          200: Type.Array(schema, {
            description: 'List of contacts',
          }),
        },
      },
    },
    getContactsHandler,
  );

  done();
};
