import Sequelize, { Model } from 'sequelize';

class Helps extends Model {
  static init(sequelize) {
    // chamando o init do model (pai)
    super.init(
      {
        question: Sequelize.STRING,
        answer: Sequelize.STRING,
        answered: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}
export default Helps;
