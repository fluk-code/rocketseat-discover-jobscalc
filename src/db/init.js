const Database = require('./config')

const initDb = {

    async init() {
        // Iniciar conexão com BD
        const db = await Database()

        // Criar Tabela Profile
        await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            avatar TEXT, 
            monthly_budget INT, 
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )`);

        // Criar Tabela Jobs
        await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`)

        // Inserir valores na tabela profile
        await db.run(`INSERT INTO profile (
                name,
                avatar,
                monthly_budget,
                days_per_week,
                hours_per_day, 
                vacation_per_year,
                value_hour
            )
            VALUES(
                "Felipe Ferreira",
                "https://avatars.githubusercontent.com/u/80411354?v=4",
                3000,
                8,
                5,
                4,
                75
        );`)

        // Inserir valores na tabela Jobs
        await db.run(`INSERT INTO jobs (
                name,
                daily_hours,
                total_hours, 
                created_at
            )
            VALUES(
                "Pizzaria Gulosso",
                2,
                1,
                1617752087350
        );`)
        await db.run(`INSERT INTO jobs (
                name,
                daily_hours,
                total_hours, 
                created_at
            )
            VALUES(
                "OneTwo Project",
                2,
                1,
                1617752067379
        );`)

        // Fechar conexão com BD
        await db.close()
    }
}

initDb.init()