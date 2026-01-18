const NAME = document.querySelector("#Name");
const BODY = document.querySelector("#Body-natega");
const Table = document.querySelector("#Table-nat");
const numGelos = document.querySelector(".num-gelos");
const btnSearch = document.querySelector("#btn-search");
const select = document.querySelector(".form-select");
const TABLE = document.querySelector(".table");
const inputLabel = document.querySelector("#inputLabel");
const gelosInput = document.querySelector("#gelosInput");
let arr;

let student;

fetch("./sinai.json")
  .then((res) => res.json())
  .then((data) => {
    const { firest, sconed, third, fourth, fifth, Sixth } = data;

    btnSearch.addEventListener("click", () => {
      const studentId = numGelos.value.trim();
      let selectedGradeData;

      // تحديد بيانات الصف بناءً على الاختيار
      switch (select.value) {
        case "1":
          selectedGradeData = firest;
          break;
        case "2":
          selectedGradeData = sconed;
          break;
        case "3":
          selectedGradeData = third;
          break;
        case "4":
          selectedGradeData = fourth;
          break;
        case "5":
          selectedGradeData = fifth;
          break;
        case "6":
          selectedGradeData = Sixth;
          break;
        default:
          deleteData("اختر الصف أولا");
          return;
      }
      animation();
      student = select.value;
      handleStudentData(selectedGradeData, studentId);
    });
  });

select.addEventListener("change", () => {
  const selectedValue = select.value;
  const isIdBased = selectedValue === "1" || selectedValue === "2";

  const labelText = isIdBased
    ? " اول 4 ارقام في الرقم القومي من جهة اليمين"
    : "رقم الجلوس";
  const placeholderText = isIdBased ? "الرقم القومي" : "ادخل رقم الجلوس";

  inputLabel.textContent = labelText;
  gelosInput.placeholder = placeholderText;
});

const handleStudentData = (data, id) => {
  const isIdBased = student === "1" || student === "2";
  const label = isIdBased
    ? " اول 4 ارقام في الرقم القومي من جهة اليمين"
    : "رقم الجلوس";

  const studentData = data.find((item) => {
    if (isIdBased) {
      return `${item.Student_ID}`.endsWith(id) && id.length >= 1;
    } else {
      return item.Student_ID == id;
    }
  });

  if (studentData) {
    printDATA(studentData);
  } else if (id === "") {
    deleteData(`ادخل ${label}`);
  } else {
    deleteData(`${label} غير متوفر في الصف المحدد`);
  }
};

// delete-data-from-error
const deleteData = (information) => {
  NAME.innerHTML = information;
  Table.innerHTML = "";
  BODY.innerHTML = "";
};

// print-data-in-page
const printDATA = (studentData) => {
  NAME.innerHTML = studentData.name;
  Table.innerHTML = `
    <tr>
    <th scope="col">المادة</th>
    <th scope="col">الدرجات</th>
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
    <td> الدين</td>
    <td>${studentData.Religious_Education}</td>
    </tr>
    ${
      +student === 1 || +student === 2 || +student === 3
        ? `  <tr>
    <td> متعدد التخصصات</td>
    <td>${studentData.Multidisciplinary}</td>
    </tr>
    <tr>
    <td> التربية البدنية والصحيه</td>
    <td>${studentData.physical_education}</td>
    </tr>`
        : ` <tr>
    <td> الدراسات</td>
    <td>${studentData.Social_Studies}</td>
    </tr>
    <tr>
    <td> العلوم</td>
    <td>${studentData.Sciences}</td>
    </tr>
    <tr>
    <td> مهارات   و موسيقة </td>
    <td>${studentData.Music_Professional_skills}</td>
    </tr>
    <tr>
    <td> تكنولوجيا المعلومات</td>
    <td>${studentData.technology}</td>
    </tr>
    <tr>
    <td> التربية البدنية </td>
    <td>${studentData.physical_education}</td>
    </tr>
    <tr>
    <td>  التربية الفنية  </td>
    <td>${studentData.art}</td>
    </tr>`
    }
    <tr>
    <td> نشطة التوكاتسو</td>
    <td>${studentData.Tokatsu_activities}</td>
    </tr>
      `;
};

function animation() {
  TABLE.style.animation = "tableUpdateAnimation 0.7s ease-in-out";
  NAME.style.animation = "tableUpdateAnimation 0.7s ease-in-out";
  setTimeout(() => {
    TABLE.style.animation = "none";
    NAME.style.animation = "none";
  }, 1000);
}
