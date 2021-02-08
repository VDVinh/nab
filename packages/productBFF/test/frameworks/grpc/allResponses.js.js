const toDateString = new Date().toISOString();
module.exports = [
  [],
  [
    {
      id: 'id1',
      name: 'name',
      branch: 'abc',
      color: 'blue',
      price: 100,
      createdAt: toDateString,
      updatedAt: toDateString
    },
    {
      id: 'id2',
      name: 'name2',
      branch: 'xyz',
      color: 'green',
      price: 200,
      createdAt: toDateString,
      updatedAt: toDateString
    },
    {
      id: 'id3',
      name: 'name3',
      branch: 'xyz3',
      color: 'pink',
      price: 300,
      createdAt: toDateString,
      updatedAt: toDateString
    }
  ]
];
