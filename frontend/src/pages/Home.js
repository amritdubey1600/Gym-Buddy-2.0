import { useEffect } from "react";
import WorkoutDetails from '../components/WorkoutDetails.js'
import WorkoutForm from "../components/WorkoutForm.js";
import { useWorkoutContext } from "../hooks/useWorkoutsContext.js";
import { useAuthContext } from "../hooks/useAuthContext.js"

const Home = ()=>{

    const {workouts, dispatch} = useWorkoutContext()
    const {user} =useAuthContext();

    useEffect(()=>{
        const fetchWorkouts = async()=>{
            const response =  await fetch('http://localhost:4000/api/workouts',{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            }) //proxy added in frontend package.json to resolve CORS error
            const json = await response.json() // converts the response into array of json objs

            if(response.ok)
                dispatch({type:'SET_WORKOUTS', payload: json})
        }

        if(user)
            fetchWorkouts() //used to avoid making the useEffect's function async
    },[dispatch,user])

    return (
        <div className="home">
            <div className="workout">
                {workouts && workouts.map((workout)=>{
                return <WorkoutDetails key={workout._id} workout={workout}/>
            })}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;