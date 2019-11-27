import Help from '../models/Help';
import Student from '../models/Student';

class HelpOrdersController {
  async index(req, res) {
    const { id } = req.params;

    const help = await Help.findByPk(id);

    return res.json(help);
  }

  async update(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      res.status(400).json({ error: 'Student not exists' });
    }

    const findHelp = await Help.findOne({ where: { student_id: id } });

    const answered = true;

    const { answer } = await findHelp.update(req.body, answered);

    return res.json(answer);
  }
}

export default new HelpOrdersController();
