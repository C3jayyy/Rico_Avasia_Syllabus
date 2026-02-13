let sum = 0 
const number = [65,44,12,4];
number.forEach(myFunction);

function myFunction(item, index, arr){
    arr[index] = item * 10;
}

console.log(number);