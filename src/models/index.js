// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Card, Blog, Post, Comment } = initSchema(schema);

export {
  Card,
  Blog,
  Post,
  Comment
};