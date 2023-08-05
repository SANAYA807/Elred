import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useSelector } from 'react-redux';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFfull = () => {
    const { resume } = useSelector(state => state.app)
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        createFile();
    }
        , [])
    const handleOnClick = () => {
        if (pageNumber != numPages)
            setPageNumber(prev => prev + 1)
    }

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };
    async function createFile() {
        let response = await fetch(resume);
        let data = await response.blob();
        let metadata = {
            type: 'image/jpeg'
        };
        let file = new File([data], data.name, metadata);
        setFile(file);
    }
    return (
        <div>

            {file && (
                <div style={{ width: '375px', height: '100px', margin: 'auto', marginTop: '30px', background: 'white' }}>
                    <h3>{file.name}</h3>
                    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page renderTextLayer={false} pageNumber={pageNumber} onClick={handleOnClick} width={375} />
                    </Document>
                </div>


            )}
        </div>
    );
};

export default PDFfull;
