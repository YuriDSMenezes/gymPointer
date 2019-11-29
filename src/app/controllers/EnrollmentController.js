import { startOfHour, parseISO, addMonths } from 'date-fns';
import * as Yup from 'yup';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

import EnrollmentMail from '../jobs/EnrollmentMail';
import Queue from '../../lib/Queue';

class EnrollmenteController {
  async index(req, res) {
    const enrollment = await Enrollment.findAll({
      attributes: ['id'],
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration', 'price'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(enrollment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      res.status(400).json({ error: 'Student not exists' });
    }

    const plan = await Plan.findByPk(plan_id);

    const startDate = startOfHour(parseISO(start_date));

    const { duration, price } = plan;

    const priceTotal = price * duration;

    const endDate = addMonths(startDate, duration);

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date: endDate,
      price: priceTotal,
    });

    console.log(plan.id);

    const email = await Student.findByPk(student_id);

    await Queue.add(EnrollmentMail.key, {
      email,
      plan_id,
      endDate,
      priceTotal,
    });

    return res.json(enrollment);
  }
}

export default new EnrollmenteController();
