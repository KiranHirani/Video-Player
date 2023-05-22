const library = [
  {
    title: "First",
    author: "First Author",
    status: {
      own: true,
      reading: false,
      read: false,
    },
  },
  {
    title: "Second",
    author: "Second Author",
    status: {
      own: true,
      reading: false,
      read: false,
    },
  },
  {
    title: "Third",
    author: "Third Author",
    status: {
      own: true,
      reading: false,
      read: false,
    },
  },
];

console.log(library);
library.forEach((obj) => (obj.status.read = true));

console.log(library);

// Destructure
const { title: firstBook } = library[0];
console.log(firstBook);

// JSON

console.log(JSON.stringify(library));
