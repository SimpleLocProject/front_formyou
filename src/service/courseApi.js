export const fetchCourses = async () => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${API_URL}/api/v1/courses`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const courses = await response.json();
    console.log(courses);
    return courses;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchCourse = async (token, course_id) => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${API_URL}/api/v1/courses/${course_id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const course = await response.json();
    return course;
  } catch (error) {
    console.log(error);
    alert("nous ne touvons pas ce cours");
  }
};