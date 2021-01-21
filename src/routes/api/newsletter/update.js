import fetch from 'node-fetch';

export async function put({
	body: {
		email, jmeno, prijmeni, note,
	},
}, res, next) {
	if (email && (jmeno || prijmeni || note)) {
		const result = await fetch(`${process.env.ECOMAIL_URL}/lists/1/update-subscriber`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				key: process.env.ECOMAIL_KEY,
			},
			body: JSON.stringify({
				email,
				subscriber_data: {
					name: jmeno,
					surname: prijmeni,
					custom_fields: {
						note,
					},
				},
			}),
		}).then((body) => body.json());
		console.log('result from ecomail update fn: ', result);

		if (result !== null) {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(result));
		} else {
			next();
		}
	}
}
