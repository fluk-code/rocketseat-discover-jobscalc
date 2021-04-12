module.exports = {
    remainingDays(job) {
        // calculo de tempo restante
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        const createdDate = new Date(job["created-at"])
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay)

        const timeDiffInMs = dueDateInMs - Date.now()

        // transformar millisegundo em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

        // restam x dias
        return dayDiff + job["start-at"]
    },
    started(job){
        const dayInMs = 1000 * 60 * 60 * 24
        const startAtInMs = dayInMs * job["start-at"]
        const started = (Date.now() - startAtInMs) >= job["created-at"] ? true : false   

        return started
        
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}
