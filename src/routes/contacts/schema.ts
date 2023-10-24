import { Type, Static } from '@sinclair/typebox';

export const schema = Type.Object(
  {
    id: Type.String(),
    name: Type.String({
      minLength: 2,
      maxLength: 20,
    }),
    number: Type.String({
      minLength: 8,
      maxLength: 16,
    }),
  },
  {
    description: 'Contact',
  },
);

export const schemaWithoutId = Type.Pick(schema, ['name', 'number']);
export const schemaError = Type.Object({
  message: Type.String(),
  error: Type.String(),
});

export type Schema = Static<typeof schema>;
export type SchemaWithoutId = Static<typeof schemaWithoutId>;
export type SchemaError = Static<typeof schemaError>;
