


const uploadImage = (req, res) => {

    try {
        res.status(200).json({
            Status: "Successful",
            File: req.file
        }
        )

    } catch (error) {
        console.log("Not uploaded")
    }
}

module.exports =  {uploadImage }