import Checkin from '../schemas/Checkin';

class CheckinController {
  async store(req, res) {
    const { id } = req.params;

    const checkinsCount = await Checkin.find({
      where: { student_id: id },
    }).countDocuments();

    if (checkinsCount === 2) {
      return res.status(400).json('opa');
    }

    const checkins = await Checkin.create({
      student_id: id,
    });
    return res.json(checkins);
  }
}

export default new CheckinController();
