import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Enrollment from '../app/models/Enrollment';
import Help from '../app/models/Help';

import databaseConfig from '../config/database';

const models = [User, Student, Plan, Enrollment, Help];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  // faz a conexão com a base de dados
  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models) // so chama o método associate se ele estiver setado
    );
  }

  mongo() {
    this.connection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
