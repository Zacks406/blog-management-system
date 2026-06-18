
import { useState } from "react";
import api from "../api/axios";



function UploadProfilePhoto() {

    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleUpload = async (e) => {
        e.preventDefault()


        try {
            //console.log(image)
            const formdata = new FormData();
            formdata.append("profilePic", image);

            const res = await api.post("/upload",
                formdata
            )
            console.log(res.data)

        } catch (error) {
            console.log(error.message)
        }



    }

    return (
        <div>
            <h1>Upload your profile picture</h1>
            <div>
                <form onSubmit={handleUpload}>

                    <input
                        type="file"
                        onChange={handleChange}
                    />

                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    )
}

export default UploadProfilePhoto