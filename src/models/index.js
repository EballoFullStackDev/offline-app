// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TodoStatus = {
  "COMPLETED": "COMPLETED",
  "INPROGRESS": "INPROGRESS"
};

const { Message, Todo } = initSchema(schema);

export {
  Message,
  Todo,
  TodoStatus
};