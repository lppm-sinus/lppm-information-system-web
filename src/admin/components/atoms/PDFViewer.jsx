const PDFViewer = ({ pdfUrl }) => {
  return (
    <iframe
      src={pdfUrl}
      width="100%"
      height="600px"
      title="PDF Viewer"
      style={{ border: "none" }}
    />
  );
};

export default PDFViewer;
