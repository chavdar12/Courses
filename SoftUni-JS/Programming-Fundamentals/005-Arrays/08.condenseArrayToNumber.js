function condenseArrayToNumber(nums) {
    while (nums.length > 1) {
        nums = nums.slice(1).map((n, i) => nums[i] + n);
    }
    console.log(nums[0]);
}

module.exports = condenseArrayToNumber;
