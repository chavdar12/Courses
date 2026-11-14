function grades(grade) {
    if (grade < 3) {
        console.log('Fail (2)');
        return;
    }
    let description = 'Excellent';
    if (grade < 3.5) {
        description = 'Poor';
    } else if (grade < 4.5) {
        description = 'Good';
    } else if (grade < 5.5) {
        description = 'Very good';
    }
    console.log(`${description} (${grade.toFixed(2)})`);
}

module.exports = grades;
