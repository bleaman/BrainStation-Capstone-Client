import * as Keychain from "react-native-keychain";

export async function retrieveToken() {
	try {
		const credentials = await Keychain.getGenericPassword();
		if (credentials) {
			console.log("Credentials successfully loaded for user " + credentials.username);
			return credentials.password;
		} else {
			console.log("No credentials stored");
			return null;
		}
	} catch (error) {
		console.log("Keychain couldn't be accessed!", error);
		return null;
	}
}

export async function storeToken(token) {
	try {
		const result = await Keychain.setGenericPassword(token);
		console.log("Credentials saved successfully!");
		return result;
	} catch (error) {
		console.log("Keychain couldn't be accessed!", error);
	}
}

export async function checkTokenInKeychain() {
	const credentials = await Keychain.getGenericPassword();
	return !!credentials;
}

export function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
