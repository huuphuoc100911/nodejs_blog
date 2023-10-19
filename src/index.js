const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { convertDatetimeToDateTime, sortable } = require('./utils/index');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const path = require('path');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');
db.connect();

//Config thư mục public
app.use(express.static(path.join(__dirname, 'public')));

//Middleware, display post formData
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// XMLHttpRequest, fetch, axios

// app.use(morgan("combined"));

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'));

//Middleware
app.use(SortMiddleware);

//Template Engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            convertDatetimeToDate: (dateTime) =>
                convertDatetimeToDateTime(dateTime),
            sortable: (field, sort) => sortable(field, sort),
        },
        defaultLayout: 'main',
    }),
);
app.set('view engine', 'hbs');
//Config thư mục views
app.set('views', path.join(__dirname, 'resources', 'views'));

//Router init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
