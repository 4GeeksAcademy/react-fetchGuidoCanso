import React from "react";
import styles from "./Lista.module.css";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";


const Lista = () => {

    const [tareas, setTareas] = useState([
        { id: 1, nombre: "Pasear al perro", completada: false },
        { id: 2, nombre: "Ir de compras", completada: false },
        { id: 3, nombre: "Almorzar en familia", completada: false },
        { id: 4, nombre: "Construir una casa", completada: false },
    ]);
    
    const [nuevaTarea, setNuevaTarea] = useState(""); 

    const handleInput = (e) => {
        setNuevaTarea(e.target.value); 
    };

    const agregarTarea = () => {
        if (nuevaTarea.trim() === "") return;

        const nueva = {
            id: Date.now(),
            nombre: nuevaTarea,
            completada: false
        };
        setTareas([...tareas, nueva]);
        setNuevaTarea("");
    };

    const eliminarTarea = (id) => {
        setTareas(tareas.filter(tarea => tarea.id !== id));
    };

    const toggleCompletada = (id) => {
        setTareas(tareas.map(tarea =>
            tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
        ));
    };

    return (
        <div className={styles.container}>
            <div>
                <h1>Lista de tareas</h1>
            </div>
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
                        <button onClick={agregarTarea}>Agregar</button> { }
                    </li>
                    {tareas.map((tarea) => (
                        <li key={tarea.id}>
                            <input
                                type="checkbox"
                                checked={tarea.completada}
                                onChange={() => toggleCompletada(tarea.id)}
                            />
                            <span>{tarea.nombre}</span>
                            <i
                                className="fa-solid fa-trash-can"
                                role="button"
                                onClick={() => eliminarTarea(tarea.id)}
                                style={{ cursor: "pointer", marginLeft: "10px" }}>
                            </i>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    );
};
export default Lista;