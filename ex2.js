const my_JSON = 
`{
  "list": [
    {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
    },
    {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
    }
  ]
}
`
// Парсим JSON строку
const people = JSON.parse(my_JSON)

// Преобразуем возраст из строки в число
for (let i = 0; i < people.list.length; i += 1) {
  people.list[i].age = Number(people.list[i].age)
}
// Выводим в консоль объект преобразованный в строку
console.log(JSON.stringify(people, null, 2))
