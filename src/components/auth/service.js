import client, {
	removeAuthorizationHeader,
	setAuthorizationHeader,
} from '../../api/client';

import storage from '../../utils/storage';

const config = {
	headers: {
		'Content-Type': 'multipart/form-data',
	},
};

export const login = ({ remember, ...credentials }) => {
	return client.post('/api/login', credentials).then(({ token }) => {
		setAuthorizationHeader(token);
		storage.remove('auth');
		if (remember) {
			storage.set('auth', token);
		}
		return token;
	});
};

export const logout = () => {
	return Promise.resolve().then(() => {
		removeAuthorizationHeader();
		storage.remove('auth');
	});
};

export const setAd = (newAd) => {
	return client.post('/api/adverts', newAd, config);
};

export const forgottenPassword = (credentials) => {
	return client
		.post('/api/requestPasswordReset', credentials)
		.then((credentials) => (credentials));
};
export const changePassword = (credentials) => {
	return client
		.put('/api/passwordChange', credentials)
		.then((credentials) => credentials);
};

export const emailContact = (credentials) => {
	return client
		.post('/api/contactEmail', credentials)
		.then((credentials) => (credentials));
};
// export const getTags = async () => {
//   return await client.get("/api/adverts/categories")
// }