import { Request, Response } from "express";
import CourseModel from "../../model/course";
import { v2 } from "cloudinary";

export const AddCourse = async(req:any,res:any) => {
    try {
        const { title, description, price, published } = req.body;
        let { imageUrl } = req.body;

        if (imageUrl) {
            const uploadRes = await v2.uploader.upload(imageUrl);
            imageUrl = uploadRes.secure_url
        }

        const newCourse = await CourseModel.create({
            title,
            description,
            price,
            published,
            imageUrl
        })

        return res.status(200).json({message:"new Course created successfully",data:newCourse})

    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error while adding course" });
    }
}

export const UpdateCourse = async(req:any,res:any) => {
    try {
        const { courseId } = req.params;
        const course = await CourseModel.findById({ courseId });
        if (!course) {
            return res.status(401).json({ message: "course not found" });
        }
        const { title, description, price, published, imageUrl } = req.body;

        let updatedImageUrl = imageUrl;
        if (imageUrl) {
            const uploadRes = await v2.uploader.upload(imageUrl);
            updatedImageUrl = uploadRes.secure_url;
        }

        const updateCourse = await CourseModel.findByIdAndUpdate(
            courseId,
            {
            title,
            description,
            price,
            published,
            imageUrl: updatedImageUrl
            },
            { new: true } // Return the updated document
        );

        return res.status(200).json({ message: "Course updated successfully", data: updateCourse });
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const DeleteCourse = async(req:any,res:any) => {
    try {
        const { courseId } = req.params;
        const course = await CourseModel.findById(courseId)
        if (!course) {
            return res.status(401).json({ message: "course not found" });
        }
        const deleteCourse = await CourseModel.findByIdAndDelete(
            courseId
        );
        return res.status(200).json({ message: "course deleted successfully" });
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const GetCourse = async(req:any,res:any) => {
    try {
        const course = await CourseModel.find();
        return res.status(200).json({ message: "fetch all courses",data:course });
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const GetCourseById = async(req:any,res:any) => {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            return res.status(401).json({message:"Invalid courseId"})
        }
        const course = await CourseModel.findOne({ courseId });
        return res.status(200).json({ message: "fetched course", data: course });
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}