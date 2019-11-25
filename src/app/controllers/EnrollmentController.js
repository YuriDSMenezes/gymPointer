import { startOfHour, parseISO, addMonths } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

import Mail from '../../lib/Mail';

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
    const { student_id, plan_id, start_date } = req.body;

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

    console.log(start_date);

    const email = await Enrollment.findByPk(plan_id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    await Mail.sendMail({
      to: `${email.student.name} <${email.student.email}>`,
      subject: 'Matrícula criada com sucesso!',
      template: 'Enrollments',
      context: {
        student: email.student.name,
        plan: 123,
        // end_date,
        price,
      },
    });

    return res.json(enrollment);
  }
}

export default new EnrollmenteController();
