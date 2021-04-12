const Database = require('../db/config')

module.exports = {
    async get() {
        const db = await Database()
        const jobs = await db.all(`SELECT * FROM jobs`)
        await db.close()

        return await jobs.map(job => ({
            // Normalizar para não precisar alterar na views os - para _ (Ex: monthly_budget para monthly-budget)
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            "start-at": job.start_at,
            "created-at": job.created_at
        }))
    },
    async update(updatedJob, jobId) {
        const db = await Database()
        await db.run(`
            UPDATE 
                jobs 
            SET
                name = "${updatedJob.name}",
                daily_hours = ${updatedJob["daily-hours"]},
                total_hours = ${updatedJob["total-hours"]},
                start_at = ${updatedJob["start-at"]}
            WHERE 
                id = ${jobId}
        `)
        await db.close()
    },
    async delete(id) {
        const db = await Database()
        await db.run(`DELETE FROM jobs WHERE id = ${id}`)
        await db.close()
    },
    async create(newData) {
        const db = await Database()
        const jobs = await db.run(`
            INSERT INTO 
            jobs 
            (
                name,
                daily_hours,
                total_hours, 
                start_at,
                created_at            
            )
            VALUES
            (
                "${newData.name}",
                ${newData["daily-hours"]},
                ${newData["total-hours"]},
                ${newData["start-at"]},
                ${newData["create-at"]}
            )
        `)
        await db.close()
    }
}