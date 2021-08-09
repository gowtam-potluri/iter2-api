
/* global db print */
/* eslint no-restricted-globals: "off" */

db.patissues.remove({});

db.pat_deleted_issues.remove({});

const issuesDB = [
  {
    id: 1,
    helpreq: 'False',
    name: 'Ravan',
    quantity: 5,
    created: new Date('2019-01-15'),
    phone: undefined,
    district: 'Delhi',
    description: 'Oxygen-1',
  },
  {
    id: 2,
    helpreq: 'True',
    name: 'Gowtam',
    quantity: 10,
    created: new Date('2019-01-15'),
    phone: undefined,
    district: 'Delhi-2',
    description: 'Oxygen-2',
  },
];

db.patissues.insertMany(issuesDB);
const count = db.patissues.count();
print('Inserted', count, 'issues');

db.counters.remove({ _id: 'patissues' });
db.counters.insert({ _id: 'patissues', current: count });

db.patissues.createIndex({ id: 1 }, { unique: true });
db.patissues.createIndex({ helpreq: 1 });
db.patissues.createIndex({ name: 1 });
db.patissues.createIndex({ created: 1 });
db.patissues.createIndex({ district: 'text', description: 'text' });

db.pat_deleted_issues.createIndex({ id: 1 }, { unique: true });