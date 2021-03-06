let Model = require('./Model');

class Project extends Model {

    constructor() {
        super();
    }

    initialize() {
        this.instance = this.db.define('project', {
            id_project: { type: 'serial', key: true }, // the auto-incrementing primary key
            name: { type: 'text' },
            type: { type: 'text' },
            date_start: { type: 'text' },
            date_end: { type: 'text' },
            value_estimate_total: { type: 'text' },
            time_estimate_total: { type: 'text' },
            id_status: { type: 'number' },
        });
        this.instance.bind(this);
    }

    findAll(callback) {
        this.instance.find({},
            function (err, rows) {
                if (err) throw err; // Error al consultar la base de datos
                callback(rows);
            });
    }

    createProject(name, type, dateStart, dateEnd, valueEstimate, timeEstimate, idStatus, callback) {
        this.db.driver.execQuery(
            "INSERT INTO project (name, type, date_start, date_end, value_estimate_total, time_estimate_total, id_status) VALUES (?,?,?,?,?,?,?)",
            [name, type, dateStart, dateEnd, valueEstimate, timeEstimate, idStatus],
            function (err, data) {
                if (err) throw err;
                callback(data);
            }
        )
    }

    assingCostProjectRol(idProject, idRol, value, callback) {
        this.db.driver.execQuery(
            "INSERT INTO project_rol (id_project, id_rol, value) VALUES (?,?,?)",
            [idProject, idRol, value],
            function (err, data) {
                if (err) throw err;
                callback(data);
            }
        )
    }

    findCompleteProject(id_project, callback) {
        this.db.driver.execQuery(
            "SELECT project.id_project, project.name as project, epic.id_epic, epic.name as epic, feature.id_feature, feature.name as feature, story.id_story, story.name as story, story.id_sprint, task.id_task, task.name as task FROM ((((project JOIN project_epic USING (id_project)) LEFT JOIN epic USING(id_epic)) LEFT JOIN feature USING(id_epic)) LEFT JOIN story USING(id_feature)) LEFT JOIN task USING(id_story) WHERE `id_project` = ?",
            [id_project],
            function (err, data) {
                if (err) throw err;
                callback(data);
            }
        )
    }

    findProject(idProject, callback) {
        this.db.driver.execQuery(
            "SELECT name, type, DATE_FORMAT(date_start,'%Y-%m-%d') as date_start, DATE_FORMAT(date_end,'%Y-%m-%d') as date_end, value_estimate_total, time_estimate_total, id_status FROM project WHERE id_project = ?",
            [idProject],
            function (err, data) {
                if (err, data);
                callback(data);
            }
        )
    }

    editProject(name, type, dateStart, dateEnd, value, time, idStatus, idProject, callback){
        this.db.driver.execQuery(
            "UPDATE project SET name = ?, type = ?, date_start = ?, date_end = ?, value_estimate_total = ?, time_estimate_total = ?, id_status = ? WHERE id_project = ?",
            [name, type, dateStart, dateEnd, value, time, idStatus,idProject],
            function (err, data) {
                if (err, data);
                callback(data);
            }
        )
    }

    removeProject(idProject, callback){
        this.db.driver.execQuery(
            "call sp_remove_project (?);",
            [idProject],
            function (err, data) {
                if (err) throw err;
                callback(rows);
            }
        )
    }

    getProjectbyStatus(idProject, callback){
        this.db.driver.execQuery(
            "select p.name proyecto,s.status estado, count(*) cuenta from project p inner join status s on p.id_status = s.id_status where id_project= ? group by p.name, s.status;",
            [idProject],
            function (err, data){
                if(err) throw err;
                callback(data);
            }
        )
    }


}

module.exports = new Project();    