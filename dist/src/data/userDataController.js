import axios from 'axios';

export function updateUserDataTrainings(user,training){
    let new_training = {
        name:training.title,
        type:training.content,
        exercises:training.exercises,
        metadata:{
            date:new Date(),
        }
    }
    user.data.trainings.push(new_training);
    console.log(user);
    axios.put('http://localhost:5000/user/updateUserData',{
        user:user,
    });
}
