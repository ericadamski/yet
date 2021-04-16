export interface Todo {
  id: string;
  creator_id: string;
  complete: boolean;
  category_id: string;
  text_content: string;
  created_at: number;
  completed_at: Date | number;
}
