const fetchTeachers = async () => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${API_URL}/teachers`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": token,
      },
    });
    console.log(response)
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const teachers = await response.json();
    console.log(teachers);
    return teachers;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export default fetchTeachers;