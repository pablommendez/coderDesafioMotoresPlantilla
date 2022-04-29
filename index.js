const express = require('express')
const hbs = require('express-handlebars')
const apiRouter = require('./routes/api/api')


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 8080

app.use('/api', apiRouter)

const motorHbs = () => {
    const hbsRouter = require('./routes/views/hbs')
    app.engine(
        "hbs", hbs.engine({
            extname: ".hbs",
            defaultLayout: '',
            layoutsDir: ''
        })
    );
    app.set('view engine', 'hbs');
    app.set("views", "./views/hbsViews/layouts");
    app.use('/', hbsRouter)
}

const motorEjs = () => {
    const ejsRouter = require('./routes/views/ejs')
    app.set('views', './views/ejsViews');
    app.set('view engine', 'ejs');
    app.use('/', ejsRouter)
}

const motorPUG = () => {
    const pugRouter = require('./routes/views/pug')
    app.set('views', './views/pugViews');
    app.set('view engine', 'pug');
    app.use('/', pugRouter)
}

motorHbs()
//motorEjs()
//motorPUG()

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})


