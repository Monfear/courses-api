import crypto from 'crypto';
import util from 'util';

export async function hashPassword (password: string, salt: string): Promise<string> {
    const pbkdf2Modified = util.promisify(crypto.pbkdf2);

    const passwordBuffer: Buffer = await pbkdf2Modified(password, salt, 1000, 64, 'sha512');
    const passwordHash: string = passwordBuffer.toString('hex');

    return passwordHash;
};

// crypto.pbkdf2(password, salt, iterations, keylen, digest, callback);

