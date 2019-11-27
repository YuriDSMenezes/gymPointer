import { subDays, startOfDay, endOfDay } from 'date-fns';
import Checkin from '../schemas/Checkin';

class CheckinController {
  async store(req, res) {
    const { id } = req.params;

    const today = startOfDay(new Date());

    const lastDayChekin = subDays(today, 7);

    const checkinsCount = await Checkin.find({
      student_id: id,
    })
      .gte('createdAt', startOfDay(lastDayChekin))
      .lte('createdAt', endOfDay(today))
      .countDocuments();

    if (checkinsCount >= 5) {
      return res
        .status(400)
        .json({ error: 'You can do just 5 check-ins in one week' });
    }

    const checkin = await Checkin.create({
      student_id: id,
    });
    return res.json(checkin);
  }
}

export default new CheckinController();
