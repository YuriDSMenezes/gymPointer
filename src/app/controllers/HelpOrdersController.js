import Help from '../models/Help';
import Student from '../models/Student';

class HelpOrdersController {
  async index(req, res) {
    const helps = await Help.findAll({ where: { answered: false } });

    return res.json(helps);
  }

  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      res.status(400).json({ error: 'Student not exists' });
    }

    const helps = await Help.create({
      question,
      student_id: id,
    });

    return res.json(helps);
  }
}

export default new HelpOrdersController();
