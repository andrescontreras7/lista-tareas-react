import React, { useState, useEffect } from "react";

function Formulario() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tareas, setTareas] = useState([]);
  const [estadosPorTarea, setEstadosPorTarea] = useState({});

  useEffect(() => {
    fetch('http://localhost:3002/tarea')
      .then((res) => res.json())
      .then((datos) => {
        setTareas(datos); 
      })
  }, []);

  const eliminarTarea = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/eliminar-tarea/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        const updatedTasks = tareas.filter(task => task.id !== id);
        setTareas(updatedTasks);
    }
    } catch (error) {
      console.error("Error deleting task:", error);
     
    }
  };



 const agregarDatos = async () => {
    const nuevaTarea = { nombre, descripcion, estado };
    
      const response = await fetch('http://localhost:3002/agregar-tarea', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaTarea)
      })

  setError(true);
  setSuccess(false);
}  



 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, descripcion, estado].includes('')) {
      setError(true);
      setSuccess(false);
    } else {
      const nuevaTarea = { id: tareas.length + 1, nombre, descripcion, estado };
      setTareas([...tareas, nuevaTarea]);
      setSuccess(true);
      setError(false);
      setNombre('');
      setDescripcion('');
      setEstado('');
      setEstadosPorTarea({ [nuevaTarea.id]: '' });
    }
  };

  const estadosTareas= (id) => {
    const newEstados = { ...estadosPorTarea };
    newEstados[id] = 'Tarea completada';
    setEstadosPorTarea(newEstados);
  };

  return (
  <>
  
  <h1 className="font-black text-3xl absolute left-64 uppercase ">
        Formulario
    </h1>
    <div className=" flex justify-between w-screen   ">

      <form className="h-full w-1/2 bg-white shadow-xl rounded-lg py-10 px-5 mt-14" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-800 text-white uppercase font-bold text-center p-3 mb-3">
            <p>Todos los campos son obligatorios</p>
          </div>
        )}
        {success && (
          <div className="bg-green-600 text-white uppercase font-bold text-center p-3 mb-3">
            <p>Tarea agregada correctamente</p>
          </div>
        )}
        <div className="mb-5">
          <label htmlFor="name" className="block text-gray-700 uppercase font-bold">
            nombre Tarea
          </label>
          <input
            id="name"
            type="text"
            placeholder="nombre usuario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="estado" className="block text-gray-700 uppercase font-bold">
            Estado
          </label>
          <input
            id="estado"
            type="text"
            placeholder="Estado tarea"
            className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="Des" className="block text-gray-700 uppercase font-bold">
            Descripcion
          </label>
          <input
            id="Des"
            type="text"
            placeholder="Descripcion tarea"
            className="border-2 w-full p-2 mt-2 placeholder-gray-700 rounded-md"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <input
        onClick= {agregarDatos}
          type="submit"
          className="w-full bg-indigo-600 p-2 uppercase font-bold text-white rounded-md hover:bg-indigo-800 cursor-pointer transition-all"
          value="agregar tarea"
        />
      </form>
      <div className=" h-screen overflow-y-scroll w-2/3">
            <h1 className="font-black font-bold text-center uppercase text-3xl">
                listado {""}
                <span className="font-bold text-indigo-700">tareas</span>
            </h1>
    
          
            {tareas.map((task) => (
            <div key={task.id} className="m-5 px-4 py-3 bg-white shadow-md rounded-xl">
              <button onClick={() => estadosTareas(task.id)} className="border-solid border-2 border-orange-500  bg-white p-2 mb-3">
                
              </button>
    
                   <p id={task.id} className="font-bold mb-3 text-gray-700 uppercase">Nombre:
                      
                      {""}
                      <span id={task.id} className="font-normal normal-case ml-2">{task.nombre}
                      </span>
                  </p>
                  <p id={task.id} className="font-bold mb-3 text-gray-700 uppercase ">Descripcion:
                      
                      {""}
                      <span id={task.id} className="font-normal normal-case ml-2">{task.descripcion}
                      </span>
                  </p>
                  <p id={task.id} className="font-bold mb-3 text-gray-700 uppercase">Estado:
                 
                      
                      {""}
                      <span id={task.id} className="font-normal normal-case ml-2">{task.estado}
                      </span>
                  </p>
                 
                <button onClick={() => eliminarTarea(task.id)}  className="bg-red-700 p-2 rounded-md  text-gray-100 uppercase font-bold m-2" >eliminar</button>
                <button className="bg-blue-700 p-2 rounded-md  text-gray-100 uppercase font-bold m-2" >editar</button>
              
                <p className="font-bold rounded-xl uppercase w-96 bg-green-600 text-cyan-50 p-2">
                {estadosPorTarea[task.id]}
                
              </p>
                  
            </div>
         
          ))}
    
      </div>
    </div>
    </>
  );
}

export default Formulario;