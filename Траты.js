let lena = [];
let nastya = [];
let all_Lena = [];
let all_Nastya = [];

let countSum = function (a, a_all) {
  let sum1 = 0;
  let sum2 = 0;
  for (let i = 0; i < a.length; i++) {
    sum1 += a[i];
  }

  for (let i = 0; i < a_all.length; i++) {
    sum2 += a_all[i];
  }

  let totalSum = sum1 + sum2 / 2;
  return totalSum;
};

let lena_sum = countSum(lena, all_Lena);
console.log(lena_sum);
let nastya_sum = countSum(nastya, all_Nastya);
console.log(nastya_sum);

if (lena_sum > nastya_sum) {
  console.log(`Настя должна Лене ${lena_sum - nastya_sum}`);
} else if (nastya_sum > lena_sum) {
  console.log(`Лена должна Насте ${nastya_sum - lena_sum}`);
} else {
  console.log("Кажется долгов нет или есть ошибка");
}
