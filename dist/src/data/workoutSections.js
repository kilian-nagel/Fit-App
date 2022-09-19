
export const workoutSections = [
    {
        id:'training',
        title:'strength workouts',
        layout:'row',
        cards:[
            {
                name:'',
                uid:0,
                title:'squat killer',
                icon:'fas fa-flag',
                content:'type : dumbell , strength',
                exercises:[
                    {name:'weighted squat',sets:3,reps:10,weight:8},
                    {name:'lunges',sets:3,reps:15,weight:0},
                    {name:'weighted squat',sets:3,reps:10,weight:8},
                    {name:'lunges',sets:3,reps:15,weight:0},
                ],
                bgColor:'black',
                bgImage:'none',
            },
            {
                name:'',
                uid:1,
                title:'explosiveness',
                icon:'fas fa-bolt',
                content:'type : explosive , strength',
                exercises:[
                    {name:'explosive push-up',sets:3,reps:12,weight:0},
                    {name:'jumping squat',sets:3,reps:20,weight:0},
                    {name:'jumping lunges',sets:3,reps:16,weight:0},
                    {name:'explosive push-up',sets:3,reps:12,weight:0},
                    {name:'jumping squat',sets:3,reps:20,weight:0},
                    {name:'jumping lunges',sets:3,reps:16,weight:0},
                ],
                bgColor:'#001F54',
                bgImage:'none',
            },
        ]
    },
    {
        id:'training',
        title:'fitness workouts',
        layout:'row',
        cards:[
            {
                name:'',
                uid:2,
                title:'strong core',
                icon:'fas fa-flag',
                content:'type : bodyweight , core',
                exercises:[
                    {name:'plank',sets:3,reps:'30s',weight:0},
                    {name:'crunch',sets:3,reps:12,weight:0},
                    {name:'russian twists',sets:3,reps:20,weight:0},
                    {name:'plank',sets:3,reps:'30s',weight:0},
                    {name:'crunch',sets:3,reps:12,weight:0},
                    {name:'russian twists',sets:3,reps:20,weight:0},
                    {name:'plank',sets:3,reps:'30s',weight:0},
                    {name:'crunch',sets:3,reps:12,weight:0},
                    {name:'russian twists',sets:3,reps:20,weight:0},
                ],
                bgColor:'black',
                bgImage:'none',
            },
            {
                name:'',
                uid:3,
                title:'push-up king',
                icon:'fas fa-bolt',
                content:'type : bodyweight , chest',
                bgColor:'#001F54',
                bgImage:'none',
            },
        ]
    },
    {
        id:'training',
        title:'cardio workouts',
        layout:'row',
        cards:[
            {
                name:'',
                uid:4,
                title:'saturday sweat',
                icon:'',
                content:'type : cardio',
                bgColor:'black',
                bgImage:'none',
            },
            {
                name:'',
                uid:5,
                title:'jumping jacks streak',
                icon:'',
                content:'type : bodyweight , chest',
                bgColor:'#001F54',
                bgImage:'none',
            },
        ]
    },
]