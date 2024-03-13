import { Request, Response } from "express";

export default (dependencies: any) => {
    const { useCase: { addPostUsecase } } = dependencies;

    const extractImageFilenames = (files: Express.Multer.File[]) => {
        return files.map((file: Express.Multer.File) => file.filename);
    };

    const addPostController = async (req: Request, res: Response) => {
        try {
            const { body, files } = req;

            if (!files || !Array.isArray(files)) {
                return res.status(400).json({ error: "No files uploaded" });
            }

            const images: string[] = extractImageFilenames(files);

            const data = {
                images,
                postData: body,
            };

            const response = await addPostUsecase(dependencies).executeFunction(data);

            if (response.status) {
                return res.status(200).json({ status: true, data: response });
            } else {
                return res.status(400).json({ message: "Error adding post", ...response });
            }
        } catch (error) {
            console.error("Error in addPostController", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    return addPostController;
};
