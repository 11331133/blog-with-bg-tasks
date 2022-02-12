export default interface IBaseRepository<T> {
  persist(entity: T): Promise<void>;
  merge(entity: T): Promise<void>;
  findOne(id: string): Promise<T | null>;
  findByIds(ids: string[]): Promise<T[] | null>;
  deleteOne(id: string): Promise<void>;
}
