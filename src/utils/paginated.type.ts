export type Paginated<T, K extends string> = {
  pageSize: number;
  currentPage: number;
} & { [k in K]: T[] };
