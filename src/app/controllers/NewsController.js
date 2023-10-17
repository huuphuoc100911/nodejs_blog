class NewsController {
    index(req, res) {
        res.render('news');
    }

    show(req, res) {
        res.send('News Detail');
    }
}

module.exports = new NewsController();
