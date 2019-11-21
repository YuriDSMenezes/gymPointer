// import { parseISO, addMonths } from 'date-fns';
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
    const { student_id, plan_id, start_date, price } = req.body;

    // const plan = await Plan.findByPk(plan_id);

    // const end_date = addMonths(parseISO(start_date), plan.duration);
    // const final_price = price * plan.duration;

    const createEnrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      price,
      // end_date,
      // final_price,
    });

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

    return res.json(createEnrollment);
  }
}

export default new EnrollmenteController();
