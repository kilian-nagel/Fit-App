import axios from 'axios';

export function updateUserDataTrainings(user,training){
    console.log('hey');
    let new_training = {
        name:training.title,
        type:training.content,
        exercises:training.exercises,
        metadata:{
            date:new Date(),
        }
    }
    console.log(new_training);
    axios.put('http://localhost:5000/user/updateUserData',{
        user:user,
        training:new_training,
    });
}
