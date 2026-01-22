
import { useState } from "react";
import uploadMedia from "./src/utils/mediauplord";

export default function Test() {
    const [file, setFile] = useState(null);

    uploadMedia(file).then((url)=>{
        console.log(url)
    })
    

    function handleSubmit() {

      
        }

       

    

    return (
        <div>
            Test Component
            <input type="file" placeholder="Enter text here" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}