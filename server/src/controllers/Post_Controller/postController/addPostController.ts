import { Request, Response } from "express";
import { Multer } from "multer";

interface MulterFile extends Express.Multer.File {
    filename: any; 
}

export default (dependencies: any) => {    

    const { useCase: { AddPost_Usecase } } = dependencies;
    
    const addPostController = async (req: Request, res: Response) => {
        try {
            
        
            
            const { body, files } = req;
          
          

            if (!files || !Array.isArray(files)) {
                return res.status(400).json({ error: "No files uploaded" });
            }
           
            const uploadedFiles = Array.isArray(files) ? files : [files];
            const images: any[] = uploadedFiles.map((file: MulterFile) => file.filename);
           
            
            const data = {
                image: images,
                data: body,
            };
           
            
            const response = await AddPost_Usecase(dependencies).executeFunction(data);
            
           

            if (response.status) {
                return res.status(200).json({ status: true, data: response.data });
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
