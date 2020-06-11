import React, { useState } from "react";
import fetchNewCourse from '../../service/newCourse'
import { useSelector } from 'react-redux'
import Cookies from "js-cookie";

export const NewCourse = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [teacher_id, setTeacher_id] = useState("");
    const token = ("Bearer " + (Cookies.get('token')));
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
                    <input id="teacher_id"
                        className="form-control"
                        type="text"
                        placeholder="ID du pofesseur"
                        value={teacher_id}
                        onChange={(e) => setTeacher_id(e.target.value)}
                        required
                    />
                    <br />
                    <input type="submit" value="Envoyer" />
                </form>
            </div>
        </>
    )
}
