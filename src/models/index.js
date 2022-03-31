// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { CardPost, Blog, Post, Comment } = initSchema(schema);

export {
  CardPost,
  Blog,
  Post,
  Comment
};