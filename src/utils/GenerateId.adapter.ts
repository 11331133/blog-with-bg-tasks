import { nanoid } from 'nanoid/async';

export default async function generateId(): Promise<string> {
  return await nanoid();
}

