import * as bcrypt from "bcrypt";
const SALT = 10;

export async function encodePassword(rawPassword: string) {
	const SALT = bcrypt.genSaltSync();
	return bcrypt.hash(rawPassword, SALT);
}

export function comparePasswords(rawPassword: string, hash: string) {
	return bcrypt.compareSync(rawPassword, hash);
}
