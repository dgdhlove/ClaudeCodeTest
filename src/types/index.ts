export interface Proposal {
  id: string
  source_url: string
  page_content?: string
  prompt_used?: string
  result: string
  created_at: string
}

export interface PromptConfig {
  id: number
  base_prompt: string
  updated_at: string
}

export interface GenerateResponse {
  proposal: string
  id: string
}
