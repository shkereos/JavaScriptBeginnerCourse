// а возвращать – массив значений одного из полей (отсортированных в порядке возрастания):
  // ------------------------
  
 +function getFieldValues(arr, name) {
 +	return arr.map(function(value) {
 +		return value[name];
 +	}).sort();
 +}
 +
  let usersData = [
  	{ 'user' : 'Alex', 'password' : 'MyNameIsAlex' },
 -	{ 'user' : 'Bob', 'password' : 'MyNAmeIsBob' }
 +	{ 'user' : 'Bob', 'password' : 'MyNameIsBob' }
  ];
  console.log(getFieldValues(usersData, 'user')); // --> ['Alex', 'Bob']
  
 @@ -14,8 +20,14 @@ console.log(getFieldValues(usersData, 'user')); // --> ['Alex', 'Bob']
  // 2) Написать функцию, фильтрующую массив с использованием предиката:
  // ------------------------
  
 +function isEven(x) {
 +	return x % 2 == 0;
 +}
 +function filter(arr, func) {
 +	return arr.filter(func);
 +}
 +
  let numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55];
 -function isEven(x) {/* Проверка на чётность */}
  console.log(filter(numbers, isEven)); // --> [2, 8, 34]
  
  // ------------------------
 @@ -25,6 +37,18 @@ console.log(filter(numbers, isEven)); // --> [2, 8, 34]
  // вывести те слова (по одному разу), которые встречаются в обоих строках
  // ------------------------
  
 +function findSimilarWords(str1, str2) {
 +	var arr1 = str1.split(' ');
 +	var arr2 = str2.split(' ');
 +	var result = [];
 +
 +	arr1.forEach(function(item) {
 +		if (arr2.includes(item) && !result.includes(item))
 +			result.push(item);
 +	});
 +	return result;
 +}
 +
  var firstLongString = 'Load up on guns and bring your friends it is fun to lose and to pretend';
  var secondLongString = 'She is over bored and self assured oh no I know a dirty word';
  console.log(findSimilarWords(firstLongString, secondLongString)); // --> ['and', 'is'];
 @@ -37,6 +61,41 @@ console.log(findSimilarWords(firstLongString, secondLongString)); // --> ['and',
  // IP-адрес (4 октета, <= 255), а затем выводить сетевой и широковещательный адреса:
  // ------------------------
  
 +function generateBroadcastAndNetworsAddresses(IpAddress, bitmask) {
 +	if (typeof IpAddress != 'string')
 +		return 'IpAddress ' + IpAddress + ' must be a string';
 +
 +	var arr = IpAddress.split('.');
 +	if (arr.length != 4)
 +		return 'IpAddress ' + IpAddress + ' must consist of 4 octets';
 +
 +	if (arr.some(function(num) {
 +		return isNaN(parseInt(num)) || num < 0 || num > 255;
 +	})) return 'IpAddress ' + IpAddress + ' must consist of numbers from 0 to 255';
 +
 +	var IpAddressFull = 0;
 +	for (var i = 0; i < 4; i++) {
 +		IpAddressFull += arr[i] << (3 - i) * 8;
 +	}
 +
 +	var subnetMaskFull = Math.pow(2, 32) - Math.pow(2, 32 - bitmask);
 +
 +	var networkFull   = IpAddressFull & subnetMaskFull;
 +	var broadcastFull = networkFull | ~subnetMaskFull;
 +
 +	var network   = IPv4_intA_to_dotquadA(networkFull);
 +	var broadcast = IPv4_intA_to_dotquadA(broadcastFull);
 +
 +	return 'Broadcast - ' + broadcast + ', Network - ' + network;
 +}
 +function IPv4_intA_to_dotquadA(num) {
 +    var byte1 = (num >>> 24);
 +    var byte2 = (num >>> 16) & 255;
 +    var byte3 = (num >>>  8) & 255;
 +    var byte4 = num & 255;
 +    return byte1 + '.' + byte2 + '.' + byte3 + '.' + byte4;
 +}
 +
  var IpAddress = '10.223.98.2';
  var subnetMask = 28;
  console.log(generateBroadcastAndNetworsAddresses(IpAddress, subnetMask)); // Broadcast - 10.223.98.15, Network - 10.223.98.0
 @@ -47,6 +106,17 @@ console.log(generateBroadcastAndNetworsAddresses(IpAddress, subnetMask)); // Bro
  // 5) Соединить все массивы в один, не допуская повторения элементов (порядок не важен):
  // ------------------------
  
 +function makeItClean(arr) {
 +	var result = [];
 +	arr.forEach(function(subarr) {
 +		subarr.forEach(function(item) {
 +			if (!result.includes(item))
 +				result.push(item);
 +		});
 +	});
 +	return result;
 +}
 +
  var totalMessArray = [['a', 1, true], [true, 99, 'aa', undefined], ['1']];
  console.log(makeItClean(totalMessArray)); // --> ['a', 'aa', 1, '1', undefined, true];