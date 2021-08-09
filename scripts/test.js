/* global db print */
/* eslint no-restricted-globals: "off" */

const owners = ['Ravan', 'Eddie', 'Pieta', 'Parvati', 'Victor'];
const statuses = ['True','False'];

const initialCount = db.issues.count();

for (let i = 0; i < 100; i += 1) {
  const randomCreatedDate = (new Date())
    - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
  const created = new Date(randomCreatedDate);
  const randomDueDate = (new Date())
    - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
  const phone "9999";

  const owner = owners[Math.floor(Math.random() * 5)];
  const available = statuses[Math.floor(Math.random() * 2)];
  const quantity = Math.ceil(Math.random() * 20);
  const district = `Lorem ipsum dolor sit amet, ${i}`;
  const id = initialCount + i + 1;

  const issue = {
    id, district, created, phone, name, available, quantity,
  };

  db.resissues.insertOne(issue);
}

const count = db.resissues.count();
db.counters.update({ _id: 'resissues' }, { $set: { current: count } });

print('New issue count:', count);