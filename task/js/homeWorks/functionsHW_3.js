'use strict';

/**
 * tickets function
 * @author Mariia Podhorna
 * @param {array} coins - operand.
 * @return {string} 'return 'YES' or 'NO' by using rules'
 */
function tickets(coins) {
  const back = [];
  let result;
  outerBlock: for (let index = 0; index < coins.length; index++) {
    switch (coins[index]) {
      case 25:
        back.push(25);
        result = 'YES';
        break;

      case 50:
        const index = back.indexOf(25);
        if (index !== -1) {
          back.splice(index, 1);
          back.push(50);
          result = 'YES';
        } else {
          result = 'NO';
          break outerBlock;
        }
        break;

      case 100:
        const index25 = back.indexOf(25);
        if (index25 !== -1) {
          back.splice(index25, 1);
          const index50 = back.indexOf(50);
          if (index50 !== -1) {
            back.splice(index50, 1);
            result = 'YES';
          } else {
            const index25 = back.indexOf(25);
            const indexNext25 = back.indexOf(25, index25 + 1);
            if (index25 !== -1 && indexNext25 !== -1) {
              back.splice(index25, 1);
              back.splice(indexNext25, 1);
              result = 'YES';
            } else {
              result = 'NO';
              break outerBlock;
            }
          }
        } else {
          result = 'NO';
          break outerBlock;
        }
    }
  }
  return result;
}
console.log(tickets([25, 25, 50]));
console.log(tickets([25, 100]));
console.log(tickets([25, 25, 50, 100]));
console.log(tickets([25, 50, 100]));
console.log(tickets([25, 25, 25, 100]));
console.log(tickets([25, 50, 100]));
// ============================================================ //
const convertStringToReverseArray = function(str) {
  if (typeof str !== 'string') {
    return false;
  }
  const array = str.split('').reverse();
  if (!Array.isArray(array) || array.length === 0) {
    return false;
  }
  for (let index = 0; index < array.length; index++) {
    if (!Number.isFinite(+array[index])) {
      return false;
    } else {
      array[index] = +array[index];
    }
  }
  return array;
};

const getSum = (str1, str2) => {
  let firstArray = convertStringToReverseArray(str1);
  let secondArray = convertStringToReverseArray(str2);
  const result = [];
  let rest = 0;
  if (firstArray && secondArray) {
    for (let index = 0; index < firstArray.length; index++) {
      const sum = firstArray[index] + secondArray[index];
      if (Number.isFinite(sum)) {
        if (sum < 10) {
          if (rest === 0) {
            result.push(sum);
          } else if (rest === 1) {
            result.push(sum + 1);
            rest = 0;
          }
        } else if (rest === 1) {
          result.push(sum - 10 + rest);
        } else {
          result.push(sum - 10);
          rest = 1;
        }
      } else if (rest === 1) {
        firstArray = firstArray.slice(index);
        secondArray = secondArray.slice(index);
        if (rest === 1) {
                    firstArray.length > 0 ?
                        result.push(firstArray[0] + 1, ...firstArray.slice(1)) :
                        result.push(
                            secondArray[0] + 1,
                            ...secondArray.slice(1)
                        );
        } else {
                    firstArray.length > 0 ?
                        result.push(...firstArray) :
                        result.push(...secondArray);
        }

        break;
      }
    }
    return result.reverse().join('');
  } else {
    return 'Invalid input data';
  }
};
console.log(getSum({}, []));
console.log(getSum('123maxim', '3coding24') );
console.log(getSum('', '4444'));
console.log(getSum('123', '324') );
console.log(getSum('88888', '777') );
console.log(getSum('444444', '333') );

// ============================================================ //
const listOfPosts2 = [
  {
    id: 1,
    post: 'some post1',
    title: 'title 1',
    author: 'Rimus',
    comments: [
      {
        id: 1.1,
        comment: 'some comment1',
        title: 'title 1',
        author: 'Ivanov',
      },
      {
        id: 1.2,
        comment: 'some comment2',
        title: 'title 2',
        author: 'Uncle',
      },
    ],
  },
  {
    id: 2,
    post: 'some post2',
    title: 'title 2',
    author: 'Ivanov',
    comments: [
      {
        id: 1.1,
        comment: 'some comment1',
        title: 'title 1',
        author: 'Rimus',
      },
      {
        id: 1.2,
        comment: 'some comment2',
        title: 'title 2',
        author: 'Uncle',
      },
      {
        id: 1.3,
        comment: 'some comment3',
        title: 'title 3',
        author: 'Ivanov',
      },
    ],
  },
  {
    id: 3,
    post: 'some post3',
    title: 'title 3',
    author: 'Rimus',
  },
  {
    id: 4,
    post: 'some post4',
    title: 'title 4',
    author: 'Uncle',
  },
];

const getQuantityPostsByAuthor = (listOfPosts, authorName) => {
  let posts =0;
  let comments=0;
  listOfPosts.forEach((element) => {
    if (element.author === authorName) {
      posts++;
    };
    if (Object.keys(element).includes('comments')) {
      element.comments.forEach((comment)=>{
        if (comment.author === authorName) {
          comments++;
        };
      });
    };
  });
  return `Post:${posts},comments:${comments}`;
};

getQuantityPostsByAuthor(listOfPosts2, 'Rimus');
