const TicketNumber = require("../../models/Number");
const Ticket = require("../../models/Ticket");

const addTicket = async (req, res, next) => {
  try {
    let a = await genrateTicket();

    let newTicket = new Ticket({
      first_row: a[0],
      second_row: a[1],
      third_row: a[2],
    });

    let saved = await newTicket.save();

    let data = {
      id: saved._id,
      ticket: [
        JSON.stringify(saved.first_row),
        JSON.stringify(saved.second_row),
        JSON.stringify(saved.third_row),
      ],
    };

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

//////

const randamValue = (min, max) => Math.floor(Math.random() * (max - min) + min);
const genrateTicket = () => {
  //Creating ticket like
  // [[0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0],
  // [0,0,0,0,0,0,0,0,0]]
  let ticket = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  let token = generateToken(ticket);
  if (!token) {
    token = generateToken(ticket);
  }
  console.log(token);
  if (!token) {
    return false; // in 2nd  try,, if token not generated then return false
  }
  rearrangeToken(ticket);
  sortColumnOnly(ticket);

  return ticket;
};

const generateToken = (tambola) => {
  let totalTambola = 15;
  let count = 0;
  while (totalTambola > 0) {
    let row = randamValue(0, 3);
    let col = randamValue(0, 9);
    let storeNumber = checkAndReturn(row, col, tambola);
    if (storeNumber != 0) {
      totalTambola--;
      tambola[row][col] = storeNumber;
    }
    count++;
    if (count > 100) {
      return false;
    }
  }
  if (count <= 100) return true;
};

// Validating ticket
const checkAndReturn = (row, col, tambola) => {
  if (tambola[row][col] != 0) return 0;
  //checking column not more then 5
  let rowCount = 0;
  for (let i = 0; i < 3; i++) {
    if (tambola[i][col] != 0) {
      rowCount++;
    }
  }
  //every column contain atleast one
  if (rowCount >= 2) return 0;
  let countCol = 0;
  for (let i = 0; i < 9; i++) {
    if (tambola[row][i] != 0) {
      countCol++;
    }
    if (countCol > 4) return 0;
  }

  let start = col * 10;
  let gotRandomValue;
  // removing duplicate if any
  let loop = 0; //while loop should not go in infinite loop
  while (true) {
    loop++;
    gotRandomValue = randamValue(start + 1, start + 10);
    let count = 0;
    for (let i = 0; i < 3; i++) {
      if (gotRandomValue === tambola[i][col]) {
        count++;
      }
    }
    if (count === 0) break;
    if (loop > 5) {
      return 0;
    }
  }

  return gotRandomValue;
};

const sortColumnOnly = (tambola) => {
  for (let col = 0; col < 9; col++) {
    for (let i = 0; i < 3; i++) {
      for (let j = i + 1; j < 3; j++) {
        if (tambola[i][col] != 0 && tambola[j][col] != 0) {
          if (tambola[i][col] > tambola[j][col]) {
            let temp = tambola[i][col];
            tambola[i][col] = tambola[j][col];
            tambola[j][col] = temp;
          }
        }
      }
    }
  }
};

// each column must contain one value
const atleastOneInColumn = (a, b, tambola) => {
  let value = a[0];
  if (value == 0) {
    let row = randamValue(0, 3) || 1;
    tambola[row][0] = randamValue(1, 10);
    return;
  } else {
    let notDone = true;
    let count = 0;
    do {
      count++;
      let col = randamValue(0, 9);
      if (value === col) {
        notDone = true;
      } else if (b[col] > 1) {
        for (let j = 0; j < 3; j++) {
          if (tambola[j][col] != 0) {
            let row = randamValue(0, 3);
            let start = value * 10;
            tambola[row][value] = randamValue(start + 1, start + 10);
            notDone = false;

            tambola[j][col] = 0;
            b[col] = b[col] - 1;
            break;
          }
        }
      }

      if (count > 10) {
        notDone = false;
        break;
      }
    } while (notDone);
  }
};

const countColumnNumber = (col, tambola) => {
  let count = 0;
  for (let i = 0; i < 3; i++) {
    if (tambola[i][col] != 0) {
      count++;
    }
  }
  return count;
};

const rearrangeToken = (tambola) => {
  let a = [];
  let b = [];
  for (let i = 0; i < 9; i++) {
    let count = countColumnNumber(i, tambola);
    if (count === 0) {
      a.push(i);
    } else {
      b[i] = count;
    }
  }
  atleastOneInColumn(a, b, tambola);
};

module.exports = addTicket;
