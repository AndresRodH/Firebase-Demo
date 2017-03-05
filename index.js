var code = document.getElementById("code");
var course = document.getElementById("course");
var credits = document.getElementById("credits");
var grade = document.getElementById("grade");

var submit = document.getElementById("submit");

function send() {
    
    // get user values
    uCode = code.value;
    uCourse = course.value;
    uCredits = credits.value;
    uGrade = grade.value;

    // get the reference to the database
    var db = firebase.database().ref('courses');
    // get the reference to the child tree
    var coursesRef = db.push();
    coursesRef.set({
        'code': uCode,
        'course': uCourse,
        'credits': uCredits,
        'grade': uGrade
    });

    code.value = "";
    course.value = "";
    credits.value = "";
    grade.value = "";
}