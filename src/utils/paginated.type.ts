export type Paginated<T, K extends string> = {
  totalPages: number;
  totalEntities: number;
  isLastPage: boolean;
} & { [k in K]: T[] };
