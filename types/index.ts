export enum AnthropicModel {
  CLAUDE_3_SONNET = "claude-3-5-sonnet-20240620"
}

export interface Message {
  role: Role;
  content: string;
}

export type Role = "assistant" | "user" | "system";
