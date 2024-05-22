import { Request, Response } from "express";
import { Multer } from "multer";

interface MulterFile extends Express.Multer.File {
    filename: any; 
}

export default (dependencies: any) => {    

    const { useCase: { AddPost_Usecase } } = dependencies;
    
    const addPostController = async (req: Request, res: Response) => {
        try {
            console.log('entered to add post controller');
        
            
            const { body, files } = req;
          
            console.log(req?.files,"FILESSS");
            
            console.log(req.body, "its a request");
            console.log("files", files);

            if (!files || !Array.isArray(files)) {
                return res.status(400).json({ error: "No files uploaded" });
            }
           
            const uploadedFiles = Array.isArray(files) ? files : [files];
            const images: any[] = uploadedFiles.map((file: MulterFile) => file.filename);
            console.log("images", images);
            
            const data = {
                image: images,
                data: body,
            };
            console.log("imggfggg", data);
            
            const response = await AddPost_Usecase(dependencies).executeFunction(data);
            console.log('responseee', response);
           

            if (response.status) {
                return res.status(200).json({ status: true, data: response });
            } else {
                return res.status(400).json({ message: "Error adding post", ...response });
            }
        } catch (error) {
            console.log("error in addpostcontroller", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    };

    return addPostController;
};
