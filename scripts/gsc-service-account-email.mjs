const serviceAccountRaw = process.env.GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON;

if (!serviceAccountRaw) {
  throw new Error('Google Search Console service-account credential is unavailable.');
}

const { client_email: clientEmail } = JSON.parse(serviceAccountRaw);
if (!clientEmail) {
  throw new Error('The configured Google Search Console credential has no service-account email.');
}

console.log(clientEmail);
