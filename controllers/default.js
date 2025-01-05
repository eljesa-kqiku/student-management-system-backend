import pool from "../database.js";

export const getMunicipalities = async (req, res) => {
    try{
        const [rows] = await pool.query(`SELECT * FROM municipalities;`)
        res.send(rows.map(municipality => ({
            id: municipality.mun_id,
            name: municipality.mun_name,
        })))
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Server Error"})
    }
}