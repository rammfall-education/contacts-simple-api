import { FastifyPluginCallback, RouteHandler } from 'fastify';
import { contactsService } from '../../models/contacts';

const deleteContactHandler: RouteHandler<{ Params: { id: string } }> = (
  request,
  reply,
) => {
  const { id } = request.params;

  contactsService.deleteContact({ id });
  reply.status(200).send('OK');
};

export const deleteContactController: FastifyPluginCallback = (
  instance,
  opts,
  done,
) => {
  instance.delete(
    '/:id',
    {
      schema: {
        tags: ['Contact'],
        summary: 'Delete contact by id',
        description: 'Delete contact by id',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
          },
          required: ['id'],
        },
        response: {
          200: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    deleteContactHandler,
  );

  done();
};
