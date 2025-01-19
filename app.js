let NAME = document.querySelector("#Name");
let BODY = document.querySelector("#Body-natega");
let Table = document.querySelector("#Table-nat");
let numGelos = document.querySelector(".num-gelos");
let btnSearch = document.querySelector("#btn-search");
let select = document.querySelector(".form-select");
let TABLE = document.querySelector(".table");
let chartDiv = document.querySelector(".chart");
let chartActive = document.querySelector(".char-active");

let arr;
let chart;
let student;

fetch("./Data2025.json")
  .then((res) => res.json())
  .then((data) => {
    const { third, fourth, fifth, Sixth } = data; // تفكيك البيانات لمتغيرات

    btnSearch.addEventListener("click", () => {
      const studentId = numGelos.value;
      let selectedGradeData;

      // تحديد بيانات الصف بناءً على الاختيار
      switch (select.value) {
        case "1":
          selectedGradeData = third;
          break;
        case "2":
          selectedGradeData = fourth;
          break;
        case "3":
          selectedGradeData = fifth;
          break;
        case "4":
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

const handleStudentData = (data, id) => {
  const studentData = data.find((student) => student.Student_ID == id);
  if (studentData) {
    printDATA(studentData);
    if (+student === 1) {
      let subject = [
        "متعدد التخصصات",
        "الدين",
        "انجليزي ",
        "الرياضيات",
        "العربي",
      ];
      let number = [
        studentData.Multidisciplinary,
        studentData.Religious_Education,
        studentData.english,
        studentData.mathematics,
        studentData.Arabic,
      ];
      arr = [100, 100, 100, 100, 100];
      printChart(studentData, arr, subject, number);
    } else {
      let subject = [
        "تكنولوجيا المعلومات",
        "مهارات مهنية",
        "العلوم",
        "الدراسات",
        "الدين",
        "انجليزي ",
        "الرياضيات",
        "العربي",
      ];
      let number = [
        studentData.technology,
        studentData.Professional_skills,
        studentData.Sciences,
        studentData.Social_Studies,
        studentData.Religious_Education,
        studentData.english,
        studentData.mathematics,
        studentData.Arabic,
      ];
      arr = [100, 100, 100, 100, 100, 100, 100, 100];
      printChart(studentData, arr, subject, number);
    }
  } else if (id === "") {
    deleteData("ادخل رقم جلوس");
  } else {
    deleteData("رقم الجلوس غير متوفر في الصف المحدد");
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
      +student === 1
        ? `  <tr>
    <td> متعدد التخصصات</td>
    <td>${studentData.Multidisciplinary}</td>
    </tr>
    <tr>
    <td> التربية البدنية والصحيه</td>
    <td>${studentData.Health_education}</td>
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
    <td> مهارات مهنية </td>
    <td>${studentData.Professional_skills}</td>
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
    </tr>
    <tr>
    <td> التربية الموسيقية </td>
    <td>${studentData.Music}</td>
    </tr>`
    }
    <tr>
    <td> القيم واحترام الآخر </td>
    <td>${studentData.Values_and_respect}</td>
    </tr>
    <tr>
    <td> نشطة التوكاتسو</td>
    <td>${studentData.Tokatsu_activities}</td>
    </tr>
      `;
};

// print-chart-in-page

const printChart = (studentData, arr, subject, number) => {
  deg = number;
  let visitor = arr;
  let year = subject;
  var options = {
    chart: {
      type: "area",
      height: "auto",
      width: "100%",
    },
    series: [
      {
        type: "area",
        name: " درجة الطالب",
        data: [...deg],
      },
      {
        type: "area",
        name: "الدرجة النهائية للمواد",
        data: [...visitor],
      },
    ],
    xaxis: {
      categories: year,
    },
    colors: ["#198754", "#0d6efd"],
  };

  if (chart) {
    chart.updateSeries([{ data: deg }, { data: visitor }]);
  } else {
    chart = new ApexCharts(chartDiv, options);
    chart.render();
  }
};

function animation() {
  TABLE.style.animation = "tableUpdateAnimation 0.7s ease-in-out";
  NAME.style.animation = "tableUpdateAnimation 0.7s ease-in-out";
  setTimeout(() => {
    TABLE.style.animation = "none";
    NAME.style.animation = "none";
  }, 1000);
}
