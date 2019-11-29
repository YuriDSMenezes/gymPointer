import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail'; // chave unica
  }

  async handle({ data }) {
    const { email, plan_id, endDate, priceTotal } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${email.name} <${email.email}>`,
      subject: 'Matrícula criada com sucesso!',
      template: 'Enrollments',
      context: {
        student: email.name,
        plan: plan_id,
        end_date: endDate,
        price: priceTotal,
      },
    });
  }
}

export default new EnrollmentMail();

// quando o usuario -> import EnrollmentMail from '..' vai chamar o key
