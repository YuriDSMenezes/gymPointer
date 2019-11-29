import * as Yup from 'yup';
import Help from '../models/Help';
import Student from '../models/Student';
import Mail from '../../lib/Mail';

class HelpOrdersController {
  async index(req, res) {
    const { id } = req.params;

    const help = await Help.findByPk(id);

    return res.json(help);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      res.status(400).json({ error: 'Student not exists' });
    }

    const findHelp = await Help.findOne({ where: { student_id: id } });

    const { answer } = await findHelp.update(req.body);

    await Mail.sendMail({
      to: `${student.email}<${student.email}>`,
      subject: 'Pergunta respondida!',
      template: 'Answers',
      context: {
        student: student.name,
        question: findHelp.question,
        answer,
      },
    });

    return res.json(answer);
  }
}

export default new HelpOrdersController();
