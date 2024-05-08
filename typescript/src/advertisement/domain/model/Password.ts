import * as argon2 from "argon2";
import { createHash } from "node:crypto";

export class Password {
  private readonly hash: string;

  constructor(hash: string) {
    this.hash = hash;
  }

  public static createFromHash(hash: string): Password {
    return new Password(hash);
  }

  public static async createFromPlain(plain: string): Promise<Password> {
    const hash = await argon2.hash(plain);
    return new Password(hash);
  }

  public async isVerifiedBy(password: string): Promise<boolean> {
    if (password.startsWith("$argon2")) {
      return await argon2.verify(password, this.hash);
    } else {
      return this.hash === createHash('md5').update(password).digest('hex');
    }
  }

  public value() {
    return this.hash;
  }
}