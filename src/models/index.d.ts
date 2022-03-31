import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CardPostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BlogMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class CardPost {
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<CardPost, CardPostMetaData>);
  static copyOf(source: CardPost, mutator: (draft: MutableModel<CardPost, CardPostMetaData>) => MutableModel<CardPost, CardPostMetaData> | void): CardPost;
}

export declare class Blog {
  readonly id: string;
  readonly name: string;
  readonly posts?: (Post | null)[] | null;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Blog, BlogMetaData>);
  static copyOf(source: Blog, mutator: (draft: MutableModel<Blog, BlogMetaData>) => MutableModel<Blog, BlogMetaData> | void): Blog;
}

export declare class Post {
  readonly id: string;
  readonly title: string;
  readonly blogID: string;
  readonly comments?: (Comment | null)[] | null;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly isCompleted?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class Comment {
  readonly id: string;
  readonly postID: string;
  readonly content: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Comment, CommentMetaData>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}