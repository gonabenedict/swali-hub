import Result from "../models/resultModels.js";

export async function createResult(req, res) {
    try{
        if(!req.user || !req.user._id){
            return res.status(401).json({
                success: false,
                message: " not authorized"
            });
        }

        const {title, technology, level, totalQuestions, correct , wrong} = req.body;
        if(!technology || !level || totalQuestions === undefined || correct === undefined){
            return res.status(400).json({
                success: false,
                message: "Missing fields"
            });
        }
        //COMPUTE WRONG IF NOT PROVIDED
        const computeWrong = wrong !== undefined ? Number (wrong) : Math.max(0, Number(totalQuestions) - Number(correct));

        if(!title) {
            return res.status(400).json({
                success: false,
                message: 'Missing title'
            });
        }

        const payload = {
            title:String(title).trim(),
            technology,
            level,
            totalQuestions: Number(totalQuestions),
            correct: Number(correct),
            wrong: computeWrong,
            user: req.user._id// for a particular user   
        };

        const created = await Result.create(payload);
        return res.status(201).json({
            success: true,
            message: "Result created ",
            result: created
        })
    }
    catch(error){
        console.error("Create Result Error:", error);
        return res.status(500).json({   
            success: false,
            message: " server error"
        });
    }
}

//list the results
export async function listResults(req, res) {
    try{
        if(!req.user || !req.user._id){
            return res.status(401).json({
                success: false,
                message: "not authorized"
            });
        }

        const {technology} = req.query;
        const query = {user: req.user._id};

        if(technology && technology.toLowerCase() !== 'all'){
            query.technology = technology;
        }
        const items = await Result.find(query).sort({createdAt: -1}).lean();
                
        return res.json({
            success: true,
            results: items
        }); 
    }
    catch(error){
        console.error("listResult Error:", error);
        return res.status(500).json({   
            success: false,
            message: " server error"
        });
    }
}