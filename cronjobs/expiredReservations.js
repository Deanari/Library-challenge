const CronJob = require('node-cron');
const nodemailer = require("nodemailer");
const fs = require('fs');
const reservationService = require('../services/reservation.service');

const htmlTemplate = function (name, require) {
  return fs.readFileSync(require.resolve(name)).toString();
};

const initExpiredReservationJob = async () => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const scheduledJobFunction = CronJob.schedule('30 20 * * *', () => { // min, hour, every day
    console.log('Good night, checking for expired reservations');
    try {
      reservationService.getExpiredReservations((err, data) => {
        if(err) throw errorType.internalError;
        if (data && data.length) {
          console.log('expired reservations found:', data.length);
          
          data.forEach(async (reservation) => {
            console.log(`Sending Email to ${reservation.user_email}`)
            let htmlData = htmlTemplate('../emails/expiredReservation.html', require);
            htmlData = htmlData.replace('{{book_name}}', reservation.book_name);

            let info = await transporter.sendMail({
              from: 'Your favourite library" <best@library.com>',
              to: reservation.user_email,
              subject: "Please return our book, we miss it",
              html: htmlData,
            });
            console.log("Message sent: %s", info.messageId);
          });
          console.log('All notifications sent for today, see you tomorrow :)');
        } else {
          console.log('There are no expired reservations today, see you tomorrow :)');
        }
      });
    } catch (error) {
      console.log('Error in expired reservations job:', error)
    }
  }, {
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
  });

  scheduledJobFunction.start();
}

module.exports = { initExpiredReservationJob };