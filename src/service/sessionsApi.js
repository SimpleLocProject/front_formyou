export const fetchSessions = async () => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${API_URL}/api/v1/sessions`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const sessions = await response.json();
    console.log(sessions);
    return sessions;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchUserSessions = async (user) => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${API_URL}/api/v1/sessions/${user.id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const sessions = await response.json();
    console.log(sessions);
    return sessions;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchSession = async (token, session_id) => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${API_URL}/api/v1/courses/${session_id}`, {
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
    alert("Nous ne touvons pas cette session");
  }
};
