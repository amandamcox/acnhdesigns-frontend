export const sortResults = results =>
	results.sort((a, b) => b.upvotes - a.upvotes)
