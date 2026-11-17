function companyUsers(entries) {
    const companies = {};
    for (const entry of entries) {
        const [company, id] = entry.split(' -> ');
        (companies[company] ??= new Set()).add(id);
    }
    Object.keys(companies)
        .sort((a, b) => a.localeCompare(b))
        .forEach((company) => {
            console.log(company);
            companies[company].forEach((id) => console.log(`-- ${id}`));
        });
}

module.exports = companyUsers;
