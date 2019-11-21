import Sequelize from 'sequelize';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Enrollment from '../app/models/Enrollment';

import databaseConfig from '../config/database';

const models = [User, Student, Plan, Enrollment];

class Database {
  constructor() {
    this.init();
  }

  // faz a conexão com a base de dados
  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models) // so chama o método associate se ele estiver setado
    );
  }
}

export default new Database();
