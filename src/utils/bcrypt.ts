import bcrypt from 'bcrypt';

export async function hash(value: string) {
  const saltRounds = 10;
  return await bcrypt.hash(value, saltRounds);
}

export async function compareHash(value: string, compareValue: string) {
  return await bcrypt.compare(value, compareValue);
}