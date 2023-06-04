const MY_XML=
`<list>
    <student>
        <name lang="en">
            <first>Ivan</first>
            <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Петр</first>
            <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
    </student>
</list>
`
// Парсим XML строку
const myXMLparser = new DOMParser()
const XMLresult = myXMLparser.parseFromString(MY_XML, "text/xml")

//Формируем объект 
let listResult = [];
const allStudents = XMLresult.querySelectorAll("student")
for (let studentN = 0; studentN < allStudents.length; studentN += 1) {
  const student = allStudents[studentN];
  const nameNode = student.querySelector("name")
  const firstName = nameNode.querySelector("first").textContent
  const secondName = nameNode.querySelector("second").textContent
  const studentName = `${firstName} ${secondName}`
  const studentLang = nameNode.getAttribute("lang")
  const studentAge = Number(student.querySelector("age").textContent)
  const studentProf = student.querySelector("prof").textContent
  
  const listObj = {
    name: studentName,
    age: studentAge,
    prof: studentProf,
    lang: studentLang
  };
  listResult.push(listObj)
} 
const jsObject = {
  list: listResult
}
// Выводим в консоль объект преобразованный в строку
console.log(JSON.stringify(jsObject, null, 2))
