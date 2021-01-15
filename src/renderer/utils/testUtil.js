// export default (args) => {
//   console.log(args + ' poo');
// }

// provides the best intellisense
export function testFunc() {
  console.log('poo test');
}

function testFunc2() {
  console.log('poo test');
}

const mostPoo = () => {
  console.log('most poo');
}

export const lessPoo = () => {
  console.log('less poo');
}

export {
  mostPoo,
  testFunc2
}
