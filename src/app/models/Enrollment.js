import Sequelize, { Model } from 'sequelize';

class Enrollment extends Model {
  static init(sequelize) {
    // chamando o init do model (pai)
    super.init(
      {
        start_date: Sequelize.INTEGER,
        end_date: Sequelize.INTEGER,
        price: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' }); // dentro da db de matrículas terá o id do estudanto e do plano
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}
export default Enrollment;
