export const fetchCourse = async () => {
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
    alert("nous ne touvons pas de cours");
  }
};
