export enum AnthropicModel {
  CLAUDE_3_SONNET = "claude-3-sonnet-20240229"
}

export interface Message {
  role: Role;
  content: string;
}

export type Role = "assistant" | "user" | "system";
