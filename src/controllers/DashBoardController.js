const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')


module.exports = {
    async index(req, res) {
        const jobs = await Job.get()
        const profile = await Profile.get()
        
        let statusCount = {
            progress: 0,
            done: 0,
            standby: 0,
            total: jobs.length
        }

        // Total de horas por dia de cada job em progresso
        let jobTotalHours = 0

        const updateJobs = jobs.map((job) => {
            // ajustes no job

            const started = JobUtils.started(job);
            const remaining = JobUtils.remainingDays(job)
            let status = 'standby'
            
            if(started){
                status = remaining <= 0 ? 'done' : 'progress'
            }

            // Somando a quantidade de status 
            statusCount[status] += 1

            // Soma a qtd de horas por dia dos Jobs em progresso
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        // QTD de hora que quer trabalhar por dia MENOS QTD hora/dia de cada Job em progress
        const freeHours = profile["hours-per-day"] - jobTotalHours;

        return res.render('index', { jobs: updateJobs, profile: profile, statusCount: statusCount, freeHours })
    }
}