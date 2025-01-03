const fs = require('fs');
const { redisClient: redis } = require('./../config/redisConfig');
const cron = require('node-cron');

const Story = require('./../app/models/story');

let day = 1;

const saveDayValue = () => {
    const data = JSON.stringify({ day });
    fs.writeFileSync('day.json', data);
}

const loadDayValue = () => {
    try {
        let data = fs.readFileSync('day.json', 'utf8');

        const parsedData = JSON.parse(data);

        if (parsedData && typeof parsedData.day === 'number') {
            day = parsedData.day;
        }
    } catch (error) {
        console.log('Error loading day value');
    }
}

loadDayValue();
cron.schedule('0 0 * * *', async () => {
    try {
        let keys = await redis.keys('vote-*');

        if (!(keys && keys.length === 3)) {
            await redis.set('vote-yes', 0);
            await redis.set('vote-mi', 0);
            await redis.set('vote-no', 0);

            keys = await redis.keys('vote-*');
        } else {
            const values = await redis.mget(...keys);

            const voteCount = {};
            keys.forEach((key, index) => {
                voteCount[key] = values[index];
            });

            const voteYes = Number(voteCount['vote-yes']);
            const voteMi = Number(voteCount['vote-mi']);
            const voteNo = Number(voteCount['vote-no']);

            const results = [voteYes, voteMi, voteNo];

            await Story.findOneAndUpdate({ day }, { results }, { runValidators: true, new: true });

            for (const key of keys) await redis.set(key, 0);
        }

        day += 1;
        saveDayValue();
    } catch (e) {
        console.log(e);
    }
}, {
    timezone: 'America/Sao_Paulo'
});