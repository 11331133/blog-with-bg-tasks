export type Paginated<T, K extends string> = {
  totalPages: number;
  totalEntities: number;
} & { [k in K]: T[] };
