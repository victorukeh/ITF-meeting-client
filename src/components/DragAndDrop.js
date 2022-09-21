import React from "react";
import "../styles/css/draganddrop.css"
import { useDataLayerValue } from "../reducer/DataLayer";

const DragAndDrop = () => {
	const [{ dropDepth, inDropZone, fileList }, dispatch] = useDataLayerValue();
	const handleDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch({ type: "SET_DROP_DEPTH", dropDepth: dropDepth + 1 });
	};
	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch({ type: "SET_DROP_DEPTH", dropDepth: dropDepth - 1 });
		if (dropDepth > 0) return;
		dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
	};
	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		e.dataTransfer.dropEffect = "copy";
		dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
	};
	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
        let files = [...e.dataTransfer.files];
  
        if (files && files.length > 0) {
          const existingFiles = fileList.map(f => f.name)
          files = files.filter(f => !existingFiles.includes(f.name))
          
          dispatch({ type: 'ADD_FILE_TO_LIST', fileList: files });
          e.dataTransfer.clearData();
          dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
          dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
        }
	};
	return (
		<div
			style={{
				background: "white",
				borderRadius: "10px",
				width: "65vh",
				height: "40vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				color: "blue",
				marginTop: "5%",
				boxShadow: "0.2px 2px 8px 3px #dedfe0",
			}}
			onDrop={(e) => handleDrop(e)}
			onDragOver={(e) => handleDragOver(e)}
			onDragEnter={(e) => handleDragEnter(e)}
			onDragLeave={(e) => handleDragLeave(e)}
            // className={inDropZone ? 'drag-drop-zone inside-drag-area' : 'drag-drop-zone'}
		>
			<p>Drag files here to upload</p>
		</div>
	);
};

export default DragAndDrop;
