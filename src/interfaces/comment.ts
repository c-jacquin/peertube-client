export interface Comment {
  id: number;
  url: string;
  text: string;
  threadId: number;
  inReplyToCommentId: number;
  videoId: number;
  createdAt: string;
  updatedAt: string;
  totalReplies: number;
  account: Account;
}

export interface CommentsResponse {
  total: number;
  data: Comment[];
}

export interface CommentResponse {
  comment: Comment;
  children: Comment[];
}
