import { Model } from 'sequelize';

class Enrollment extends Model {
  static init(sequelize) {
    // chamando o init do model (pai)
    super.init(
      {},
      {
        sequelize,
      }
    );
    return this;
  }
}
export default Enrollment;
