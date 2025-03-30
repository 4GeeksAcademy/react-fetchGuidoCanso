import React, { useEffect } from "react";
import styles from "./Lista.module.css";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";


const Lista = () => {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");
    const user = "GuidoCanso";
    const apiUrl = `https://playground.4geeks.com/todo/users/${user}`;

    // Crear usuario en la API
    const createUser = () => {
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([]) // La API espera un array vacío
        })
            .then(response => response.json())
            .then(() => getTareas()) // Una vez creado, obtenemos las tareas
            .catch(error => console.error('Error al crear usuario:', error));
    };

    // Obtener tareas de la API
    const getTareas = () => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTareas(data);
                }
            })
            .catch(error => console.error('Error al obtener tareas:', error));
    };

    // Actualizar lista de tareas en la API
    const updateTareas = (nuevaLista) => {
        fetch(apiUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevaLista)
        })
            .then(response => response.json())
            .then(() => getTareas()) // Recargamos la lista desde la API
            .catch(error => console.error('Error al actualizar tareas:', error));
    };

    useEffect(() => {
        createUser();
    }, []);

    const handleInput = (e) => {
        setNuevaTarea(e.target.value);
    };

    const agregarTarea = () => {
        if (nuevaTarea.trim() === "") return;

        const nueva = { label: nuevaTarea, done: false };
        const nuevaLista = [...tareas, nueva];
        setTareas(nuevaLista);
        setNuevaTarea("");
        updateTareas(nuevaLista);
    };

    const eliminarTarea = (index) => {
        const nuevaLista = tareas.filter((_, i) => i !== index);
        setTareas(nuevaLista);
        updateTareas(nuevaLista);
    };

    const limpiarTareas = () => {
        setTareas([]);
        updateTareas([]);
    };

    return (
        <div className={styles.container}>
            <h1>Lista de tareas</h1>
            <div className={styles.lista}>
                <ul>
                    <li>
                        <input
                            type="text"
                            placeholder="¿Qué te gustaría poner?"
                            value={nuevaTarea}
                            onChange={handleInput}
                            onKeyPress={(e) => e.key === "Enter" && agregarTarea()}
                        />
                        <button onClick={agregarTarea}>Agregar</button>
                    </li>
                    {tareas.map((tarea, index) => (
                        <li key={index}>
                            <span>{tarea.label}</span>
                            <i
                                className="fa-solid fa-trash-can"
                                role="button"
                                onClick={() => eliminarTarea(index)}
                                style={{ cursor: "pointer", marginLeft: "10px" }}>
                            </i>
                        </li>
                    ))}
                </ul>
                {tareas.length > 0 && (
                    <button onClick={limpiarTareas} style={{ marginTop: "10px" }}>Limpiar Todo</button>
                )}
            </div>
        </div>
    );
};

export default Lista;