const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        return res.render('profile', { Profile: Profile.get() })
    },
    update(req, res) {
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

        Profile.update({
            ...Profile.get(),
            ...req.body,
            "value-hour": valueHour
        })
        return res.redirect('profile')
    }
}