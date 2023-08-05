// PdfCardUploader.js

import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { addResume, removeResume } from "../redux/Reducer";
import Modal from '@mui/material/Modal';
import { Button } from "@mui/material";
import { borderRadius } from "@mui/system";
// Configure pdfjs worker to be used by react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfCardUploader = () => {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(0);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    useEffect(() => {
        console.log(file);
        if (file) {
            const resume = URL.createObjectURL(file)
            dispatch(addResume(resume))

        }
    }, [file])

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };
    const handleDelete = () => {
        dispatch(removeResume(null))
        handleClose()
        setFile(null)

    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            {!file && <label style={{ display: 'grid', placeItems: 'center', backgroundColor: '#f3f4f9', width: '100%', height: '150px', border: '3px dashed gray', margin: '25px 0', borderRadius: '5px' }}>
                <input id="upload" type="file" onChange={handleFileChange} accept=".pdf" />
                <div style={{ color: 'black', display: 'grid', placeItems: 'center' }}>
                    <img src="https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg" alt="" style={{ width: '70px' }} />
                    <h3 style={{ marginTop: '10px' }}>Upload Resume</h3>
                </div>

            </label>}


            {file && (<div style={{ border: '2px solid lightgray', borderRadius: '5px' }}>

                <div style={{ height: '150px', overflow: 'hidden' }}>

                    <Document file={file} onLoadSuccess={onDocumentLoadSuccess} style={{ hieght: '200px', overflow: 'hidden' }}>
                        <Page pageNumber={1} width={375} />
                    </Document>

                    {/* <p>Total Pages: {numPages}</p> */}
                </div>
                <div style={{ width: "100%", background: "white", display: 'flex', alignItems: 'center', padding: '15px', justifyContent: 'space-between' }} >
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                        <DescriptionIcon />
                        <h5>{file.name}</h5>
                    </div>
                    <DeleteIcon onClick={handleOpen} />

                </div>
                <Modal
                    style={{ overflow: 'scroll', top: '30px' }}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div style={{ display: 'grid', placeItems: 'center', width: '375px', background: 'white', margin: ' 30vh auto', padding: '20px', borderRadius: '20px', }}>
                        <DeleteIcon />

                        <div style={{ margin: '20px' }}><h3> Are you sure you want to delete?</h3></div>
                        <div><Button onClick={handleDelete}>Yes</Button> <Button onClick={handleClose}>No</Button></div>
                    </div>
                </Modal>
            </div>
            )}

        </div>
    );
};

export default PdfCardUploader;
