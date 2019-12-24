const cron = require('node-cron');
const moment = require('moment');

const onceAnHour = '0 * * * *';
const onceAMinute = '* * * * *';
const onceASecond = '* * * * * *';

cron.schedule(onceAMinute, () => {
  console.log(`running a task every minute, ${moment().format('LT')}`);
});
