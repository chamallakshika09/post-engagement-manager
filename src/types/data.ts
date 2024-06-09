export type Post = {
  key: string;
  name: string;
  platform: string;
  engaged: string;
  acquired: number;
  conversion: string;
  enablePrivateReply: boolean;
  sendOncePerPost: boolean;
  requiredReactions: string[];
  excludeKeywords: string[];
  triggerKeywords: string[];
  messageType: string;
  flow: string;
  enableAutoLike: boolean;
  commentType: string;
  comments: string[];
  message: string;
  integrationType: string;
  assistanceType: string;
};
