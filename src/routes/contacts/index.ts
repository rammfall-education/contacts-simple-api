import { FastifyPluginCallback } from 'fastify';
import { getContactsController } from './getContacts.controller';
import { createContactController } from './createContactController';
import { updateContactsController } from './updateContactsController';
import { deleteContactController } from './deleteContactController';

export const contactsController: FastifyPluginCallback = (
  instance,
  opts,
  done,
) => {
  instance.register(getContactsController);
  instance.register(createContactController);

  instance.register(updateContactsController);
  instance.register(deleteContactController);
  done();
};
