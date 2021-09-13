import React, { useState, useEffect } from "react";

export default function UploadFile({ parentCallback }) {
  const [previewFile, setPreviewFile] = useState();
  const [file, setFile] = useState();

  const fileSelectHandler = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewFile(reader.result);
        setFile(selectedFile);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    parentCallback(file);
  }, [file]);

  return (
    <div>
      <div className="img-preview-container">
        <img src={previewFile} id="img" alt="" />
      </div>
      <input
        type="file"
        name="bukti-transfer"
        id="input-files"
        accept="image/*"
        onChange={(e) => fileSelectHandler(e)}
      />
      <div className="label-input-files mb-5">
        <label htmlFor="input-files" className="img-upload">
          {previewFile ? "Ganti Thumbnail" : "Input Thumbnail"}
        </label>
      </div>
    </div>
  );
}
