
const multer = require("multer")
const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(
                null,
                "upload/"
            )
        }
    },

    {
        filename: function (req, file, cd) {
            null,
                Date.now() + "_" + originalname
        }
    }

    const upload = multer({
        storage
    })
) 