// The same requests as requests.http, sent with fetch.
const LOCAL = 'http://localhost:3030/jsonstore';
const COUNTRIES = 'https://restcountries.com/v2';
const EMPLOYEES = 'https://dummy.restapiexample.com/api/v1';

async function json(url, method = 'GET', body, headers = {}) {
    const options = { method, headers };
    if (body) {
        options.headers = { ...headers, 'Content-Type': 'application/json' };
        options.body = JSON.stringify(body);
    }
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }
    return res.json();
}

// 1. REST Countries
export const getCountry = (name) => json(`${COUNTRIES}/name/${name}`);
export const getCountryFields = (name, fields) => json(`${COUNTRIES}/name/${name}?fields=${fields.join(',')}`);
export const getCountriesByLanguage = (lang, fields) => json(`${COUNTRIES}/lang/${lang}?fields=${fields.join(',')}`);

// 2–4. Local practice server
export const getBusStop = (stopId) => json(`${LOCAL}/bus/businfo/${stopId}`);
export const getPhonebook = () => json(`${LOCAL}/phonebook`);
export const addPhone = (person, phone) => json(`${LOCAL}/phonebook`, 'POST', { person, phone });

// 5. Employees
export const employees = {
    getAll: () => json(`${EMPLOYEES}/employees`),
    getOne: (id) => json(`${EMPLOYEES}/employee/${id}`),
    create: (employee) => json(`${EMPLOYEES}/create`, 'POST', employee),
    update: (id, employee) => json(`${EMPLOYEES}/update/${id}`, 'PUT', employee),
    remove: (id) => json(`${EMPLOYEES}/delete/${id}`, 'DELETE')
};

// 6–8. Cloud databases: create, read and delete entries in one collection.
function collection(baseUrl, { suffix = '', headers = {} } = {}) {
    return {
        create: (record) => json(`${baseUrl}${suffix}`, 'POST', record, headers),
        getAll: () => json(`${baseUrl}${suffix}`, 'GET', undefined, headers),
        remove: (id) => json(`${baseUrl}/${id}${suffix}`, 'DELETE', undefined, headers)
    };
}

export const firebase = (databaseUrl) => collection(`${databaseUrl}/books`, { suffix: '.json' });

export const backendless = (appId, restApiKey) => collection(`https://api.backendless.com/${appId}/${restApiKey}/data/Music`);

export const back4app = (appId, restApiKey) => collection('https://parseapi.back4app.com/classes/Students', {
    headers: { 'X-Parse-Application-Id': appId, 'X-Parse-REST-API-Key': restApiKey }
});
