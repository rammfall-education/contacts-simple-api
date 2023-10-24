import { FastifyPluginCallback, RouteHandler } from 'fastify';
import { Schema, schema, schemaWithoutId, SchemaWithoutId } from './schema';
import { contactsService } from '../../models/contacts';

const createContactHandler: RouteHandler<{
  Body: SchemaWithoutId;
  Reply: Schema;
}> = (request, reply) => {
  const { number, name } = request.body;

  const contact = contactsService.addContact({ number, name });

  reply.status(201).send(contact);
};

export const createContactController: FastifyPluginCallback = (
  instance,
  opts,
  done,
) => {
  instance.post(
    '',
    {
      schema: {
        tags: ['Contact'],
        summary: 'Create contact',
        description: 'Create contact',
        body: schemaWithoutId,
        response: {
          201: schema,
        },
      },
    },
    createContactHandler,
  );

  done();
};
