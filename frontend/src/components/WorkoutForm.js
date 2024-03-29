import { useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"


const WorkoutForm = ()=>{
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState(0)
    const [reps, setReps] = useState(0)
    const [error, setError] = useState(null)
    const { dispatch } = useWorkoutContext()
    const { user } = useAuthContext()

    const handleSubmit = async(event)=>{
        event.preventDefault()

        if(!user){
            setError('You must be logged in.')
            return
        }

        const workout = {title, load, reps}

        const response = await fetch('https://gym-buddy-2-0.onrender.com/api/workouts', {
            method:'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            console.log(json.error);
        }
        if(response.ok){
            setTitle('')
            setLoad(0)
            setReps(0)
            setError(null)
            console.log('Workout added ',json)
            dispatch({type:'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Excersize Title:</label>
            <input 
                type="text"
                onChange={(event)=>setTitle(event.target.value)}
                value={title}
            />

            <label>Load(in Kg):</label>
            <input 
                type="number"
                onChange={(event)=>setLoad(event.target.value)}
                value={load}
            />

            <label>Reps:</label>
            <input 
                type="number"
                onChange={(event)=>setReps(event.target.value)}
                value={reps}
            />
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm
