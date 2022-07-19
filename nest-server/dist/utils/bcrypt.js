"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.encodePassword = void 0;
const bcrypt = require("bcrypt");
const SALT = 10;
async function encodePassword(rawPassword) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hash(rawPassword, SALT);
}
exports.encodePassword = encodePassword;
function comparePasswords(rawPassword, hash) {
    console.log(bcrypt.compareSync(rawPassword, hash));
    return bcrypt.compareSync(rawPassword, hash);
}
exports.comparePasswords = comparePasswords;
//# sourceMappingURL=bcrypt.js.map