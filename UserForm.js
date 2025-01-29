"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

import { useUploadThing } from "@/lib/uploadthing";
import { ImageUploader } from "./ImageUploader";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/actions/user.action";

export default function UserForm({ user }) {
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: user,
  });

  const { startUpload } = useUploadThing("imageUploader");

  const doSubmit = async (values) => {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    try {
      const updatedUser = await updateUser(user._id, {
        ...values,
        imageUrl: uploadedImageUrl,
      });

      if (updatedUser) {
        toast.success("User updated");
      }
    } catch (error) {
      toast.error("User Error");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(doSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="form-control">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="input input-bordered w-full max-w-xs"
            placeholder="Your full name"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <p role="alert" className="text-red-600 text-sm pt-2">
              Name is required
            </p>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="imageUrl" className="label">
            Profile Picture
          </label>
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => (
              <ImageUploader
                onFieldChange={field.onChange}
                imageUrl={field.value}
                setFiles={setFiles}
              />
            )}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Update
        </button>
      </div>
    </form>
  );
}
