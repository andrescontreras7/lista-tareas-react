import { useEffect, useState } from 'react'

function ListaTareas (){
    
    const [datos, setDatos] = useState(null);

    useEffect(() => {
      fetch('http://localhost:3002/tarea')
        .then((res) => res.json())
        .then((datos) => {
          setDatos(datos);
        
          ;
        })
  
    }, []); 

    return(
        <>
        <div>
        
            {datos?.map((tareas) => ( 
              <div className="m-5 px-4 py-3 bg-white shadow-md rounded-xl">
                        <p id={tareas.id} className="font-bold mb-3 text-gray-700 uppercase">Nombre:
                      
                            {""}
                            <span id={tareas.id} className="font-normal normal-case">{tareas.nombre}
                            </span>
                        </p>
                        <p className="font-bold mb-3 text-gray-700 uppercase">Descripcion:
                        {""}
                            <span id={tareas.id} className="font-normal normal-case">{tareas.descripcion}
                            </span>
                        </p>
                        <p className="font-bold mb-3 text-gray-700 uppercase">Estado:
                            {""}
                            <span id={tareas.id} className="font-normal normal-case"> {tareas.estado} </span>
                        </p>
               
                </div>))}
               
        </div>
        </>
    )

}
export default ListaTareas;