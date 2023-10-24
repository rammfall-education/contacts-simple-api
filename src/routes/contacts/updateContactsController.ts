import { FastifyPluginCallback, RouteHandler } from 'fastify';
import { contactsService } from '../../models/contacts';
import { schema } from './schema';

export const updateContactsHandler: RouteHandler<{
  Params: { id: string };
  Body: {
    number: string;
    name: string;
  };
}> = (request, reply) => {
  const {
    params: { id },
    body,
  } = request;
  const contact = contactsService.editContact({ id }, body);

  return reply.status(200).send(contact);
};

export const updateContactsController: FastifyPluginCallback = (
  instance,
  opts,
  done,
) => {
  instance.patch(
    '/:id',
    {
      schema: {
        summary: 'Update contact by id',
        description: 'Update contact by id',
        body: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 20,
            },
            number: {
              type: 'string',
              minLength: 8,
              maxLength: 16,
            },
          },
        },
        response: {
          200: schema,
        },
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
          },
          required: ['id'],
        },
        tags: ['Contact'],
      },
    },
    updateContactsHandler,
  );

  done();
};
