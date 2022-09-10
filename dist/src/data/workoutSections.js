
export const workoutSections = [
    {
        id:'strength',
        title:'strength workouts',
        layout:'row',
        cards:[
            {
                name:'',
                title:'squat killer',
                icon:'fas fa-flag',
                content:'type : dumbell , strength',
                exercices:[
                    {name:'weighted squat',sets:3,reps:10,weight:8},
                    {name:'lunges',sets:3,reps:15,weight:0},
                    {name:'weighted squat',sets:3,reps:10,weight:8},
                    {name:'lunges',sets:3,reps:15,weight:0},
                ],
                bgColor:'black',
                bgImage:'',
            },
            {
                name:'',
                title:'explosiveness',
                icon:'fas fa-bolt',
                content:'type : explosive , strength',
                bgColor:'#001F54',
                bgImage:'',
            },
        ]
    },
    {
        id:'fitness',
        title:'fitness workouts',
        layout:'row',
        cards:[
            {
                name:'',
                title:'strong core',
                icon:'fas fa-flag',
                content:'type : bodyweight , core',
                bgColor:'black',
                bgImage:'',
            },
            {
                name:'',
                title:'push-up king',
                icon:'fas fa-bolt',
                content:'type : bodyweight , chest',

                bgColor:'#001F54',
                bgImage:'',
            },
        ]
    },
    {
        id:'cardio',
        title:'cardio workouts',
        layout:'row',
        cards:[
            {
                name:'',
                title:'saturday sweat',
                icon:'fas fa-flag',
                content:'type : cardio',
                bgColor:'black',
                bgImage:'',
            },
            {
                name:'',
                title:'jumping jacks streak',
                icon:'fas fa-bolt',
                content:'type : bodyweight , chest',
                bgColor:'#001F54',
                bgImage:'',
            },
        ]
    },
]