var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var data = path.join(__dirname, 'data.json');
var client = path.join(__dirname, '..', 'client')
var _ = require('lodash');

var app = express();

app.use(bodyParser.json({
    extended: true
}));

app.use(express.static(client));

/**
 * @api {get} /movies Get Movies
 * @apiHeader (Query Parameters) {String} director Filter movies by director
 * @apiHeader (Query Parameters) {Number} runningtime Return movies with a shorter running time
 * @apiHeader (Query Parameters) {Number} releasedate Return movies released after
 * @apiName All Movies
 * @apiGroup Movies
 *
 * @apiSuccess {Array} data Array of movies.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     data: [
 *          {
 *              "id": 1,
 *              "title": "the virgin suicides",
 *              "director": "sofia coppola",
 *              "runningtime": 97,
 *              "releasedate": 2000,
 *              "trailer": "https://www.youtube.com/embed/fbz4-du3Ayg"
 *          },
 *          {
 *              "id": 2,
 *              "title": "lost in translation",
 *              "director": "sofia coppola",
 *              "runningtime": 102,
 *              "releasedate": 2003,
 *              "trailer": "https://www.youtube.com/embed/W6iVPCRflQM"
 *          }
 *     ]
 */
app.get('/api/v1/movies', (req, res, next) => {
    let q = req.query;
    let movies = JSON.parse(fs.readFileSync(data, 'utf-8'));

    if (_.isEmpty(q) && _.isObject(q)) {
        res.send(movies);
        return;
    }

    let filtered = filterMovies(q, movies);

    if (_.isEmpty(filtered)) {
        res.sendStatus(404);
        return;
    }

    res.send(filtered);
});

/**
 * @api {get} /movies/:id Read Movie
 * @apiName Get single movie
 * @apiGroup Movies
 *
 * @apiSuccess {Object} data Single movie.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *              "id": 2,
 *              "title": "lost in translation",
 *              "director": "sofia coppola",
 *              "runningtime": 102,
 *              "releasedate": 2003,
 *              "trailer": "https://www.youtube.com/embed/W6iVPCRflQM"
 *          }
 */
app.get('/api/v1/movies/:id', (req, res, next) => {
    let p = req.params,
        movies = JSON.parse(fs.readFileSync(data, 'utf-8'));

    let filtered = movies.filter((m) => {
        if (m.id === Number(p.id)) {
            return true;
        }
    });

    if (_.isEmpty(filtered) || filtered.length > 1) {
        res.sendStatus(404);
        return;
    }

    res.send(filtered[0]);
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

function filterMovies(queries, movies) {
    var res = [];

    movies.forEach((m) => {
        let ship = true,
            hasReleaseDate = false,
            hasRunningTime = false,
            date;
            time;

        Object.keys(queries).forEach((q) => {
            if (q === 'runningtime') {
                hasRunningTime = true;
                time = Number(queries[q]);
                return;
            }

            if (q === 'releasedate') {
                hasReleaseDate = true;
                date = Number(queries[q]);
                return;
            }

            if (m[q] != queries[q].replace(/[_]/g, ' ')) {
                ship = false;
            }
        });

        if (ship && hasRunningTime) {
            if (m.runningtime > time) {
                ship = false;
            }
        }

        if (ship && hasReleaseDate) {
            if (m.hasReleaseDate < date) {
                ship = false;
            }
        }

        if (ship) {
            res.push(m);
        }
    });

    return res;
}

