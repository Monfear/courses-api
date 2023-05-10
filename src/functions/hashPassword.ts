import crypto from 'crypto';
import util from 'util';

export const hashPassword = util.promisify(crypto.pbkdf2);

// crypto.pbkdf2( password, salt, iterations, keylen, digest, callback )
// crypto.pbkdf2(plainTextPassword, passwordSalt, 1000, 64, 'sha512', function (err, hash) {

// });
