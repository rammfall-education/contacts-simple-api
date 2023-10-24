import { nanoid } from 'nanoid';

type Contact = {
  id: string;
  name: string;
  number: string;
};

const contacts: Contact[] = [];

export const contactsService = {
  addContact({ number, name }: Omit<Contact, 'id'>) {
    const contact = {
      number,
      name,
      id: nanoid(),
    };
    contacts.push(contact);

    return contact;
  },
  getContacts() {
    return contacts;
  },
  editContact({ id }: { id: string }, payload: Partial<Contact>) {
    let contact = contacts.find((item) => item.id === id);
    if (contact) {
      contact = {
        ...contact,
        ...payload,
      };

      return contact;
    }

    return;
  },
  deleteContact({ id }: Pick<Contact, 'id'>) {
    if (!this.isContactExist({ id })) return;

    const contactIndex = contacts.findIndex((item) => item.id === id);
    contacts.splice(contactIndex, 1);
  },
  isContactExist({ id }: Pick<Contact, 'id'>) {
    return !!contacts.find((item) => item.id === id);
  },
};
