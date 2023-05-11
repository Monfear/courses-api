import crypto from 'crypto';
import util from 'util';

export async function hashPassword (password: string, salt: string): Promise<string> {
    const pbkdf2Modified = util.promisify(crypto.pbkdf2);

    const iterationQuantity: number = 1000;
    const keylen: number = 64;
    const digest = 'sha512';

    const passwordBuffer: Buffer = await pbkdf2Modified(password, salt, iterationQuantity, keylen, digest);
    const passwordHash: string = passwordBuffer.toString('hex');

    return passwordHash;
};