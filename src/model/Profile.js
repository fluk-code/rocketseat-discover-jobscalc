let data = {
    name: "Felipe Ricardo",
    avatar: "https://avatars.githubusercontent.com/u/80411354?v=4",
    "monthly-budget": 3000,
    "hours-per-day": 8,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75,
}

module.exports = {
    get() {
        return data
    },
    update(newData) {
        data = newData
    }
}