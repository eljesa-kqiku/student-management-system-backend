import { v4 as uuidv4 } from 'uuid';

let students = [
    {
        "id": "d8c6b061-5998-4ccf-877d-003270e84e8c",
        "index": 1458,
        "first_name": "Mergim",
        "last_name": "Bajrami",
        "date_of_birth": "1989-10-05",
        "municipality_id": 1111
    },
    {
        "id": "0e1c447a-1dd2-4fde-896b-9219259e6ec9",
        "index": 1452,
        "first_name": "Blerton",
        "last_name": "Rexha",
        "date_of_birth": "1989-10-05",
        "municipality_id": 1111
    },
    {
        "id": "7dffaaf0-d426-4754-84b8-65a6214df033",
        "index": 1461,
        "first_name": "Abdullah",
        "last_name": "Krasniqi",
        "date_of_birth": "1989-10-05",
        "municipality_id": 1111
    },
    {
        "id": "aa163b59-c45f-4634-ac55-ee26dd7a010a",
        "index": 1472,
        "first_name": "Sami",
        "last_name": "Salihu",
        "date_of_birth": "1989-10-05",
        "municipality_id": 1111
    },
    {
        "id": "7daa5b79-b299-4aa2-b1fd-a7d4b1a9e51e",
        "index": 1491,
        "first_name": "Visar",
        "last_name": "Uruqi",
        "date_of_birth": "1989-10-05",
        "municipality_id": 1111
    },
    {
        "id": "7f045470-0c0a-4df8-b0ed-c082b0a085f6",
        "index": 1432,
        "first_name": "Naim",
        "last_name": "Krasniqi",
        "date_of_birth": "1989-10-05",
        "municipality_id": 1111
    }
]

export const getUsers = (req, res) => {
    res.send(students)
}

export const getUserById = (req, res) => {
    try{
        const { id } = req.params
        let student = students.find(std => std.id == id)
        if(student)
            res.send(student)
        else
            res.send("Student not found!")
    }catch(error){
        console.log(error)
        res.send("An error occured!")
    }
}

export const createUser = (req, res) => {
    try{
        const id = uuidv4()
        let user = req.body
        students.push({...user, id})
        res.send(students)
    }catch(error){
        console.log(error)
        res.send("An error occured!")
    }
}

export const editUser = (req, res) => {
    const { id } = req.params
    let studentIndex = students.findIndex(std => std.id === id)
    console.log(studentIndex, id)
    if(studentIndex > -1){
        students[studentIndex] = req.body
        res.send(students)
    }else{
        res.send("Student not found!")
    }  
}


export const deleteStudent = (req, res) => {
    const { id } = req.params
    let student = students.find(std => std.id === id)
    if(student){
        students = students.filter(std => std.id !== id)
        res.send(students)
    }else{
        res.send("Student not found!")
    }  
}
