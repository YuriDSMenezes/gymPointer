import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.string().required(),
      price: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { title, duration, price } = req.body;

    const planExists = await Plan.findOne({ where: { title: req.body.title } });

    if (planExists) {
      return res.status(400).json({ error: 'Plan already Exists' });
    }

    const plan = await Plan.create({
      title,
      duration,
      price,
    });

    return res.json({ plan });
  }

  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { title } = req.body;

    const plan = await Plan.findOne({ where: { title: req.body.title } });

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const { duration, price } = await plan.update(req.body);

    return res.json({ title, duration, price });
  }

  async destroy(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const plan = await Plan.findOne({ where: { title: req.body.title } });

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const { id } = await plan.destroy(req.body);

    return res.json(id);
  }
}

export default new PlanController();
