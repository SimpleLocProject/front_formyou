const fetchNewCourse = async (data) => {
    
    console.log("auth.token", data.auth.token);
    const API_URL = process.env.REACT_APP_API_URL;
    try {
        const response = await fetch(`${API_URL}/api/v1/courses`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": data.auth.token
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const course = await response.json();
        return course;
    } catch (error) {
        console.log(error);
        alert("nous ne pouvons pas créer ce cours");
    }
};

export default fetchNewCourse;