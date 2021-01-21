import fetch from 'node-fetch';

export async function post(req, res, next) {
	const rawResult = await fetch(`${process.env.ECOMAIL_URL}/lists/1/subscribe`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			key: process.env.ECOMAIL_KEY,
		},
		body: JSON.stringify({ subscriber_data: { email: req.body.email } }),
	}).then((body) => body.json());
	const result = { email: rawResult.email, already_subscribed: rawResult.already_subscribed };

	if (rawResult !== null) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(result));
	} else {
		next();
	}
}
