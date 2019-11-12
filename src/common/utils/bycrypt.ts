import * as bcrypt from 'bcrypt';

export class Bcrypt {
  static async getHash(password: string | undefined): Promise<string> {
    return await bcrypt.hash(password, 6);
  }

  static async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
