export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  favicon: string;
}

export interface ContentResult extends SearchResult {
  html: string;
}
