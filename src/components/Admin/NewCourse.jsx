import React, { useState, useEffect } from "react";
import fetchNewCourse from '../../service/newCourse'
import Cookies from "js-cookie";
import fetchTeachers from '../../service/getTeachers'
import { useDispatch } from 'react-redux'
import { displayError } from "../../redux/middlewares/flashMiddleware";

export const NewCourse = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [teacher_id, setTeacher_id] = useState("");
    const [teachersList, setTeachersList] = useState("")
    const token = ("Bearer " + (Cookies.get('token')));
    const dispatch = useDispatch()

    const newCourse = (e) => {
        const data = {
            course: {
                title,
                description,
                teacher_id,
            },
            auth: {
                token,
            }
        };
        e.preventDefault();
        fetchNewCourse(data)
    }
    useEffect(() => {
        const getTeachers = async () => {
            const teachers = await fetchTeachers();
            if (!teachers) {
                dispatch(displayError("Aucun professeur disponible"))
                return false
            }
            setTeachersList(teachers);
        };
        getTeachers();
    }, [dispatch]);
    console.log(teachersList);
    return (
        <>
            <div className="card col-md-4">
                <h2>Créer une nouvelle formation</h2>
                <form onSubmit={newCourse}>
                    <input id="title"
                        className="form-control"
                        type="text"
                        placeholder="Titre"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <br />
                    <input id="description"
                        className="form-control"
                        type="textarea"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <br />
                    <select
                        onChange={(e) => setTeacher_id(e.target.value)}
                        className="form-control form-control-lg"
                    >
                        <option value="">Selectionner un professeur</option>
                        {teachersList && teachersList.map((teacher) => (
                            <option value={teacher.id} key={teacher.id}>
                                {teacher.first_name} {teacher.last_name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <input className="btn btn-primary" type="submit" value="Envoyer" />
                </form>
            </div>
        </>
    )
}
