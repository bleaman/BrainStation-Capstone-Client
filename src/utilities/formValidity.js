export function formValidity(loginData) {
	let boolean = true;
	if (loginData.email === "" || loginData.password === "") {
		console.log("Please fill in all fields");
		boolean = false;
	}

	const atSymbolIndex = loginData.email.indexOf("@");
	const dotIndex = loginData.email.indexOf(".", atSymbolIndex);

	if (!(atSymbolIndex > -1 && dotIndex > atSymbolIndex)) {
		console.log("Please fill in a valid email address.");
		boolean = false;
	}

	return boolean;
}
