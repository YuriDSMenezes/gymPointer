import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    // chamando o init do model (pai)
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,

        age: Sequelize.INTEGER,
        height: Sequelize.INTEGER,
        weight: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
export default Student;
