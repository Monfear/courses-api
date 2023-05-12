import crypto from 'crypto';

export function generateKey(): string {
    const key: string = crypto.randomBytes(32).toString('hex');

    return key;
};