import { createClient } from "@supabase/supabase-js";

const url = "https://nxfkjjiutleiappzfezr.supabase.co";
const key = "sb_publishable_4rzQx1xaRXvLmzzzPoI7aw_CdspWNVY";
const supabase = createClient(url, key);

export default function uploadMedia(file) {
    return new Promise((resolve, reject) => {
     
        if (file == null) {
            reject("file not added");
            return;
        }

 
        let fileName = file.name;
        const fileArray = fileName.split(".");
        const fileType = fileArray[fileArray.length - 1];

        const time = new Date().getTime();
        const newFileName = time + "." + fileType;

        
        supabase.storage
            .from("imgs")
            .upload(newFileName, file, {
                cacheControl: "3600",
                upsert: false,
            })
            .then((res) => {
                if (res.error) {
                    reject(res.error.message);
                } else {
                   
                    const url2 = supabase.storage
                        .from("imgs")
                        .getPublicUrl(newFileName).data.publicUrl;
                    
                    resolve(url2);
                }
            })
            .catch((err) => {
                reject(err.message);
            });
    });
}