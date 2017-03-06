var code = document.getElementById("code");
var course = document.getElementById("course");
var credits = document.getElementById("credits");
var grade = document.getElementById("grade");

// get a reference for the courses node
var firebaseCoursesRef = firebase.database().ref('courses');
// get a reference fot the GPA node
var GPARef = firebase.database().ref('GPA');

firebaseCoursesRef.on('value', function(snapshot){

    // sum(grade*credit)/totalCredits = gpa

    var totalWeightGrade = 0;  // grade*credits
    var totalCredits = 0;  // total number of credit hours

    // loop through all the data
    snapshot.forEach(function(courseSnapshot) {
        var courseGrade = getGradeEq(courseSnapshot.val().grade);
        var courseCredits = parseInt(courseSnapshot.val().credits);

        totalWeightGrade += courseGrade*courseCredits;
        totalCredits += parseInt(courseSnapshot.val().credits);
    });

    // calculate GPA
    var GPA = (totalWeightGrade/totalCredits).toFixed(2);
    
    // set GPA in firebase
    GPARef.set(GPA);

    document.getElementById("gpa").innerHTML = GPA;
    document.getElementById("totCred").innerHTML = totalCredits;

});

function getGradeEq(grade) {
    if (grade.toLowerCase() == "a")
        return 4.0;
    else if (grade.toLowerCase() == "b")
        return 3.0;
    else if (grade.toLowerCase() == "c")
        return 2.0;
    else if (grade.toLowerCase() == "d")
        return 1.0;
    else
        return 0;
}

function send() {
    
    // get user values
    uCode = code.value;
    uCourse = course.value;
    uCredits = credits.value;
    uGrade = grade.value;

    // push a new node under 'courses' 
    var newCourse = firebaseCoursesRef.child(uCourse);
    newCourse.set({
        'code': uCode,
        'course': uCourse,
        'credits': uCredits,
        'grade': uGrade
    });

    // empty input boxes
    code.value = "";
    course.value = "";
    credits.value = "";
    grade.value = "";

}