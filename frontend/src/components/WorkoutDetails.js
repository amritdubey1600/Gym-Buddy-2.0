import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails =(({workout})=>{
    const { dispatch } = useWorkoutContext()
    const { user } = useAuthContext()

    const handleClick = async () => {

        if(!user)
            return
        
        const response = await fetch('https://gym-buddy-2-0.onrender.com/api/workouts/'+workout._id,{
            method: 'DELETE',
            headers:{
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok)
            dispatch({type:'DELETE_WORKOUT', payload:json})
    }    

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load(Kg): </strong>{workout.load}</p>
            <p><strong>Reps:</strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}><i class="fa-solid fa-trash"></i></span>
        </div>
    );
})

export default WorkoutDetails;
