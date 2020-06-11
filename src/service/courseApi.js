export const fetchCourses = async () => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${API_URL}/api/v1/courses`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const courses = await response.json();
    return courses;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchCourse = async (course_id) => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(
      `${API_URL}/api/v1/courses/${course_id}/sessions`,
      {
        method: "get",
        headers: {
          // Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const sessions = await response.json();
    return sessions;
  } catch (error) {
    console.log(error);
    return false;
  }
};