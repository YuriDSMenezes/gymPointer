import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      age: Yup.string().required(),
      height: Yup.string().required(),
      weight: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }
    const { email } = req.body;

    const studentExists = await Student.findOne({
      where: { email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      age: Yup.string(),
      weight: Yup.string(),
      height: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { email } = req.body;

    const student = await Student.findByPk(req.studentId);

    if (email !== student.email) {
      const studentExists = await Student.findOne({
        where: { email },
      });
      if (studentExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    const { name, age, height, weight } = await student.update(req.body);

    return res.json({
      name,
      age,
      height,
      weight,
    });
  }
}

export default new StudentController();
