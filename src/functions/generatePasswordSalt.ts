import crypto from 'crypto';

export function generatePasswordSalt(): string {
    const passwordSalt: string = crypto.randomBytes(64).toString('hex');

    return passwordSalt;
};