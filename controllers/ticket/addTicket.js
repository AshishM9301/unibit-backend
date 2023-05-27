const TicketNumber = require("../../models/Number");
const Ticket = require("../../models/Ticket");

const addTicket = async (req, res, next) => {
  try {
    // let a = generateTicket();

    let first = rowCreation();
    let second = rowCreation();
    let last = rowCreation();

    flag = true;

    while (flag) {
      if (arrayCompare(first, second)) {
        second = rowCreation();
      } else if (arrayCompare(first, last)) {
        last = rowCreation();
      } else {
        flag = false;
      }
    }

    const newTicket = new Ticket({
      first_row: first,
      second_row: second,
      third_row: last,
    });

    newTicket.save();

    res.status(200).json({
      success: true,
      data: newTicket,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const rowCreation = () => {
  let a = Array(9).fill(0);

  let no = getUniqueRandomNumber(0, 8, 5);

  for (let i = 0; i < 5; i++) {
    a[no[i]] = getUniqueRandomNumber(no[i] * 10, no[i] * 10 + 10, 1)[0];
  }

  return a;
};

function arrayCompare(_arr1, _arr2) {
  if (
    !Array.isArray(_arr1) ||
    !Array.isArray(_arr2) ||
    _arr1.length !== _arr2.length
  ) {
    return false;
  }

  // .concat() to not mutate arguments
  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

// function generateTicket() {
//   var cols,
//     finalTicket,
//     flag = true,
//     colPlaceholder = [];
//   while (flag) {
//     cols = Array(9).fill(2);
//     // console.log(cols);
//     finalTicket = Array(6);
//     finalTicket[0] = Array(9).fill(0);
//     finalTicket[1] = Array(9).fill(0);
//     finalTicket[2] = Array(9).fill(0);
//     finalTicket[3] = Array(9).fill(0);
//     finalTicket[4] = Array(9).fill(0);
//     finalTicket[5] = Array(9).fill(0);
//     var r = getUniqueRandomNumber(0, 8, 3);

//     // console.log(r);
//     for (i = 0; i < r.length; i++) {
//       cols[r[i]] = 1;
//     }

//     colPlaceholder = [];
//     for (i = 0; i < cols.length; i++) {
//       colPlaceholder.push(getUniqueRandomNumber(0, 2, cols[i]));
//     }

//     // console.log(colPlaceholder);
//     for (i = 0; i < colPlaceholder.length; i++) {
//       nums = getUniqueRandomNumber(
//         i * 10 + 1,
//         i * 10 + 10,
//         colPlaceholder[i].length
//       );
//       for (j = 0; j < colPlaceholder[i].length; j++) {
//         finalTicket[colPlaceholder[i][j]][i] = nums[j];
//       }
//     }
//     flag = testFinalTicket(finalTicket);
//   }
//   return finalTicket;
// }

// function testFinalTicket(ticket) {
//   for (i = 0; i < 3; i++) {
//     var arr = ticket[i];
//     count = 0;
//     for (j = 0; j < arr.length; j++) {
//       if (arr[j] === 0) count++;
//     }
//     if (count != 4) return true;
//   }
//   return false;
// }

function sortNumbersinArray(a, b) {
  return a > b ? 1 : b > a ? -1 : 0;
}

function getUniqueRandomNumber(min, max, count, sort = true) {
  var random = [];
  for (var i = 0; i < count; i++) {
    flag = true;
    while (flag) {
      a = randomNumber(min, max);
      if (random.indexOf(a) === -1) {
        random.push(a);
        flag = false;
      }
    }
  }
  if (sort) random.sort(sortNumbersinArray);
  return random;
}

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const chooseRandom = (arr, num = 1) => {
  const res = [];
  for (let i = 0; i < num; ) {
    const random = Math.floor(Math.random() * arr.length);
    if (res.indexOf(arr[random]) !== -1) {
      continue;
    }
    res.push(arr[random]);
    i++;
  }
  return res;
};

module.exports = addTicket;
