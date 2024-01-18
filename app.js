let NAME = document.querySelector("#Name");
let BODY = document.querySelector("#Body-natega");
let Table = document.querySelector("#Table-nat");
let numGelos = document.querySelector(".num-gelos");
let btnSearch = document.querySelector("#btn-search");
// let final = document.querySelector("#footer-nat");
let select = document.querySelector(".form-select");
let TABLE = document.querySelector(".table");

let student;

fetch("./DATA.json")
  .then((res) => res.json())
  .then((data) => {
    fourth = data.fourth;
    fifth = data.fifth;
    Sixth = data.Sixth;
     
    console.log(data);

    btnSearch.addEventListener("click", () => {
      const studentId = numGelos.value;
      if (select.value == 1) {
        animation();
        fourDAta(fourth, studentId);
      } else if (select.value == 2) {
        animation();
        fiveDAta(fifth, studentId);
      } else if (select.value == 3) {
        animation();
        sixDAta(Sixth, studentId);
      } else {
        deleteData("اختر الصف اولا");
        return;
      }
    });
  });

// student-data-fourth-grade
fourDAta = (data, id) => {
  const studentData = data.find((student) => student.Student_ID == id);
  if (studentData) {
    printDATA(studentData);
  } else if (id === "") {
    deleteData("ادخل رقم جلوس ");
  } else {
    deleteData(" رقم الجلوس غير متوفر في الصف الرابع");
  }
};

// student-data-fifth-grade
fiveDAta = (data, id) => {
  const studentData = data.find((student) => student.Student_ID == id);
  if (studentData) {
    printDATA(studentData);
  } else if (id === "") {
    deleteData("ادخل رقم جلوس ");
  } else {
    deleteData(" رقم الجلوس غير متوفر في الصف الخامس");
  }
};

// student-data-Sixth-grade
sixDAta = (data, id) => {
  const studentData = data.find((student) => student.Student_ID == id);
  if (studentData) {
    printDATA(studentData);
  } else if (id === "") {
    deleteData("ادخل رقم جلوس");
  } else {
    deleteData(" رقم الجلوس غير متوفر في الصف السادس");
  }
};

// delete-data-from-error
const deleteData = (information) => {
  NAME.innerHTML = information;
  Table.innerHTML = "";
  BODY.innerHTML = "";
  final.innerHTML = "";
  // chartActive.style.display = "none";
};

// print-data-in-page
const printDATA = (studentData) => {
  NAME.innerHTML = studentData.name;
  Table.innerHTML = `
              <tr>
      <th scope="col">المادة</th>
      <th scope="col">التقدير</th>
    </tr>
          `;
  BODY.innerHTML = `
        <tr>
      <td>العربي </td>
      <td >${studentData.Arabic}</td>
    </tr>
    <tr>
      <td> الرياضيات </td>
      <td>${studentData.mathematics}</td>
    </tr>
    <tr>
      <td> الانجليزي</td>
      <td>${studentData.english}</td>
      </tr>
      <tr>
      <td> الدراسات</td>
      <td>${studentData.Social_Studies}</td>
      </tr>
      <tr>
      <td> العلوم</td>
      <td>${studentData.Sciences}</td>
      </tr>
      <tr>
      <td> الدين</td>
      <td>${studentData.Religious_Education}</td>
      </tr>
      <td> مهارات مهنية </td>
      <td>${studentData.Professional_skills}</td>
      </tr>
      <td> تكنولوجيا المعلومات</td>
      <td>${studentData.technology}</td>
      </tr>
      <td> القيم واحترام الآخر </td>
      <td>${studentData.Values_and_respect}</td>
      </tr>
      <td> التربية البدنية </td>
      <td>${studentData.physical_education}</td>
      </tr>
      <td>  التربية الفنية  </td>
      <td>${studentData.art}</td>
      </tr>
      <td> التربية الموسيقية </td>
      <td>${studentData.Music}</td>
      </tr>
      <td> نشطة التوكاتسو</td>
      <td>${studentData.Tokatsu_activities}</td>
      </tr>
      `;
  // final.innerHTML = `
  //       <tr>
  //     <td><h3>المجموع النهائي</h3></td>
  //     <td><h3>${studentData.total_score_level}</h3></td>
  //     </tr>
  //         `;
};

function animation() {
  TABLE.style.animation = "tableUpdateAnimation 0.7s ease-in-out";
  NAME.style.animation = "tableUpdateAnimation 0.7s ease-in-out";
  setTimeout(() => {
    TABLE.style.animation = "none";
    NAME.style.animation = "none";
  }, 1000);
}
