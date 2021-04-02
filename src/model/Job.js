let data = [
    {
        id: 1,
        name: "Pizzaria Gulosso",
        "daily-hours": 2,
        "total-hours": 1,
        "create-at": Date.now(),
    }, {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3,
        "total-hours": 47,
        "create-at": Date.now(),
    }
]

module.exports = {
    get() {
        return data
    },
    update(newData) {
        data = newData
    },
    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id))
    }
}