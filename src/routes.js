const express = require('express')
const routes = express.Router()

const basePath = __dirname + "/views"

const Profile = {
    data: {
        name: "Felipe Ricardo",
        avatar: "https://avatars.githubusercontent.com/u/80411354?v=4",
        "monthly-budget": 3000,
        "hours-per-day": 8,
        "days-per-week": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    
    controllers: {
        index (req, res){
            return res.render(basePath + '/profile',{ Profile: Profile.data })
        },
        update (req, res){
            // Req.body para pegar os dados
            const data = req.body
            // Definir quantidade de semanas do ano: 52
            const weeksPerYear = 52
            // Remover as semanas de ferias do ano para pegar a quantidade de semas em um mes
            const weekPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
            // Total de horas trabalhadas na semana
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"] 
            // Total de horas trabalhadas no mes
            const monthlyTotalHours = weekTotalHours * weekPerMonth

            // Qual ser a o valora da minha hora
            const valueHour = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ... Profile.data,
                ... req.body,
                "value-hour": valueHour
            }

            return res.redirect('/profile')
        }
    }
}

const Job = {
    data:
    [
        {
            id: 1,
            name: "Pizzaria Gulosso",
            "daily-hours": 2,
            "total-hours": 1,
            "create-at": Date.now(),
        },{
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 47,
            "create-at": Date.now(),
        }
    ],
    controllers: {
        index(req, res){
            const updateJobs = Job.data.map((job) => {
                // ajustes no job
                const remaining = Job.services.remainingDays(job)
                const status = remaining <=0 ? 'done' : 'progress'
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                }
            })
            
            return res.render(basePath + '/index', {jobs: updateJobs})
        },
        create(req,res){
            return res.render(basePath + '/job')
        },
        save(req,res){
            const lastId = Job.data[Job.data.length - 1]?.id || 0
        
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                "create-at": Date.now() // Atribuindo nova data
            })
            return res.redirect('/')            
        },
        show(req, res){
            const jobId = req.params.id
            const job = Job.data.find(job => Number(job.id)=== Number(jobId))

            if(!job){
                return res.send('Job not found!')
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])
            return res.render(basePath + '/job-edit',{ job })
        },
        update(req, res){
            const jobId = req.params.id
            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if(!job){
                return res.send('Job not found!')
            }

            const updatedJob = {
                ...job,
                nome: req.body.name,
                "total-hours":req.body["total-hours"],
                "daily-hours":req.body["daily-hours"]
            }

            Job.data = Job.data.map(job => {
                if (Number(job.id) === Number(jobId)){
                    job = updatedJob
                }
                return job
            })

            res.redirect('/job/'+jobId)
        }, 
        delete(req,res){
            const jobId = req.params.id            
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))


            return res.redirect('/')
        }
    },
    services: {
        remainingDays(job){
            // calculo de tempo restante
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
            const createdDate = new Date(job["create-at"])
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)
        
            const timeDiffInMs = dueDateInMs - Date.now()
            
            // transformar millisegundo em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
        
            // restam x dias
            return dayDiff
        },
        calculateBudget: (job, valueHour) =>  valueHour * job["total-hours"]
    }
}

// Routs Get
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.get('/job/:id', Job.controllers.show)
routes.get('/profile', Profile.controllers.index)

// Routs Post
routes.post('/job', Job.controllers.save)
routes.post('/profile', Profile.controllers.update)
routes.post('/job/:id', Job.controllers.update)

// Routs Delete
routes.post('/job/delete/:id', Job.controllers.delete)

module.exports = routes